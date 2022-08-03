import React, { useContext, useEffect, useState } from 'react'
import MySettingsLayout from '@components/my-settings/layout/MySettingsLayout'
import Login from '@components/my-settings/Login'
import { UserContext } from '@context/UserContext'
import { getAccountSetting } from '@api/account.api'

function PageMySettings() {
  const { user } = useContext(UserContext)
  const [setLoad, setSaveLoader] = useState(false)
  const [tabData, setTabData] = useState([])
  const getSetting = () => {
    getAccountSetting(user, 'general').then((res) => {
      setTabData(res.data)
    })
  }

  useEffect(() => {
    if (user) {
      getSetting()
    }
  }, [user])

  return (
    <MySettingsLayout>
      <Login setLoad={setLoad} tabData={tabData} />
    </MySettingsLayout>
  )
}

export default PageMySettings
