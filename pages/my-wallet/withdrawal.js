import React from 'react'
import MainLayout from '@components/main/MainLayout'
import SidebarWallet from '@components/my-wallet/sidebar/SidebarWallet'
import WalletWithdrawl from '@components/my-wallet/WalletWithdrawl'

function PageWithdrawal() {
  return (
    <MainLayout sidebar={<SidebarWallet />}>
      <WalletWithdrawl />
    </MainLayout>
  )
}

export default PageWithdrawal
