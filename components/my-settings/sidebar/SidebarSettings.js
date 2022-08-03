import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Logo from '@components/layout/Logo'
import { sidebarDashStyle } from '@components/dashboard/sidebar/SidebarDashboard.style'
import DiscoverIcon from '@icons/DiscoverIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faCloudDownloadAlt,
  faCog,
  faCreditCard,
  faEnvelope,
  faList,
  faListAlt,
  faLocationArrow,
  faLock,
  faPlusCircle,
  faRandom,
  faTrash,
  faUserFriends,
  faUserTimes,
  faWallet,
} from '@fortawesome/free-solid-svg-icons'
import { useMenu } from '@context/MenuContext'
import { Scrollbars } from 'react-custom-scrollbars-2'

const routers = [
  {
    title: 'Login Information',
    icon: <FontAwesomeIcon className={'dashboard-icon'} icon={faUserFriends} />,
    link: '/my-settings/general',
    id: 'general',
  },
  {
    title: 'Email Preferences',
    icon: <FontAwesomeIcon className={'dashboard-icon'} icon={faEnvelope} />,
    link: '/my-settings/notifications',
    id: 'notifications',
  },
  {
    title: 'Privacy',
    icon: <FontAwesomeIcon className={'dashboard-icon'} icon={faUserTimes} />,
    link: '/my-settings/profile',
    id: 'profile',
  },
  {
    title: 'Blocked Members',
    icon: <FontAwesomeIcon className={'dashboard-icon'} icon={faLock} />,
    link: '/my-settings/blocked-members',
    id: 'blocked-members',
  },
  {
    title: 'Group Invites',
    icon: <FontAwesomeIcon className={'dashboard-icon'} icon={faCog} />,
    link: '/my-settings/invites',
    id: 'invites',
  },
  {
    title: 'Export Data',
    icon: (
      <FontAwesomeIcon className={'dashboard-icon'} icon={faCloudDownloadAlt} />
    ),
    link: '/my-settings/export',
    id: 'export',
  },
  {
    title: 'Delete Account',
    icon: <FontAwesomeIcon className={'dashboard-icon'} icon={faTrash} />,
    link: '/my-settings/delete-account',
    id: 'delete-account',
  },
  {
    title: 'My Addresses',
    icon: (
      <FontAwesomeIcon className={'dashboard-icon'} icon={faLocationArrow} />
    ),
    link: '/my-settings/address',
    id: 'address',
  },
  {
    title: 'My Payment Methods',
    icon: <FontAwesomeIcon className={'dashboard-icon'} icon={faCreditCard} />,
    link: '/my-settings/payment-method',
    id: 'payment-method',
  },
  {
    title: 'My Account Details',
    icon: <FontAwesomeIcon className={'dashboard-icon'} icon={faCog} />,
    link: '/my-settings/account-details',
    id: 'account-details',
  },
]

function SidebarSettings() {
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
        <Logo logo="/img/brand/logo.png" alt="weshare" />
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

export default SidebarSettings
