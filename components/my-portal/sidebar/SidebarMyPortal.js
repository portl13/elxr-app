import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { sidebarMyPortalStyle } from './SidebarMyPortal.style'
import Logo from '@components/layout/Logo'
import ClientIcon from '@icons/ClientIcon'
import ActivityIcon from '@icons/ActivityIcon'
import StoreIcon from '@icons/StoreIcon'
import CommunityIcon from '@icons/CommunityIcon'
import EventIcon from '@icons/EventIcon'
import ChannelIcon from '@icons/ChannelIcon'
import CourseIcon from '@icons/CourseIcon'
import ProductIcon from '@icons/ProductIcon'
import OrderIcon from '@icons/OrderIcon'
import InboxIcon from '@icons/InboxIcon'

const routers = [
  {
    title: 'Clients',
    icon: <ClientIcon />,
    link: '/my-portal/clients',
  },
  {
    title: 'Activity Feeds',
    icon: <ActivityIcon />,
    link: '/my-portal/activity',
  },
  {
    title: 'Community',
    icon: <CommunityIcon />,
    link: '/my-portal/community',
  },
  {
    title: 'Events',
    icon: <EventIcon />,
    link: '/my-portal/events',
  },
  {
    title: 'Channels',
    icon: <ChannelIcon />,
    link: '/my-portal/channels',
  },
  {
    title: 'My Store',
    icon: <StoreIcon />,
    link: '/my-portal/store',
  },
  {
    title: 'Courses',
    icon: <CourseIcon />,
    link: '/my-portal/courses',
  },
  {
    title: 'Products',
    icon: <ProductIcon />,
    link: '/my-portal/products',
  },
  {
    title: 'Orders',
    icon: <OrderIcon />,
    link: '/my-portal/orders',
  },
  {
    title: 'Inbox',
    icon: <InboxIcon />,
    link: '/my-portal/inbox',
  },
]

function SidebarMyPortal() {
  const router = useRouter()
  return (
    <div css={sidebarMyPortalStyle} className="sidebar_container">
      <div className="sidebar_header d-flex justify-content-center align-items-center">
        <Logo logo="/img/brand/logo.png" alt="weshare" />
      </div>
      <ul className="sidebar_menu">
        {routers.map(({ title, icon, link }) => (
          <li key={link} className={'sidebar_item my-3'}>
            <Link href={link}>
              <a
                className={`sidebar_link ${
                  router.asPath === link ? 'active' : ''
                }`}
              >
                <i className="sidebar_icon">{icon}</i>
                <span className="sidebar_title">{title}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SidebarMyPortal
