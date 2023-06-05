import React, { useContext, useEffect, useState } from 'react'
import { Col } from 'reactstrap'
import HeaderCommunity from '@components/layout/HeaderCommunity'
import { useRouter } from 'next/router'
import { UserContext } from '@context/UserContext'
import { getTab } from '@components/innerNav'
import { GROUP_NAV_NAME } from '@utils/constant'
import { ProfileContainer } from '@components/livefeed/profile.style'
import TabContentWrapper from '../TabContentWrapper'
import { getUrlDetails } from '@api/member.api'
import {
  getGroupDetails,
  getGroupMembers,
  getGroupPhotos,
  getGroupAlbums,
  getGroupSettings,
} from '@api/group.api'
import MainLayout from '@components/main/MainLayout'
import useSWR from 'swr'
import { getDataSever } from '@request/shared'
import SeoMetaComponent from '@components/seo/SeoMetaComponent'
import { stringToSlug } from '@lib/stringToSlug'
import { getFetchPublic } from '@request/creator'

const baseApi = process.env.bossApi

const CommunitiesWrapper = ({ dataServer, id }) => {
  const router = useRouter()
  const query = router.query
  const {
    name = null,
    tab = null,
    nav = null,
    albumId = null,
    action = null,
    replyId = null,
  } = query
  const groupId = id || query?.id
  const { user } = useContext(UserContext)
  const token = user?.token
  const [tabName, setTab] = useState(null)
  const [organizers, setOrganizer] = useState(null)
  const [tabCount, setTabCount] = useState({
    members: 0,
    albums: 0,
    photos: 0,
  })
  const [tabKey, setTabKey] = useState('')
  const [status, setStatus] = useState()
  const [tabData, setTabData] = useState()
  const [setting, setSetting] = useState()
  const [groupMember, setGroupMember] = useState()
  const [settingStatus, setSettingStatus] = useState(false)
  const [groupMemberList, setGroupMemberList] = useState(false)
  const [hideDiscussion, setHideDiscussion] = useState(false)
  const [isMember, setIsMember] = useState(false)
  const [navBar, setNavBar] = useState(GROUP_NAV_NAME)
  const [community, setCommunity] = useState({
    name: '',
    cover_url: null,
    avatar_urls: {
      full: null,
    },
    description: { raw: '' },
    types: [],
    status: '',
    is_member: null,
    forum: 0,
  })

  const { data } = useSWR(
    token && groupId ? [`${baseApi}/groups/${groupId}`, token] : `${baseApi}/groups/${groupId}`,
    getFetchPublic,
    {
      fallback: dataServer,
    }
  )

  const updateDetails = (res, key) => {
    const total = Number(res.headers['x-wp-total'])
      ? Number(res.headers['x-wp-total'])
      : 0
    const innerNavVal = { ...tabCount }
    innerNavVal[key] = total
    setTabCount(innerNavVal)
  }

  const getGroupMembersList = () => {
    const formData = {
      group_id: id,
      roles: ['admin', 'member', 'mod'],
    }

    getGroupMembers(user, formData, id)
      .then((res) => {
        setGroupMemberList(res.data)
        setTabKey('members')
        setTabData(res)
        setGroupMember(res.data)
      })
      .catch((e) => console.log(e))

    getGroupPhotos(user, { group_id: id, scope: 'groups' })
      .then((res) => {
        setTabKey('photos')
        setTabData(res)
      })
      .catch((e) => console.log(e))

    getGroupAlbums(user, { group_id: id })
      .then((res) => {
        setTabKey('albums')
        setTabData(res)
      })
      .catch((e) => console.log(e))
  }

  const groupSetting = () => {
    getGroupSettings(user, { id, nav: 'group-settings' }, id).then((res) => {
      setSetting(res.data)
      setSettingStatus(true)
    })
  }

  useEffect(() => {
    if (tab) setTab(tab)
  }, [tab])

  const fetchGroupDetals = (group_id) => {
    getGroupDetails(user, group_id).then((res) => {
      setCommunity(res.data)
      setStatus(res.data.status)
      setIsMember(res.data?.is_member)
    })
  }

  const getOrganizerDetails = () => {
    const url = community._links.user[0].href
    getUrlDetails(user, url).then((res) => setOrganizer(res.data))
  }

  const handleRedirect = async (e, tabName) => {
    await router.push(
      `/group/${name}/${id}?tab=${e}${tabName ? `&nav=${tabName}` : ''}`
    )
    setTab(e)
  }

  useEffect(() => {
    if (data) {
      setCommunity(data)
      setStatus(data.status)
      setIsMember(data?.is_member)
    }
  }, [data])

  useEffect(() => {
    if (user) {
      //fetchGroupDetals(id)
      //getGroupMembersList()
      groupSetting()
    }
  }, [user])

  useEffect(() => {
    if (community.id) {
      if (!community.enable_forum) setHideDiscussion(true)
      if (community.enable_forum && community.forum) setHideDiscussion(false)
    }
  }, [community])

  useEffect(() => {
    if (community.id) {
      const role = setting?.map((d) => d.value)[1] || 'members'
      getOrganizerDetails()
      if (
        !community.is_member ||
        (community.is_member &&
          !community.is_mod &&
          !community.is_admin &&
          (role === 'mods' || role === 'admins')) ||
        (community.is_member && community.is_mod && role === 'admins')
      ) {
        let navBarNew = [...navBar]
        navBarNew.splice(4, 1)
        setNavBar(navBarNew)
      }
    }
  }, [community && settingStatus])

  return (
    <>
      <SeoMetaComponent
        title={`Elxr | ${data?.name}`}
        description={data?.description?.raw}
        titleContent={data?.name}
        image={data?.cover_url}
        url={process.env.nextSite + `/group/${stringToSlug(data?.name)}/${id}`}
      />
      <MainLayout>
        <Col className="px-0 px-md-3" xs="12">
          <HeaderCommunity
            organizers={organizers}
            community={community}
            isGroup={true}
            setIsMember={setIsMember}
          />
          <ProfileContainer>
            {settingStatus &&
              getTab({
                tab: tabName,
                setTab: handleRedirect,
                nav: navBar,
                showTab: community.role === 'Organizer',
                isGroup: true,
                tabCount: tabCount,
                hideTab: hideDiscussion,
                isForum: community.forum > 0,
              })}

            {settingStatus && (
              <TabContentWrapper
                groupDetails={community}
                community={community}
                tab={tabName}
                user={user}
                id={id}
                router={router}
                organizers={organizers}
                setTabCount={setTabCount}
                tabCount={tabCount}
                fetchGroupDetals={fetchGroupDetals}
                status={status}
                innerNav={nav}
                albumId={albumId}
                setting={setting}
                groupMember={groupMember}
                settingStatus={settingStatus}
                groupMemberList={groupMemberList}
                discussionAction={action}
                replyId={replyId}
                isMember={isMember}
              />
            )}
          </ProfileContainer>
          {!user ? (
            <p className={'border-white mt-4 border-radius-35 text-center'}>
              You must be logged in to Join this Community.
            </p>
          ) : null}
        </Col>
      </MainLayout>
    </>
  )
}
export default CommunitiesWrapper

export async function getServerSideProps({ query, req }) {
  const { id } = query

  let dataServer

  if (!id) {
    return {
      props: { id, dataServer },
    }
  }

  try {
    dataServer = await getDataSever(baseApi + '/groups/' + id, req)
  } catch (e) {
    console.log(e)
  }

  return {
    props: { id, dataServer },
  }
}
