import React, { useContext, useState, useEffect } from 'react'
import { Button } from 'reactstrap'

import { UserContext } from '@context/UserContext'
import {
  getmemberDetails,
  createFriendship,
  deleteFriendship,
  followMember,
  getblockMemberList,
} from '@api/member.api'
import MemberList from '../../components/members/MemberList'
import ActionBar from '../../components/actionBar'
import InfiniteList from '../../components/infiniteList/InfiniteList'
import RequestModal from '../../components/requestModal/RequestModal'
import {
  NOT_FRIEND,
  PENDING,
  TAB_NAME,
  TOTAL,
  IS_FRIEND,
} from '@utils/constant'

import { v4 as uuidv5 } from 'uuid'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'

const getTabs = ({ activeTab, handleTabChange }) => (
  <div className="SubNav">
    <div className="main-container">
      {TAB_NAME.map((ele, index) => (
        <div
          key={ele.value}
          className={`main-inner-box ${index === activeTab ? 'active' : ''}`}
        >
          <Button type="button" onClick={() => handleTabChange(index)}>
            {ele.name}
          </Button>
        </div>
      ))}
    </div>
  </div>
)

const getInfinitelist = ({
  loaderState,
  loadMoreMember,
  isNext,
  scope,
  memberList,
  view,
  setReqMembersIndex,
  handleReqMember,
  handleFollowMember,
  setModalOpen,
  setReqMembersId,
  reqlMembersId,
  spinnerLoad,
  user,
  activeTab,
  currentUserID,
}) => (
  <div className="d-flex flex-column flex-fill w-100">
    <InfiniteList
      loaderState={loaderState}
      loadMore={loadMoreMember}
      loading={isNext[scope]}
      data={memberList[scope]}
      noText={'Members'}
      noLoadMore={false}
    >
      <ul className={`members-list ${view === 'grid' ? 'grid' : 'list'}`}>
        {memberList[scope].map((ele, i) => (
          <MemberList
            data={ele}
            key={`${ele.id}-${uuidv5()}`}
            handleReqMember={handleReqMember}
            handleFollowMember={handleFollowMember}
            setModalOpen={setModalOpen}
            setReqMembersId={setReqMembersId}
            index={i}
            isOrganizer={ele.id === user?.id}
            setReqMembersIndex={setReqMembersIndex}
            reqlMembersId={reqlMembersId}
            spinnerLoad={spinnerLoad}
            activeTab={activeTab}
            user={user}
            view={view}
            currentUserID={currentUserID}
          />
        ))}
      </ul>
    </InfiniteList>
  </div>
)

function Members() {
  const { user } = useContext(UserContext)
  const [scope, setScope] = useState('all')
  const [isNext, setIsNext] = useState({
    all: true,
    personal: true,
    following: true,
  })
  const [page, setPage] = useState({ all: 1, personal: 1, following: 1 })
  const [type, setType] = useState({
    all: 'active',
    personal: 'active',
    following: 'active',
  })
  const [memberList, setMemberList] = useState({
    all: [],
    personal: [],
    following: [],
  })
  const [searchText, setSearchText] = useState({
    all: '',
    personal: '',
    following: '',
  })
  const [memberTotal, setMemTotal] = useState({
    all: 0,
    personal: 0,
    following: 0,
  })
  const [view, setView] = useState('list')
  const [activeTab, setActiveTab] = useState(0)
  const [isModalOpen, setModalOpen] = useState(false)
  const [reqlMembersId, setReqMembersId] = useState(null)
  const [reqlMembersIndex, setReqMembersIndex] = useState(null)
  const [spinnerLoad, setSpinnerLoad] = useState(false)
  const [loaderState, setLoaderState] = useState(false)
  const [blockedList, setBlockedList] = useState([])
  const [currentUserID, setCurrentUserID] = useState(null)

  const loadDetails = (pages, scopes, types, search, isEmpty = false) => {
    const data = {
      page: pages,
      scope: scopes,
      type: types,
      per_page: 20,
      search: search,
      exclude: blockedList,
    }
    const list = { ...memberList }
    const isNextVal = { ...isNext }
    const total = { ...memberTotal }
    const memList = isEmpty ? [] : list[scopes]
    getmemberDetails(user, data)
      .then((res) => {
        list[scopes] = [...memList, ...res.data]
        const totalCount = Number(res.headers[TOTAL])
        const loaderCount = list[scopes].length
        total[scopes] = totalCount
        setMemberList(list)
        isNextVal[scopes] = loaderCount !== total[scopes]
        setIsNext(isNextVal)
        setLoaderState(false)
        setMemTotal(total)
      })
      .catch((err) => {
        console.log(err)
        setLoaderState(false)
        isNextVal[scopes] = false
        setIsNext(isNextVal)
      })
  }

  const handleTabChange = (index) => {
    const scopeVal = TAB_NAME[index].value
    setActiveTab(index)
    setScope(scopeVal)
    const listTotal = memberList[scopeVal].length
    if (scopeVal === 'all') return
    if (
      scopeVal !== 'all' ||
      !listTotal ||
      listTotal !== memberTotal[scopeVal]
    ) {
      setLoaderState(true)
      loadDetails(1, scopeVal, type[scopeVal], searchText[scopeVal])
    }
  }
  const updateLoader = () => {
    setLoaderState(true)
    const list = { ...memberList }
    list[scope] = []
    const pages = { ...page }
    pages[scope] = 1
    setPage(pages)
    setMemberList(list)
  }
  const loadMoreMember = () => {
    const listTotal = memberList[scope].length
    if (listTotal && listTotal !== memberTotal[scope]) {
      const pages = { ...page }
      pages[scope] = page[scope] + 1
      loadDetails(pages[scope], scope, type[scope], searchText[scope])
      setPage(pages)
    }
  }
  const handleActivityChange = (e) => {
    const typeVal = { ...type }
    typeVal[scope] = e.target.value
    updateLoader()
    loadDetails(1, scope, typeVal[scope], searchText[scope], true)
    setType(typeVal)
  }
  const updateState = (member, memberIndex, res) => {
    const list = { ...memberList }
    list[scope][memberIndex]['friendship_status'] =
      member.friendship_status === NOT_FRIEND ? PENDING : NOT_FRIEND
    if (res.data.id) list[scope][memberIndex]['friendship_id'] = res.data.id
    setMemberList(list)
    setReqMembersId(null)
    setModalOpen(false)
    setSpinnerLoad(false)
    setCurrentUserID(null)
  }

  const handleReqMember = (data, index) => {
    const member = data.id ? data : reqlMembersId
    setCurrentUserID(data?.id)
    const memberIndex = typeof index === 'number' ? index : reqlMembersIndex
    setSpinnerLoad(true)
    const formData = {
      friend_id: member.id,
      initiator_id: user.id,
    }
    const getRes =
      member.friendship_status === PENDING ||
      member.friendship_status === IS_FRIEND
        ? deleteFriendship(user, member.friendship_id)
        : createFriendship(user, formData)
    getRes
      .then((res) => updateState(member, memberIndex, res))
      .catch((err) => {
        setCurrentUserID(null)
        setSpinnerLoad(false)
      })
  }

  const handleFollowMember = (data, memberIndex) => {
    const formData = {
      user_id: data.id,
      action: !data.is_following ? 'follow' : 'unfollow',
    }
    setSpinnerLoad(true)
    followMember(user, formData)
      .then((res) => {
        const total = { ...memberTotal }
        const list = { ...memberList }
        if (scope === 'following') {
          list[scope].splice(memberIndex, 1)
          total[scope] = total[scope] - 1
        } else list[scope][memberIndex] = res.data.data
        setMemTotal(total)
        setMemberList(list)
        setReqMembersId(null)
        setSpinnerLoad(false)
      })
      .catch((err) => {
        setReqMembersId(null)
        setSpinnerLoad(false)
      })
  }

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      updateLoader()
      loadDetails(1, scope, type[scope], searchText[scope], true)
    } else {
      const search = { ...searchText }
      search[scope] = e.target ? e.target.value : e
      setSearchText(search)
      if (!e.target) {
        updateLoader()
        loadDetails(1, scope, type[scope], '', true)
      }
    }
  }

  const clickSearch = () => {
    updateLoader()
    loadDetails(1, scope, type[scope], searchText[scope], true)
  }

  return (
    <>
      <MainLayout sidebar={<MainSidebar />} title={'Connections-PORTL'}>
        <div className="itemBody item-wrapper-panel bg-black bd-radius">
          <div className="item-body-inner member-wrapper">
            {getTabs({
              activeTab,
              handleTabChange,
            })}
            <div className="member-container-panel">
              <div className="member-container-panel">
                <ActionBar
                  handleActivityChange={handleActivityChange}
                  setView={setView}
                  type={type[scope]}
                  placeholderText={TAB_NAME[activeTab].name}
                  handleSearch={handleSearch}
                  searchVal={searchText[scope]}
                  isSearch={true}
                  withButton={true}
                  clickSearch={clickSearch}
                />
                {getInfinitelist({
                  loaderState,
                  loadMoreMember,
                  isNext,
                  scope,
                  memberList,
                  handleReqMember,
                  view,
                  user,
                  setReqMembersIndex,
                  handleFollowMember,
                  setModalOpen,
                  setReqMembersId,
                  reqlMembersId,
                  spinnerLoad,
                  activeTab,
                  currentUserID,
                })}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
      <RequestModal
        show={isModalOpen}
        close={setModalOpen}
        handleDelete={handleReqMember}
        showSpinner={spinnerLoad}
      />
    </>
  )
}
export default Members
