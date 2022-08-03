import React from 'react'
import MySettingsLayout from '@components/my-settings/layout/MySettingsLayout'
import AddPaymentMethod from '@components/my-settings/AddPaymentMethod'
import Payment from '@components/my-settings/Payment'

function PagePaymentMethod() {
  return (
    <MySettingsLayout>
        <Payment />
    </MySettingsLayout>
  )
}

export default PagePaymentMethod