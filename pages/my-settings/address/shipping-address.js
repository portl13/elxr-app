import React, { useContext } from 'react'
import MySettingsLayout from '@components/my-settings/layout/MySettingsLayout'
import EditShippingAddress from '@components/my-settings/EditShippingAddress'
import { UserContext } from '@context/UserContext'

function PageShippingAddress() {
  const { user } = useContext(UserContext)
  return (
    <MySettingsLayout>
      <EditShippingAddress user={user} />
    </MySettingsLayout>
  )
}

export default PageShippingAddress
