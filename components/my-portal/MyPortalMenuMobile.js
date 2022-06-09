import React, { useState, useEffect } from 'react'
import MenuMobileBase from '@components/menu/MenuMobileBase'
import { faCalendar, faLaptop, faStore, faTv } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const router = [
  {
    name: 'Go Live',
    route: 'stream',
    tab: 'golive',
    icon: faTv
  },
  {
    name: 'Scheduling',
    route: 'meetings',
    tab: 'scheduling',
    icon: faCalendar
  },
  {
    name: 'Portal Settings',
    route: 'store',
    tab: 'portal-settings',
    icon: faLaptop,
  },
  {
    name: 'My Store',
    route: 'edit-subscription',
    tab: 'store',
    icon: faStore
  },
]

function MyPortalMenuMobile(props) {
  const { tab, handleRedirect } = props
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(!open)
  }, [tab])

  const propsMenu = {
    ...props,
    open,
    setOpen,
  }
  return (
  <MenuMobileBase {...propsMenu}>
      {router.map((route) => (
        <li onClick={() => handleRedirect(route.tab ,route.route)} key={route.route}>
          <span
            className={`item-profile ${route.tab === tab ? 'active' : ''}`}
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

export default MyPortalMenuMobile
