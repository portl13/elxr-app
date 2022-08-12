import React, { useContext } from 'react'
import MySettingsLayout from '@components/my-settings/layout/MySettingsLayout'
import EditAddress from '@components/my-settings/EditAddress'
import { UserContext } from '@context/UserContext'

function PageBillingAddress() {
  const { user } = useContext(UserContext)
  return (
    <MySettingsLayout>
      <EditAddress user={user} />
    </MySettingsLayout>
  )
}

export default PageBillingAddress
