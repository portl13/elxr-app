import React, { useContext, useEffect, useState } from 'react'
import MySettingsLayout from '@components/my-settings/layout/MySettingsLayout'
import Notifications from '@components/my-settings/Notifications'
import { getAccountSetting, updateAccountSetting } from '@api/account.api'
import { UserContext } from '@context/UserContext'

function PageNotifications() {
  const { user, setUser } = useContext(UserContext)
  const [setLoad, setSaveLoader] = useState(false)
  const [tabData, setTabData] = useState([])
  const [alertInfo, setAlertInfo] = useState(false)

  const getSetting = () => {
    getAccountSetting(user, 'notifications').then((res) => {
      setTabData(res.data)
    })
  }

  const handleUpdateSetting = (fields) => {
    setSaveLoader(true)
    updateAccountSetting(user, 'notifications', fields)
      .then((res) => {
        setSaveLoader(false)
        if (res.error && res.error.nochange)
          alert.error(res.error.nochange, TIMEOUT)
        setTimeout(() => setAlertInfo(false), [2000])
        try {
          setUser(null)
          router.push('/')
        } catch (error) {}
      })
      .catch(() => {
        setSaveLoader(false)
      })
  }

  useEffect(() => {
    if (user) {
      getSetting()
    }
  }, [user])

  return (
    <MySettingsLayout>
      <Notifications
        handleUpdateSetting={handleUpdateSetting}
        setLoad={setLoad}
        tabData={tabData}
      />
    </MySettingsLayout>
  )
}

export default PageNotifications
