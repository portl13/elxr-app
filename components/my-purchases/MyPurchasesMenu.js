import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuffer } from '@fortawesome/free-brands-svg-icons'
import {
  faCalculator,
  faCloudDownloadAlt,
  faGraduationCap,
  faWifi,
} from '@fortawesome/free-solid-svg-icons'
import Sidebar from '@components/sidebar/Sidebar'
import SidebarLi from '@components/sidebar/SidebarLi'

const routers = [
  {
    name: 'My Dashboard',
    value: 'dashboard',
    icon: faCalculator
  },
  {
    name: 'My Orders',
    value: 'orders',
    icon: faBuffer
  },
  {
    name: 'My Subscriptions',
    value: 'subscriptions',
    icon: faWifi
  },
  {
    name: 'My Downloads',
    value: 'downloads',
    icon: faCloudDownloadAlt
  },
  {
    name: 'My Courses',
    value: 'courses',
    icon: faGraduationCap
  }
]

function MyPurchasesMenu(props) {
  const { tab, handleRedirect } = props

  return (
    <Sidebar>
      {routers.map((route) => (
        <SidebarLi
          key={route.value}
          isActive={tab === route.value}
          onClick={() => handleRedirect(route.value)}
          icon={<FontAwesomeIcon icon={route.icon} />}
          text={route.name}
        />
      ))}
    </Sidebar>
  )
}
export default MyPurchasesMenu
