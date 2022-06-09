import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '@context/UserContext'
import Layout from '@components/layout/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { myAccountWrapper } from '@components/my-account/MyAccountWrapper.style'
import MyPurchasesTabs from '@components/my-purchases/MyPurchasesTabs'
import MyPurchasesMenu from '@components/my-purchases/MyPurchasesMenu'

function MyPurchases() {
  const router = useRouter()
  const query = router.query
  const { tab = null, nav = null } = query
  const { user, setUser } = useContext(UserContext)
  const [tabName, setTab] = useState(null)
  const [innerNav, setInnerNav] = useState(null)
  const status = user?.xprofile.groups['6']?.hasOwnProperty('fields')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (tab) setTab(tab)
  }, [tab])
  useEffect(() => {
    if (nav) {
      setInnerNav(nav)
    }
  }, [nav])

  const handleRedirect = (e, id) => {
    setOpen(false)
    setTab(e)
    if (e === 'orders-view') {
      router.push(`/my-purchases?tab=${e}&nav=${id}`)
    } else {
      router.push(`/my-purchases?tab=${e}`)
    }
    if (id) setInnerNav(id)
  }

  return (
    <Layout
      leftMenu={
        <MyPurchasesMenu
          setTab={setTab}
          tab={tabName}
          user={user}
          handleRedirect={handleRedirect}
          setUser={setUser}
          status={status}
        />
      }
      menuMobile={{
        type: 'my-purchases',
        tab: tabName,
        status,
        handleRedirect,
        open,
        setOpen,
      }}
      noMenu={false}
    >
      <Head>
        <title>WeShare | My Purchases</title>
      </Head>
      <div css={myAccountWrapper} className="my-account-wrapper">
        <MyPurchasesTabs
          setTab={setTab}
          tab={tabName}
          user={user}
          handleRedirect={handleRedirect}
          setUser={setUser}
          status={status}
          innerNav={innerNav}
        />
      </div>
    </Layout>
  )
}
export default MyPurchases
