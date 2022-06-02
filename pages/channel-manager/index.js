import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '@context/UserContext'
import Layout from '@components/layout/Layout'
import { useRouter } from 'next/router'
import TabContentWrapper from '@pages/channel-manager/TabContentWrapper'
import Head from 'next/head'
import { getChannel } from '@api/channel.api'
import { getProfileDetails } from '@api/channel-social.api'
import ChannelManagerMenu from '@components/layout/ChannelManagerMenu'
function ChannelWrapper() {
  const router = useRouter()
  const query = router.query
  const { tab = null, nav = null } = query
  const { user } = useContext(UserContext)
  const [tabName, setTab] = useState(null)
  const [innerNav, setInnerNav] = useState(null)
  const [hide, setHide] = useState(false)
  const [result, setResult] = useState()
  const [profile, setProfile] = useState()
  useEffect(() => {
    if (user?.id) {
      getChannel(user)
        .then((res) => {
          setResult(res.data)
        })
        .catch()
    }
  }, [user])
  function getProfile() {
    getProfileDetails(user)
      .then((res) => {
        setProfile(res.data.data)
      })
      .catch(() => {})
  }

  useEffect(() => {
    if (user?.id) {
      getProfile()
    }
  }, [user])
  useEffect(() => {
    if (tab) setTab(tab)
  }, [tab])
  useEffect(() => {
    if (tab && nav) setInnerNav(nav)
    if (nav === 'edit') setInnerNav('edit')
  }, [tab, nav])
  const handleRedirect = (e, id, value) => {
    id === 'edit-event' &&
      router.push(`/channel-manager?tab=${e}&nav=${id}&id=${value}`)
    const param =
      id && e !== 'editproduct' && 'order-detail' ? `&nav=${id}` : ''
    e === 'editproduct'
      ? router.push(`/channel-manager?tab=${e}&id=${id}`)
      : router.push(`/channel-manager?tab=${e}${param}`)
    e === 'order-detail'
      ? router.push(`/channel-manager?tab=${e}&orders=${id}`)
      : router.push(`/channel-manager?tab=${e}${param}`)
    setTab(e)
    if (id && e !== 'editproduct') setInnerNav(id)
  }
  return (
    <Layout
      leftMenu={
        <ChannelManagerMenu
          tab={tabName}
          handleRedirect={handleRedirect}
          innerNav={innerNav}
          hide={hide}
          setHide={setHide}
          channel={result}
        />
      }
      menuMobile={{
        type: 'coaching-portal',
        tab: tabName,
        innerNav,
        hide,
        setHide,
        setTab,
        setInnerNav
      }}
      noMenu={false}
    >
      <Head>
        <title>WeShare | Channel Manager</title>
      </Head>
      <div className="main-content-wrapper bg-black bd-radius">
        {result && profile && (
          <>
            <TabContentWrapper
              setTab={setTab}
              tab={tabName}
              user={user}
              handleRedirect={handleRedirect}
              innerNav={innerNav}
              hide={hide}
              setHide={setHide}
              getProfile={getProfile}
            />
          </>
        )}
      </div>
    </Layout>
  )
}
export default ChannelWrapper
