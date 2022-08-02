import React from 'react'
import MainLayout from '@components/main/MainLayout'
import SidebarWallet from '@components/my-wallet/sidebar/SidebarWallet'
import WalletWithdrawl from '@components/walletWithdrawl/WalletWithdrawl'
import Head from 'next/head'

function PageWithdrawal() {
  return (
    <>
    <Head>
      <title>My Wallet</title>
    </Head>
    <MainLayout sidebar={<SidebarWallet />}>
      <WalletWithdrawl />
    </MainLayout>
    </>
  )
}

export default PageWithdrawal
