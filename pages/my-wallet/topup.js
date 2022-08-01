import React from 'react'
import MainLayout from '@components/main/MainLayout'
import SidebarWallet from '@components/my-wallet/sidebar/SidebarWallet'
import WalletTopup from '@components/my-wallet/WalletTopup'

function PageTopup() {
  return (
    <MainLayout sidebar={<SidebarWallet />}>
      <WalletTopup />
    </MainLayout>
  )
}

export default PageTopup
