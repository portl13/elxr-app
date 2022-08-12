import React, { useContext, useEffect, useState } from 'react'
import MySettingsLayout from '@components/my-settings/layout/MySettingsLayout'
import ExportData from '@components/my-settings/ExportData'
import { UserContext } from '@context/UserContext'
import { getAccountSetting } from '@api/account.api'

function PageExport() {
  const { user, setUser } = useContext(UserContext)
  const [setLoad, setSaveLoader] = useState(false)
  const [tabData, setTabData] = useState([])
  const [alertInfo, setAlertInfo] = useState(false)

  const getSetting = () => {
    getAccountSetting(user, 'export').then((res) => {
      setTabData(res.data)
    })
  }

  const handleUpdateSetting = (fields) => {
    setSaveLoader(true)
    updateAccountSetting(user, tab, fields)
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
      <ExportData
        handleUpdateSetting={handleUpdateSetting}
        setLoad={setLoad}
        tabData={tabData}
      />
    </MySettingsLayout>
  )
}

export default PageExport
