import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { sidebarDashStyle } from './SidebarDashboard.style'
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
import BookIcon from '@icons/BookIcon'
import CreatorIcon from '@icons/CreatorIcon'
import PodcastsIcon from '@icons/PodcastsIcon'
import VideosIcon from '@icons/VideosIcon'
import BlogsIcon from '@icons/BlogsIcon'
import { useMenu } from '@context/MenuContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const routers = [
  {
    title: 'Dashboard',
    icon: <CreatorIcon className={'dashboard-icon'} />,
    link: '/dashboard/creator',
    id: 'dashboard',
  },
  {
    title: 'Channels',
    icon: <ChannelIcon />,
    link: '/dashboard/channels',
    id: 'channels',
  },
  {
    title: 'Events',
    icon: <EventIcon />,
    link: '/dashboard/events',
    id: 'events',
  },
  {
    title: 'Videos',
    icon: <VideosIcon className={'dashboard-icon'} />,
    link: '/dashboard/videos',
    id: 'videos',
  },
  {
    title: 'Podcasts',
    icon: <PodcastsIcon className={'dashboard-icon'} />,
    link: '/dashboard/podcasts',
    id: 'podcasts',
  },
  {
    title: 'Courses',
    icon: <CourseIcon />,
    link: '/dashboard/courses',
    id: 'courses',
  },
  {
    title: 'Lessons',
    icon: <CourseIcon />,
    link: '/dashboard/lessons',
    id: 'lessons',
  },
  {
    title: 'Blogs',
    icon: <BlogsIcon />,
    link: '/dashboard/blogs',
    id: 'blogs',
  },
  {
    title: 'Communities',
    icon: <CommunityIcon />,
    link: '/dashboard/communities',
    id: 'communities',
  },
  {
    title: 'Meetings',
    icon: <CommunityIcon />,
    link: '/dashboard/meetings',
    id: 'meetings',
  },
  {
    title: 'Products',
    icon: <ProductIcon />,
    link: '/dashboard/products',
    id: 'products',
  },
  {
    title: 'Customers',
    icon: <ClientIcon />,
    link: '/dashboard/customers',
    id: 'customers',
  },
  {
    title: 'Orders',
    icon: <OrderIcon />,
    link: '/dashboard/orders',
    id: 'orders',
  },
  {
    title: 'Library',
    icon: <BookIcon />,
    link: '/dashboard/library',
    id: 'library',
  },
  {
    title: 'Activity Feeds',
    icon: <ActivityIcon />,
    link: '/dashboard/activity',
    id: 'activity',
  },
]

function SidebarDashboard() {
  const { show, setShow } = useMenu()
  const router = useRouter()

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
        {routers.map(({ title, icon, link, id }) => (
          <li key={id} className={'sidebar_item my-3 tooltip-custom'}>
            <Link href={link}>
              <a
                className={`sidebar_link ${
                  router.asPath.includes(link) ? 'active' : ''
                }`}
              >
                <i className="sidebar_icon">{icon}</i>
                <span className="sidebar_title">{title}</span>
              </a>
            </Link>
            <span className="tooltiptext">
              <span className="tooltiptext-title">{title}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SidebarDashboard
