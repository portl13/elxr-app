import React from 'react'
import MainLayout from '@components/main/MainLayout'
import SidebarWallet from '@components/my-wallet/sidebar/SidebarWallet'
import WalletTransactions from '@components/walletTransactions/WalletTransactions'

function PageTransactions() {
  return (
    <MainLayout sidebar={<SidebarWallet />}>
      <WalletTransactions />
    </MainLayout>
  )
}

export default PageTransactions
