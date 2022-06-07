import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '@context/UserContext'
import Layout from '@components/layout/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { myAccountWrapper } from '@components/my-account/MyAccountWrapper.style'
import MyWalletTabs from '@components/my-wallet/MyWalletTabs'
import MyWalletMenu from '@components/my-wallet/MyWalletMenu'

function MyWallet() {
  const router = useRouter()
  const query = router.query
  const { tab = null } = query
  const { user, setUser } = useContext(UserContext)
  const [tabName, setTab] = useState(null)

  useEffect(() => {
    if (tab) setTab(tab)
  }, [tab])

  const handleRedirect = (tab) => {
    router.push(`/my-wallet?tab=${tab}`)
    setTab(tab)
  }

  return (
    <Layout
      leftMenu={<MyWalletMenu handleRedirect={handleRedirect} tab={tab} />}
      menuMobile={{
        type: 'my-account',
        tab: tabName,
      }}
      noMenu={false}
    >
      <Head>
        <title>WeShare | My Wallet</title>
      </Head>
      <div css={myAccountWrapper} className="my-account-wrapper">
        <MyWalletTabs user={user} tab={tab} />
      </div>
    </Layout>
  )
}
export default MyWallet
