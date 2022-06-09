import React from 'react'
import { faLaptop, faStore, faTv, faVideo } from '@fortawesome/free-solid-svg-icons'
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

function MyPortalMenu(props) {
  const router = useRouter()

  const { handleRedirect, innerNav, channel } = props

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
        icon={<FontAwesomeIcon icon={faTv} />}
        onClick={() => myChannel(channel)}
      />

      <SidebarLi
        text="Go Live"
        isHeading={true}
        icon={<FontAwesomeIcon icon={faVideo} />}
        iconClass="go-live"
      />

      <SidebarSubMenu
        innerNav={innerNav}
        submenu={LIVE_SUB_NAV}
        tab="golive"
        handleRedirect={handleRedirect}
      />

      <SidebarLi
        text="Scheduling"
        icon={<FontAwesomeIcon icon={faCalendar} />}
        isHeading={true}
      />

      <SidebarSubMenu
        innerNav={innerNav}
        submenu={SCHELUDE_SUB_NAV}
        tab="scheduling"
        handleRedirect={handleRedirect}
      />

      <SidebarLi
        text="Portal Settings"
        isHeading={true}
        icon={<FontAwesomeIcon icon={faLaptop} />}
      />

      <SidebarSubMenu
        innerNav={innerNav}
        submenu={CHANEL_SUB_NAV}
        tab="portal-settings"
        handleRedirect={handleRedirect}
      />

      <SidebarLi
        text="My Store"
        isHeading={true}
        icon={<FontAwesomeIcon icon={faStore} />}
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
