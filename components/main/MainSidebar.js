import React, {useContext, useEffect, useState} from 'react'
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
import { useMenu } from '@context/MenuContext'
import { Scrollbars } from 'react-custom-scrollbars-2'
import SaveIcon from '@icons/SaveIcon'
import {UserContext} from "@context/UserContext";
import {faBars} from "@fortawesome/free-solid-svg-icons";

const initialRouters = [
  {
    title: 'Discover',
    icon: <DiscoverIcon className={'dashboard-icon'} />,
    link: '/',
    id: 'discover',
    auth: false
  },
  {
    title: 'Creators',
    icon: <CreatorIcon className={'dashboard-icon'} />,
    link: '/creators',
    id: 'creators',
    auth: false
  },
  {
    title: 'Channels',
    icon: <ChannelIcon />,
    link: '/channels',
    id: 'channels',
    auth: false
  },
  {
    title: 'Events',
    icon: <EventIcon />,
    link: '/events',
    id: 'events',
    auth: false
  },
  {
    title: 'Videos',
    icon: <VideosIcon className={'dashboard-icon'} />,
    link: '/videos',
    id: 'videos',
    auth: false
  },
  {
    title: 'Podcasts',
    icon: <PodcastsIcon className={'dashboard-icon'} />,
    link: '/podcasts',
    id: 'podcasts',
    auth: false
  },
  {
    title: 'Courses',
    icon: <CourseIcon />,
    link: '/courses',
    id: 'courses',
    auth: false
  },
  {
    title: 'Blogs',
    icon: <BlogsIcon />,
    link: '/blogs',
    id: 'blogs',
    auth: false
  },
  {
    title: 'Communities',
    icon: <CommunityIcon />,
    link: '/communities',
    id: 'communities',
    auth: false
  },
  {
    title: 'Saved',
    icon: <SaveIcon className="dashboard-icon" />,
    link: '/saved',
    id: 'saved',
    auth: true
  },
]

function MainSidebar() {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const { show, setShow } = useMenu()
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const toggle = () => setTooltipOpen(!tooltipOpen)
  const [routers, setRouters] = useState(initialRouters)


  useEffect(()=>{
    if(user){
      const newRouter = routers.map(route => {
        if (route.auth){
          route.auth = false
          return route
        }
        return route
      })
      setRouters(newRouter)
    }
  },[user])

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
          {routers.map(({ title, icon, link, id,auth }) => (
              <React.Fragment key={id}>
              {!auth && (
                <li  className={'sidebar_item my-3 tooltip-custom'}>
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
                )}
              </React.Fragment>
          ))}
        </Scrollbars>
      </ul>
    </div>
  )
}

export default MainSidebar
