import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@emotion/core'
import { NAV_ICON } from '@utils/constant'
import Router from 'next/router'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '@components/sidebar/Sidebar'
import SidebarLi from '@components/sidebar/SidebarLi'

const navStyle = css`
  width: 245px;
  position: fixed;

  .nav {
    height: auto !important;
  }
  .nav-item.active::before {
    background-color: transparent !important;
  }
  .nav-item.active .nav-link,
  .nav-item.active .nav-icon svg,
  .nav-item.active .st0 {
    color: var(--primary-color);
    fill: var(--primary-color);
  }
  .custom-icon {
    color: bisque;
  }
  .nav-link {
    color: var(--typo);
  }
  .nav-icon {
    svg {
      width: 20px;
      color: var(--typo);
    }
  }
  .banner-menu {
    margin-top: 20px;
    .logo {
      padding-top: 20px;
      padding-bottom: 20px;
      margin: auto;
      max-width: 70px;
    }
    a {
      color: var(--typo);
    }
  }
`

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
  const { tab, handleRedirect } = props

  const logout = () => {
    Router.push('/')
    setUser(null)
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
