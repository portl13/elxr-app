import React from 'react'
import AccountDetail from '@components/my-settings/AccountDetail'
import MySettingsLayout from '@components/my-settings/layout/MySettingsLayout'

function PageAccountDetails() {
  return (
    <MySettingsLayout>
        <div className='account-detail'>
            <AccountDetail />
        </div>
    </MySettingsLayout>
  )
}

export default PageAccountDetails