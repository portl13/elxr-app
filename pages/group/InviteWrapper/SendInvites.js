import React, { useState, useEffect } from 'react'
import { Button, Input } from 'reactstrap'
import { useAlert } from 'react-alert'

import {
  getmemberDetails,
  inviteMember,
  getblockMemberList,
} from '../../api/member.api'
import { getGroupMemInvite } from '../../api/group.api'
import MemberCard from './MemberCard'
import InfiniteList from '../../../components/infiniteList/InfiniteList'
import { TIMEOUT } from '../../../utils/constant'
import Loader from '../../../components/loader'
import useDebounce from '@hooks/useDebounce'

const SendInvites = ({ user, tab, id }) => {
  const [memberName, setMemberName] = useState([])
  const [inviteMessage, setInviteMessage] = useState('')
  const [page, setPage] = useState(1)
  const [memberList, setMemberList] = useState([])

  const [searchText, setSearchText] = useState('')
  const debounceTerm = useDebounce(searchText, 500)

  const [loaderState, setLoaderState] = useState(false)
  const [memberId, setMemberId] = useState([])
  const [scope, setScope] = useState('all')
  const [orgMember, setOrgMember] = useState([])
  const [invideLoad, setinviteLoader] = useState(false)
  const [blockedList, setBlockedList] = useState([])
  const alert = useAlert()
  const loadDetails = (pages, scopes, search, isEmpty = false) => {
    const data = {
      search,
      page: pages,
      per_page: 20,
      scope: scopes,
      type: 'alphabetical',
      exclude: blockedList,
      group_id: id,
      exclude_admins: true,
      exclude_banned: true,
    }
    let list = [...memberList]
    let memList = isEmpty ? [] : list
    getmemberDetails(user, data, id)
      .then((res) => {
        list = [...memList, ...res.data]
        setMemberList(list)
        const allTotal = Number(res.headers['x-wp-total'])
        const total = allTotal ? allTotal : 0
        setLoaderState(list.length !== total)
      })
      .catch((err) => {
        setLoaderState(false)
      })
  }

  const getInviteMember = (id, name, data) => {
    if (data) {
      setMemberId([...memberId, id])
      setMemberName([...memberName, name])
    } else {
      const memId = memberId.filter((item) => item !== id)
      setMemberId(memId)
      const memName = memberName.filter((item) => item !== name)
      setMemberName(memName)
    }
  }

  const sendInvite = () => {
    if (!memberId.length) {
      alert.error('Please select member(s) to invite', TIMEOUT)
      return
    }
    setinviteLoader(true)
    const formData = {
      user_id: memberId.length === 1 ? memberId[0] : memberId,
      group_id: id,
      message: inviteMessage,
    }
    inviteMember(user, memberId, formData)
      .then((res) => {
        alert.success('Invite(s) has been send successfully.', TIMEOUT)
        setOrgMember([...orgMember, ...memberId])
        setinviteLoader(false)
        setInviteMessage('')
        setMemberId([])
        setMemberName([])
      })
      .catch((err) => {
        setinviteLoader(false)
        alert.error('Could not invite member to the group.', TIMEOUT)
      })
  }

  const handleScopeChnage = (e) => {
    e.preventDefault()
    const scopeVal = scope === 'all' ? 'personal' : 'all'
    setScope(scopeVal)
    setLoaderState(true)
    setMemberList([])
    setPage(1)
    loadDetails(1, scopeVal, searchText, true)
  }
  const updateLoader = () => {
    setLoaderState(true)
    setPage(1)
    setMemberList([])
  }

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      updateLoader()
      loadDetails(1, scope, searchText, true)
    } else {
      const search = e.target ? e.target.value : e
      setSearchText(search)
      if (!search) {
        updateLoader()
        loadDetails(1, scope, '', true)
      }
    }
  }

  const loadMoreMember = () => {
    if (memberList.length) {
      loadDetails(page + 1, scope, searchText)
      setPage(page + 1)
    }
  }

  const clearMemberName = (index) => {
    const names = [...memberName]
    const ids = [...memberId]
    names.splice(index, 1)
    ids.splice(index, 1)
    setMemberName(names)
    setMemberId(ids)
  }

  const checkDisplay = (memeId) => orgMember.indexOf(memeId) !== -1

  const handleMsgChange = (e) => {
    let text = e.target.value
    if (text.length <= 500) setInviteMessage(text)
    else if (text.length > 500) setInviteMessage(text.substring(0, 500))
  }

  //   useEffect(() => {
  //     if (tab === 'invites') {
  //       getblockMemberList(user, { per_page: 100 }).then((res) => {
  //         let listAll = []
  //         const data = res.data.map((e) => e.id)
  //         data.push(user.id)
  //         listAll = [...data, 65222]
  //         getGroupMemInvite(user, { per_page: 100, group_id: id })
  //           .then((resp) => {
  //             const respdata = resp.data.map((e) => e.user_id)
  //             setBlockedList([...listAll, ...respdata])
  //             loadDetails(page, scope, searchText)
  //             resp.data.length &&
  //               setOrgMember(resp.data.map((ele) => ele.user_id))
  //           })
  //           .catch(() => {
  //             loadDetails(page, scope, searchText)
  //           })
  //       })
  //     }
  //   }, [tab])

  useEffect(() => {
    if (debounceTerm) {
      updateLoader()
      loadDetails(1, scope, debounceTerm, true)
    }
    if (debounceTerm === '') {
        setLoaderState(false)
        setMemberList([])
    }
  }, [debounceTerm])

  return (
    <div className="nav-bar-section">
      <div className="item-body">
        <div className="invite-section">
          <div className="inner-section">
            <div className="panel-tag">
              Members
              <div className="custom-checkbox checkbox-panel">
                <Input
                  id="public"
                  className="custom-control-input"
                  type="checkbox"
                  onChange={handleScopeChnage}
                  checked={scope === 'personal'}
                />
                <label className="custom-control-label" htmlFor="public">
                  My Connections
                </label>
              </div>
            </div>
            <div className="invite-search">
              <input
                type="search"
                placeholder="Search Members"
                onChange={(e)=>setSearchText(e.target.value)}
              />
            </div>
            <div className="members-outer-panel">
              <InfiniteList
                loaderState={loaderState}
                loadMore={loadMoreMember}
                loading={loaderState}
                data={memberList}
                noText={'Members'}
                noLoadMore={false}
              >
                {memberList.length
                  ? memberList.map(
                      (members) =>
                        !checkDisplay(members.id) && (
                          <MemberCard
                            member={members}
                            memberId={memberId}
                            parentMember={getInviteMember}
                          />
                        )
                    )
                  : ''}
              </InfiniteList>
            </div>
          </div>
          <div className="inner-section">
            <div className="panel-tag">Send Invites</div>
            <div className="select-invite-container">
              <div>
                <div className="select-members-panel">
                  <div className="info-tag">
                    <span>i</span>
                  </div>
                  <div className="text-tag">
                    Select members to invite by clicking the + button next to
                    each member.
                  </div>
                </div>
              </div>
              <div className="invite-name-panel">
                {memberName.map((item, index) => (
                  <span>
                    {item}
                    <em onClick={() => clearMemberName(index)}>+</em>
                  </span>
                ))}
              </div>
            </div>
            <div className="customize-panel">
              <div className="message-length">{inviteMessage.length}/500</div>
              <textarea
                id="invitemessage"
                placeholder="Customize the message of your invite."
                value={inviteMessage}
                onChange={(e) => handleMsgChange(e)}
              ></textarea>
            </div>
            <div className="inner-button-panel">
              <Button onClick={() => sendInvite()}>
                Send {invideLoad ? <Loader /> : ''}
              </Button>
              <Button
                onClick={() => {
                  setInviteMessage('')
                  setMemberId([])
                  setMemberName([])
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendInvites