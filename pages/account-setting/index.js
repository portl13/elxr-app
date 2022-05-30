import React, { useContext, useEffect, useState } from 'react'
import { Col, Nav, NavItem, Button } from 'reactstrap'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useAlert } from 'react-alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTv } from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/layout/Layout'
import { TIMEOUT, NAV_ICON } from '../../utils/constant'
import { UserContext } from '../../context/UserContext'
import TabContentWrapper from './TabContentWrapper'
import {
  ProfileContainer,
  ProfileLeft,
} from '../../components/livefeed/profile.style'
import {
  getAccountSetting,
  getAccountNav,
  updateAccountSetting,
} from '../api/account.api'
import Loader from '../../components/loader'

export const getTab = ({ tab, setTab, nav, showTab, user }) => {
  
  return (
    <ProfileLeft>
      <div className="nav-wrapper">
        <Button
          color='light'
          className="button-link"
          onClick={() => Router.push('/my-account?tab=dashboard')}
        >
          <FontAwesomeIcon icon={faUser} />
          My Account
        </Button>
        {user && user?.roles.includes('wcfm_vendor') && (
          <Button
            color='light'
            className="button-link"
            onClick={() => Router.push('/channel-manager?tab=home&nav=store')}
          >
            <FontAwesomeIcon icon={faTv} />
            Channel Manager
          </Button>
        )}
        <Nav
          className="nav-fill flex-row"
          id="tabs-icons-text"
          pills
          role="tablist"
        >
          {nav.map((ele) => {
            return ele.value === 'manage' && !showTab ? (
              ''
            ) : (
              <NavItem key={ele.value}>
                <button
                  className={`nav-link  ${tab === ele.value && 'selected'}`}
                  onClick={() => setTab(ele.value, ele.route)}
                >
                  <FontAwesomeIcon icon={NAV_ICON[ele.value]} />
                  {ele.name}
                </button>
              </NavItem>
            )
          })}
        </Nav>
      </div>
    </ProfileLeft>
  )
}

const AccountWrapper = () => {
  const router = useRouter()
  const query = router.query
  const { tab = null } = query
  const alert = useAlert()
  const [tabName, setTab] = useState(null)
  const [loader, setLoader] = useState(true)
  const [navbar, setNav] = useState([])
  const { user, setUser } = useContext(UserContext)
  const [setLoad, setSaveLoader] = useState(false)
  const [tabData, setTabData] = useState([])
  const [alertInfo, setAlertInfo] = useState(false)
  const getLeftNav = () => {
    getAccountNav(user).then((res) => {
      let route = []
      res.data.map((e) => {
        route.push({ name: e.name, value: e.slug })
      })
      setNav(route)
      setLoader(false)
    })
  }
  useEffect(() => {
    if (user?.id) getLeftNav()
  }, [user])

  const getSetting = () => {
    if (tab !== 'blocked-members') {
      getAccountSetting(user, tab).then((res) => {
        setTabData(res.data)
      })
    }
  }

  useEffect(() => {
    if (tab && user?.id) {
      setTab(tab)
      getSetting()
    }
  }, [tab, user])

  const handleRedirect = (e) => {
    router.push(`/account-setting?tab=${e}`)
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
            Router.push('/')
          } catch (error) {}
        }
      })
      .catch(() => {
        setSaveLoader(false)
      })
  }
  return (
    <Layout>
      <Head>
        <title>WeShare | Settings</title>
      </Head>
      <Col className="bg-black bd-radius" xs="12">
        {loader ? (
          <div style={{ textAlign: 'center' }}>
            {' '}
            <Loader />
          </div>
        ) : (
          <ProfileContainer>
            {getTab({
              tab: tabName,
              setTab: handleRedirect,
              nav: navbar,
              user,
            })}
            <TabContentWrapper
              tab={tabName}
              user={user}
              router={router}
              setSaveLoader={setSaveLoader}
              handleUpdateSetting={handleUpdateSetting}
              tabData={tabData}
              setLoad={setLoad}
              alertInfo={alertInfo}
            />
          </ProfileContainer>
        )}
      </Col>
    </Layout>
  )
}
export default AccountWrapper
