import React from 'react'
import LayoutMyAccount from '@components/layout/LayoutMyAccount'
import Wallet from '@components/dashboard/wallet/Wallet'



function wallet() {
  return (
    <LayoutMyAccount>
      <Wallet/>
    </LayoutMyAccount>
  )
}

export default wallet
