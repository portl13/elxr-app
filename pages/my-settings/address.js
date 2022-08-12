import React, { useContext } from 'react'
import Address from '@components/my-settings/Address'
import MySettingsLayout from '@components/my-settings/layout/MySettingsLayout'
import { UserContext } from '@context/UserContext'
import { useRouter } from 'next/router'

function PageAddress() {
  const router = useRouter()
  const { user } = useContext(UserContext)

  const handleRedirect = (e) => {
    router.push(`/my-settings/address/${e}`)
  }

  return (
    <MySettingsLayout>
      <Address user={user} handleRedirect={handleRedirect} />
    </MySettingsLayout>
  )
}

export default PageAddress
