import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '@context/UserContext'
import Layout from '@components/layout/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { myAccountWrapper } from '@components/my-account/MyAccountWrapper.style'
import MyWalletTabs from '@components/my-wallet/MyWalletTabs'
import MyWalletMenu from '@components/my-wallet/MyWalletMenu'
import BottomSheet from '@components/menu/BottomSheet'
import { WITHDRAWL_SUBNAV } from '@utils/constant'

function MyWallet() {
  const router = useRouter()
  const query = router.query
  const { tab = null, nav = null } = query
  const { user, setUser } = useContext(UserContext)
  const [tabName, setTab] = useState(null)
  const [status, setStatus] = useState('withdraw')
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  

  useEffect(() => {
    if (tab) setTab(tab)
  }, [tab])

  useEffect(() => {
    if (nav) setStatus(nav)
  }, [nav])

  const handleRedirect = (tab) => {
    setOpenMenu(false)
    router.push(`/my-wallet?tab=${tab}`)
    setTab(tab)
  }

  const walletNavigate = (nav) => {
    router.push(`/my-wallet?tab=wallet-withdrawl&nav=${nav}`)
    setStatus(nav)
  }

  return (
    <Layout
      leftMenu={<MyWalletMenu handleRedirect={handleRedirect} tab={tab} />}
      menuMobile={{
        type: 'my-wallet',
        tab: tabName,
        handleRedirect,
        open: openMenu,
        setOpen: setOpenMenu
      }}
      noMenu={false}
    >
      <Head>
        <title>elxr | My Wallet</title>
      </Head>
      <div css={myAccountWrapper} className="my-account-wrapper">
        <MyWalletTabs user={user} tab={tab} setOpen={setOpen} open={open} />
      </div>
      <BottomSheet
        handleRedirect={walletNavigate}
        innerNav={status}
        open={open}
        setOpen={setOpen}
        title={'My Wallet'}
        routers={WITHDRAWL_SUBNAV}
        type="my-wallet"
      />
    </Layout>
  )
}
export default MyWallet
