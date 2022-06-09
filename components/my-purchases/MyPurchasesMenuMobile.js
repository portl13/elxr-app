import React, {useState, useEffect} from 'react'
import MenuMobileBase from '@components/menu/MenuMobileBase'
import { faBuffer } from '@fortawesome/free-brands-svg-icons'
import {
  faCalculator,
  faCloudDownloadAlt,
  faGraduationCap,
  faWifi,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const routers = [
  {
    name: 'My Dashboard',
    value: 'dashboard',
    icon: faCalculator,
  },
  {
    name: 'My Orders',
    value: 'orders',
    icon: faBuffer,
  },
  {
    name: 'My Subscriptions',
    value: 'subscriptions',
    icon: faWifi,
  },
  {
    name: 'My Downloads',
    value: 'downloads',
    icon: faCloudDownloadAlt,
  },
  {
    name: 'My Courses',
    value: 'courses',
    icon: faGraduationCap,
  },
]

function MyPurchasesMenuMobile(props) {
  const { tab, handleRedirect } = props

  return (
    <MenuMobileBase {...props}>
      {routers.map((route) => (
        <li onClick={() => handleRedirect(route.value)} key={route.value}>
          <span
            className={`item-profile ${route.value === tab ? 'active' : ''}`}
          >
            <span className="profile-icon">
              <FontAwesomeIcon icon={route.icon} />
            </span>
            <h5 className="profile-title-card">{route.name}</h5>
          </span>
        </li>
      ))}
    </MenuMobileBase>
  )
}

export default MyPurchasesMenuMobile
