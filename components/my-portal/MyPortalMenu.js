import React from 'react'
import { faCog, faLaptop, faStore, faTv, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  CHANEL_SUB_NAV,
  LIVE_SUB_NAV,
  SCHELUDE_SUB_NAV,
  STORE_SUB_NAV,
} from '@utils/constant'
import { useRouter } from 'next/router'
import { stringToSlug } from '@lib/stringToSlug'
import Sidebar from '@components/sidebar/Sidebar'
import SidebarLi from '@components/sidebar/SidebarLi'
import SidebarSubMenu from '@components/sidebar/SidebarSubMenu'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import CartIcon from '/public/img/bx-cart.svg'

function MyPortalMenu(props) {
  const router = useRouter()

  const { handleRedirect, innerNav, channel, tab } = props

  const myChannel = ({ vendor_shop_name, vendor_id }) => {
    router.push(
      `/channel/${stringToSlug(
        vendor_shop_name
      )}/${vendor_id}?key=timeline&tab=personal`
    )
  }

  return (
    <Sidebar>
      <SidebarLi
        text="Visit My Portal"
        titleClass="title-menu-heading"
        icon={<FontAwesomeIcon icon={faTv} />}
        onClick={() => myChannel(channel)}
      />

      <SidebarLi
        text="Go Live"
        titleClass="title-menu-heading"
        isHeading={true}
        icon={<FontAwesomeIcon icon={faVideo} />}
        iconClass="go-live"
        isActive={tab === 'golive'}
      />

      <SidebarSubMenu
        innerNav={innerNav}
        submenu={LIVE_SUB_NAV}
        tab="golive"
        handleRedirect={handleRedirect}
      />

      <SidebarLi
        text="Scheduling"
        titleClass="title-menu-heading"
        icon={<img src='/img/scheduling-icon-white.png' />}
        isHeading={true}
        isActive={tab === 'scheduling'}
      />

      <SidebarSubMenu
        innerNav={innerNav}
        submenu={SCHELUDE_SUB_NAV}
        tab="scheduling"
        handleRedirect={handleRedirect}
      />

      <SidebarLi
        text="Portal Settings"
        titleClass="title-menu-heading"
        isHeading={true}
        icon={<FontAwesomeIcon icon={faCog} />}
        isActive={tab === 'portal-settings'}
      />

      <SidebarSubMenu
        innerNav={innerNav}
        submenu={CHANEL_SUB_NAV}
        tab="portal-settings"
        handleRedirect={handleRedirect}
      />

      <SidebarLi
        text="My Store"
        titleClass="title-menu-heading"
        isHeading={true}
        isActive={tab === 'store'}
        icon={<CartIcon />}
      />

      <SidebarSubMenu
        innerNav={innerNav}
        submenu={STORE_SUB_NAV}
        tab="store"
        handleRedirect={handleRedirect}
      />
    </Sidebar>
  )
}

export default MyPortalMenu
