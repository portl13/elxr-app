import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NAV_ICON } from '@utils/constant'
import Router from 'next/router'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '@components/sidebar/Sidebar'
import SidebarLi from '@components/sidebar/SidebarLi'
import { UserContext } from '@context/UserContext'

const router = [
  {
    name: 'Login Information',
    value: 'general',
  },
  {
    name: 'Email Preferences',
    value: 'notifications',
  },
  {
    name: 'Privacy',
    value: 'profile',
  },
  {
    name: 'Blocked Members',
    value: 'blocked-members',
  },
  {
    name: 'Group Invites',
    value: 'invites',
  },
  {
    name: 'Export Data',
    value: 'export',
  },
  {
    name: 'Delete Account',
    value: 'delete-account',
  },
  {
    name: 'My Addresses',
    value: 'address',
  },
  {
    name: 'My Payment Methods',
    value: 'payment-method',
  },
  {
    name: 'My Account Details',
    value: 'account-details',
  },
]

function MySettingsMenu(props) {
  const { setUser } = useContext(UserContext)
  const { tab, handleRedirect } = props

  const logout = () => {
    setUser(null)
    Router.push('/')
  }

  return (
    <Sidebar>
      {router.map((route) => (
        <SidebarLi
          key={route.value}
          icon={<FontAwesomeIcon icon={NAV_ICON[route.value]} />}
          text={route.name}
          isActive={tab === route.value}
          onClick={() => handleRedirect(route.value)}
        />
      ))}
      <SidebarLi
        icon={<FontAwesomeIcon icon={faPowerOff} />}
        text="Logout"
        onClick={() => logout()}
      />
    </Sidebar>
  )
}
export default MySettingsMenu
