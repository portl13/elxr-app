import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Logo from '@components/layout/Logo'
import ActivityIcon from '@icons/ActivityIcon'
import CommunityIcon from '@icons/CommunityIcon'
import EventIcon from '@icons/EventIcon'
import ChannelIcon from '@icons/ChannelIcon'
import CourseIcon from '@icons/CourseIcon'
import CreatorIcon from '@icons/CreatorIcon'
import PodcastsIcon from '@icons/PodcastsIcon'
import VideosIcon from '@icons/VideosIcon'
import { UserContext } from '@context/UserContext'
import { sidebarDashStyle } from '@components/dashboard/sidebar/SidebarDashboard.style'
import BlogsIcon from '@icons/BlogsIcon'

const routers = [
  {
    title: 'Creators',
    icon: <CreatorIcon className={"dashboard-icon"} />,
    link: '/creators',
  },
  {
    title: 'Channels',
    icon: <ChannelIcon />,
    link: '/channels',
  },
  {
    title: 'Events',
    icon: <EventIcon />,
    link: '/events',
  },
  {
    title: 'Videos',
    icon: <VideosIcon className={"dashboard-icon"} />,
    link: '/videos',
  },
  {
    title: 'Podcasts',
    icon: <PodcastsIcon className={"dashboard-icon"} />,
    link: '/podcasts',
  },
  {
    title: 'Courses',
    icon: <CourseIcon />,
    link: '/courses',
  },
  {
    title: 'Blogs',
    icon: <BlogsIcon />,
    link: '/blogs',
  },
  {
    title: 'Communities',
    icon: <CommunityIcon />,
    link: '/communities',
  }
]

function MainSidebar() {
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
              href={ link}
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

export default MainSidebar
