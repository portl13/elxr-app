import React from 'react'
import MainLayout from '@components/main/MainLayout'
import SidebarWallet from '@components/my-wallet/sidebar/SidebarWallet'
import WalletTopup from '@components/walletTopup/WalletTopup'
import Head from 'next/head'

function PageTopup() {
  return (
    <>
    <Head>
      <title>My Wallet</title>
    </Head>
    <MainLayout sidebar={<SidebarWallet />}>
      <WalletTopup />
    </MainLayout>
    </>
  )
}

export default PageTopup
