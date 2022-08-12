import React, { useContext, useEffect, useState } from 'react'
import MySettingsLayout from '@components/my-settings/layout/MySettingsLayout'
import GroupInvites from '@components/my-settings/GroupInvites'
import { useAlert } from 'react-alert'
import { UserContext } from '@context/UserContext'
import { getAccountSetting, updateAccountSetting } from '@api/account.api'

function PageInvites() {
  const { user, setUser } = useContext(UserContext)
  const alert = useAlert()
  const [setLoad, setSaveLoader] = useState(false)
  const [tabData, setTabData] = useState([])
  const [alertInfo, setAlertInfo] = useState(false)

  const getSetting = () => {
      getAccountSetting(user, 'invites').then((res) => {
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
    updateAccountSetting(user, 'invites', fields)
      .then((res) => {
        setSaveLoader(false)
        if (res.error && res.error.nochange)
          alert.error(res.error.nochange, TIMEOUT)
        let msg = tab === 'export' ? res.data.notices : res.data.success
        msg = res.data.error ? res.data.error : msg
        tab !== 'profile' && alert.success(msg, TIMEOUT)
        setTimeout(() => setAlertInfo(false), [2000])
      })
      .catch(() => {
        setSaveLoader(false)
      })
  }

  return (
    <MySettingsLayout>
      <GroupInvites
        handleUpdateSetting={handleUpdateSetting}
        setLoad={setLoad}
        tabData={tabData}
      />
    </MySettingsLayout>
  )
}

export default PageInvites
