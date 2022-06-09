import React, { useState, useEffect } from 'react'
import { NAV_ICON } from '@utils/constant'
import MenuMobileBase from '@components/menu/MenuMobileBase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

function MySettingsMenuMobile(props) {
  const { tab, handleRedirect } = props
  
  return (
    <MenuMobileBase {...props}>
      {router.map((route) => (
        <li onClick={() => handleRedirect(route.value)} key={route.value}>
          <span
            className={`item-profile ${route.value === tab ? 'active' : ''}`}
          >
            <span className="profile-icon">
              <FontAwesomeIcon icon={NAV_ICON[route.value]} />
            </span>
            <h5 className="profile-title-card">{route.name}</h5>
          </span>
        </li>
      ))}
    </MenuMobileBase>
  )
}

export default MySettingsMenuMobile
