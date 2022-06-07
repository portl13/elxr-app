import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '@context/UserContext'
import Layout from '@components/layout/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { myAccountWrapper } from '@components/my-account/MyAccountWrapper.style'
import {
  getAccountSetting,
  updateAccountSetting,
} from '@api/account.api'
import { useAlert } from 'react-alert'
import MySettingsMenu from '@components/my-settings/MySettingsMenu'
import MySettingsTab from '@components/my-settings/MySettingsTab'

const excludeRoute = {
  'address': true,
  'edit-address': true,
  'shipping-address': true,
  'account-details': true,
  'payment-method': true,
  'add-payment-method': true
}

function MySettings() {
  const router = useRouter()
  const query = router.query
  const { tab = null } = query
  const { user, setUser } = useContext(UserContext)
  const alert = useAlert()
  const [tabName, setTab] = useState(null)
  const [loader, setLoader] = useState(true)
  const [setLoad, setSaveLoader] = useState(false)
  const [tabData, setTabData] = useState([])
  const [alertInfo, setAlertInfo] = useState(false)

  const getSetting = () => {
    if (tab !== 'blocked-members') {
      getAccountSetting(user, tab).then((res) => {
        setTabData(res.data)
      })
    }
  }

  useEffect(() => {
    if(excludeRoute[tab]) return
    if (tab && user?.id) {
      setTab(tab)
      getSetting()
    }
  }, [tab])

  const handleRedirect = (e) => {
    router.push(`/my-settings?tab=${e}`)
    setTab(e)
  }

  const handleUpdateSetting = (fields) => {
    setSaveLoader(true)
    updateAccountSetting(user, tab, fields)
      .then((res) => {
        setSaveLoader(false)
        if (tab !== 'delete-account') getSetting()
        if (res.error && res.error.nochange)
          alert.error(res.error.nochange, TIMEOUT)
        let msg = tab === 'export' ? res.data.notices : res.data.success
        msg = res.data.error ? res.data.error : msg
        tab !== 'profile' && alert.success(msg, TIMEOUT)
        tab === 'profile' && setAlertInfo(true)
        setTimeout(() => setAlertInfo(false), [2000])
        if (tab === 'delete-account') {
          try {
            setUser(null)
            router.push('/')
          } catch (error) {}
        }
      })
      .catch(() => {
        setSaveLoader(false)
      })
  }

  return (
    <Layout
      leftMenu={<MySettingsMenu tab={tab} handleRedirect={handleRedirect} />}
      menuMobile={{
        type: 'my-account',
        tab: tabName,
      }}
      noMenu={false}
    >
      <Head>
        <title>WeShare | Settings</title>
      </Head>
      <div css={myAccountWrapper} className="my-account-wrapper">
        <MySettingsTab
          tab={tabName}
          user={user}
          router={router}
          setSaveLoader={setSaveLoader}
          handleUpdateSetting={handleUpdateSetting}
          handleRedirect={handleRedirect}
          tabData={tabData}
          setLoad={setLoad}
          alertInfo={alertInfo}
        />
      </div>
    </Layout>
  )
}
export default MySettings
