import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '@context/UserContext'
import Layout from '@components/layout/Layout'
import { useRouter } from 'next/router'

import Head from 'next/head'
import { getChannel } from '@api/channel.api'
import { getProfileDetails } from '@api/channel-social.api'
import MyPortalMenu from '@components/my-portal/MyPortalMenu'
import { mainContentWrapperStyle } from '@components/my-portal/MainContentWrapper.style'
import MyPortalTab from '@components/my-portal/MyPortalTab'

const redirec = {
  'edit-event': true,
  product: true,
  order: true,
  editproduct: true,
  subscriber: true,
}

function ChannelWrapper() {
  const router = useRouter()
  const query = router.query
  const { tab = null, nav = null, id = null } = query
  const { user } = useContext(UserContext)
  const [tabName, setTab] = useState(null)
  const [innerNav, setInnerNav] = useState(null)
  const [navId, setNavId] = useState()
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

  useEffect(() => {
    if (id) setNavId(id)
  }, [id])

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
    if (e === 'editproduct') {
      router.push(`/my-portal?tab=${e}&id=${id}`)
      return
    }

    if (redirec[id]) {
      setNavId(value)
      router.push(`/my-portal?tab=${e}&nav=${id}&id=${value}`)
      return
    }

    const param =
      id && e !== 'editproduct' && 'order-detail' ? `&nav=${id}` : ''
    e === 'editproduct'
      ? router.push(`/my-portal?tab=${e}&id=${id}`)
      : router.push(`/my-portal?tab=${e}${param}`)
    e === 'order-detail'
      ? router.push(`/my-portal?tab=${e}&orders=${id}`)
      : router.push(`/my-portal?tab=${e}${param}`)
    setTab(e)
    if (id && e !== 'editproduct') setInnerNav(id)
  }
  return (
    <Layout
      leftMenu={
        <MyPortalMenu
          tab={tabName}
          handleRedirect={handleRedirect}
          innerNav={innerNav}
          hide={hide}
          setHide={setHide}
          channel={result}
        />
      }
      menuMobile={{
        type: 'my-portal',
        tab: tabName,
        innerNav,
        hide,
        setHide,
        setTab,
        setInnerNav,
      }}
      noMenu={false}
    >
      <Head>
        <title>WeShare | My Portal</title>
      </Head>
      <div
        css={mainContentWrapperStyle}
        className="main-content-wrapper bg-black bd-radius"
      >
        {result && profile && (
          <MyPortalTab
            setTab={setTab}
            tab={tabName}
            user={user}
            handleRedirect={handleRedirect}
            innerNav={innerNav}
            getProfile={getProfile}
            id={navId}
          />
        )}
      </div>
    </Layout>
  )
}
export default ChannelWrapper
