import React, { useContext } from 'react'
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
import InboxIcon from '@icons/InboxIcon'
import BookIcon from '@icons/BookIcon'
import { UserContext } from '@context/UserContext'
import CreatorIcon from '@icons/CreatorIcon'
import PodcastsIcon from '@icons/PodcastsIcon'
import VideosIcon from '@icons/VideosIcon'
import BlogsIcon from '@icons/BlogsIcon'

const routers = [
  {
    title: 'Dashboard',
    icon: <CreatorIcon className={"dashboard-icon"} />,
    link: '/dashboard/creator',
  },
  {
    title: 'Channels',
    icon: <ChannelIcon />,
    link: '/dashboard/channels',
  },
  {
    title: 'Events',
    icon: <EventIcon />,
    link: '/dashboard/events',
  },
  {
    title: 'Videos',
    icon: <VideosIcon className={"dashboard-icon"} />,
    link: '/dashboard/videos',
  },
  {
    title: 'Podcasts',
    icon: <PodcastsIcon className={"dashboard-icon"} />,
    link: '/dashboard/podcasts',
  },
  {
    title: 'Courses',
    icon: <CourseIcon />,
    link: '/dashboard/courses',
  },
  {
    title: 'Lessons',
    icon: <CourseIcon />,
    link: '/dashboard/lessons',
  },
  {
    title: 'Blogs',
    icon: <BlogsIcon/>,
    link: '/dashboard/blogs',
  },
  {
    title: 'Communities',
    icon: <CommunityIcon />,
    link: '/dashboard/communities',
  },
  {
    title: 'Meetings',
    icon: <CommunityIcon />,
    link: '/dashboard/meetings',
  },
  {
    title: 'Products',
    icon: <ProductIcon />,
    link: '/dashboard/products',
  },
  {
    title: 'Customers',
    icon: <ClientIcon />,
    link: '/dashboard/customers',
  },
  {
    title: 'Orders',
    icon: <OrderIcon />,
    link: '/dashboard/orders',
  },
  {
    title: 'Library',
    icon: <BookIcon />,
    link: '/dashboard/library',
  },
  {
    title: 'Activity Feeds',
    icon: <ActivityIcon />,
    link: '/dashboard/activity',
  },
]

function SidebarDashboard() {
  const { user } = useContext(UserContext)
  const router = useRouter()

  return (
    <div css={sidebarDashStyle} className="sidebar_container">
      <div className="sidebar_header d-flex justify-content-center align-items-center">
        <Logo logo="/img/brand/logo.png" alt="weshare" />
      </div>
      <ul className="sidebar_menu">
        {routers.map(({ title, icon, link }) => (
          <li key={link} className={'sidebar_item my-3'}>
            <Link
              href={link}
            >
              <a
                className={`sidebar_link ${
                  router.asPath.includes(link) ? 'active' : ''
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

export default SidebarDashboard
