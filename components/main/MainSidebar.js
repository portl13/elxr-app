import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Logo from '@components/layout/Logo'
import CommunityIcon from '@icons/CommunityIcon'
import EventIcon from '@icons/EventIcon'
import ChannelIcon from '@icons/ChannelIcon'
import CourseIcon from '@icons/CourseIcon'
import CreatorIcon from '@icons/CreatorIcon'
import PodcastsIcon from '@icons/PodcastsIcon'
import VideosIcon from '@icons/VideosIcon'
import { sidebarDashStyle } from '@components/dashboard/sidebar/SidebarDashboard.style'
import BlogsIcon from '@icons/BlogsIcon'
import DiscoverIcon from '@icons/DiscoverIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useMenu } from '@context/MenuContext'
import { Scrollbars } from 'react-custom-scrollbars-2'
import SaveIcon from '@icons/SaveIcon'

const routers = [
  {
    title: 'Discover',
    icon: <DiscoverIcon className={'dashboard-icon'} />,
    link: '/',
    id: 'discover',
  },
  {
    title: 'Creators',
    icon: <CreatorIcon className={'dashboard-icon'} />,
    link: '/creators',
    id: 'creators',
  },
  {
    title: 'Channels',
    icon: <ChannelIcon />,
    link: '/channels',
    id: 'channels',
  },
  {
    title: 'Events',
    icon: <EventIcon />,
    link: '/events',
    id: 'events',
  },
  {
    title: 'Videos',
    icon: <VideosIcon className={'dashboard-icon'} />,
    link: '/videos',
    id: 'videos',
  },
  {
    title: 'Podcasts',
    icon: <PodcastsIcon className={'dashboard-icon'} />,
    link: '/podcasts',
    id: 'podcasts',
  },
  {
    title: 'Courses',
    icon: <CourseIcon />,
    link: '/courses',
    id: 'courses',
  },
  {
    title: 'Blogs',
    icon: <BlogsIcon />,
    link: '/blogs',
    id: 'blogs',
  },
  {
    title: 'Communities',
    icon: <CommunityIcon />,
    link: '/communities',
    id: 'communities',
  },
  {
    title: 'Saved',
    icon: <SaveIcon className="dashboard-icon" />,
    link: '/saved',
    id: 'saved',
  },
]

function MainSidebar() {
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

export default MainSidebar
