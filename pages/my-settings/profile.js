import React, { useContext, useEffect, useState } from 'react'
import MySettingsLayout from '@components/my-settings/layout/MySettingsLayout'
import Privacy from '@components/my-settings/Privacy'
import { getAccountSetting } from '@api/account.api'
import { UserContext } from '@context/UserContext'
import { useAlert } from 'react-alert'

function PageProfile() {
  const { user } = useContext(UserContext)
  const alert = useAlert()
  const [setLoad, setSaveLoader] = useState(false)
  const [tabData, setTabData] = useState([])
  const [alertInfo, setAlertInfo] = useState(false)

  const getSetting = () => {
    getAccountSetting(user, 'profile').then((res) => {
      setTabData(res.data)
    })
  }

  useEffect(() => {
    if (user) {
      getSetting()
    }
  }, [user])

  const handleUpdateSetting = (fields) => {
    setSaveLoader(true)
    updateAccountSetting(user, 'profile', fields)
      .then((res) => {
        setSaveLoader(false)
        getSetting()
        if (res.error && res.error.nochange)
          alert.error(res.error.nochange, TIMEOUT)
        let msg = tab === 'export' ? res.data.notices : res.data.success
        msg = res.data.error ? res.data.error : msg
        tab === 'profile' && setAlertInfo(true)
        setTimeout(() => setAlertInfo(false), [2000])
      })
      .catch(() => {
        setSaveLoader(false)
      })
  }

  return (
    <MySettingsLayout>
      <Privacy
        handleUpdateSetting={handleUpdateSetting}
        setLoad={setLoad}
        tabData={tabData}
        alertInfo={alertInfo}
      />
    </MySettingsLayout>
  )
}

export default PageProfile
