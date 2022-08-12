import React from 'react'
import MainLayout from '@components/main/MainLayout'
import SidebarWallet from '@components/my-wallet/sidebar/SidebarWallet'
import WalletTransactions from '@components/walletTransactions/WalletTransactions'
import Head from 'next/head'

function PageTransactions() {
  return (
    <>
    <Head>
      <title>My Wallet</title>
    </Head>
    <MainLayout sidebar={<SidebarWallet />}>
      <WalletTransactions />
    </MainLayout>
    </>
  )
}

export default PageTransactions
