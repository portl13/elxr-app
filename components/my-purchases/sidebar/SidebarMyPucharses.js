import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Logo from '@components/layout/Logo'
import EventIcon from '@icons/EventIcon'
import ChannelIcon from '@icons/ChannelIcon'
import ProfessionalsIcon from '@icons/CreatorIcon'
import VideosIcon from '@icons/VideosIcon'
import { sidebarDashStyle } from '@components/dashboard/sidebar/SidebarDashboard.style'
import DiscoverIcon from '@icons/DiscoverIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useMenu } from '@context/MenuContext'
import { Scrollbars } from 'react-custom-scrollbars-2'

const routers = [
  {
    title: 'My Dashboard',
    icon: <DiscoverIcon className={'dashboard-icon'} />,
    link: '/my-purchases/dashboard',
    id: 'dashboard',
  },
  {
    title: 'My Orders',
    icon: <ProfessionalsIcon className={'dashboard-icon'} />,
    link: '/my-purchases/orders',
    id: 'orders',
  },
  {
    title: 'My Subscriptions',
    icon: <ChannelIcon />,
    link: '/my-purchases/subscriptions',
    id: 'subscriptions',
  },
  {
    title: 'My Downloads',
    icon: <EventIcon />,
    link: '/my-purchases/donwloads',
    id: 'donwloads',
  },
  {
    title: 'My Courses',
    icon: <VideosIcon className={'dashboard-icon'} />,
    link: '/my-purchases/courses',
    id: 'courses',
  }
]

function SidebarMyPucharses() {
  const router = useRouter()
  const { show, setShow } = useMenu()
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const toggle = () => setTooltipOpen(!tooltipOpen)
  return (
    <div
      css={sidebarDashStyle}
      className={`sidebar_container ${show ? 'active' : ''}`}
    >
      <div className="sidebar_header">
        <button onClick={() => setShow(!show)} className="btn-menu">
          <FontAwesomeIcon className="icon-menu" icon={faBars} />
        </button>
        <Logo logo="/img/brand/logo.png" alt="elxr" />
      </div>
      <ul className="sidebar_menu">
        <Scrollbars universal>
          {routers.map(({ title, icon, link, id }) => (
            <li key={id} className={'sidebar_item my-3 tooltip-custom'}>
              <Link href={link}>
                <a
                  className={`sidebar_link ${
                    router.asPath === link ? 'active' : ''
                  }`}
                >
                  <i id={'Tooltip-' + id} className="sidebar_icon">
                    {icon}
                  </i>
                  <span className="sidebar_title">
                    <h5>{title}</h5>
                  </span>
                </a>
              </Link>
              {/* <span className="tooltiptext">
                <span className="tooltiptext-title">{title}</span>
              </span> */}
            </li>
          ))}
        </Scrollbars>
      </ul>
    </div>
  )
}

export default SidebarMyPucharses
