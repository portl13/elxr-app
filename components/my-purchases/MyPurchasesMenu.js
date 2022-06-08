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

function MyPurchasesMenu(props) {
  const { tab, handleRedirect } = props

  return (
    <Sidebar>
      <SidebarLi
        isActive={tab === 'dashboard'}
        onClick={() => handleRedirect('dashboard')}
        icon={<FontAwesomeIcon icon={faCalculator} />}
        text="My Dashboard"
      />
      <SidebarLi
        isActive={tab === 'orders'}
        onClick={() => handleRedirect('orders')}
        icon={<FontAwesomeIcon icon={faBuffer} />}
        text="My Orders"
      />
      <SidebarLi
        isActive={tab === 'subscriptions'}
        onClick={() => handleRedirect('subscriptions')}
        icon={<FontAwesomeIcon icon={faWifi} />}
        text="My Subscriptions"
      />
      <SidebarLi
        isActive={tab === 'downloads'}
        onClick={() => handleRedirect('downloads')}
        icon={<FontAwesomeIcon icon={faCloudDownloadAlt} />}
        text="My Downloads"
      />
      <SidebarLi
        isActive={tab === 'courses'}
        onClick={() => handleRedirect('courses')}
        icon={<FontAwesomeIcon icon={faGraduationCap} />}
        text="My Courses"
      />
    </Sidebar>
  )
}
export default MyPurchasesMenu
