import React from 'react'
import Link from 'next/link'
import { css } from '@emotion/core'
import { faTv, faUsers, faWaveSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'

const navStyle = css`
  width: 245px;
  position: fixed;
  .nav {
    height: auto !important;
  }
  .nav-item.active::before {
    background-color: transparent !important;
  }
  .nav-item.active .nav-link,
  .nav-item.active .nav-icon svg,
  .nav-item.active .st0 {
    color: var(--primary-color);
    fill: var(--primary-color);
  }
  .custom-icon {
    color: bisque;
  }
  .nav-link {
    color: var(--typo);
  }
  .nav-icon {
    svg {
      width: 20px;
      color: var(--typo);
    }
  }
  .banner-menu {
    margin-top: 20px;
    .logo {
      padding-top: 20px;
      padding-bottom: 20px;
      margin: auto;
      max-width: 70px;
    }
    a {
      color: var(--typo);
    }
  }
`
const routers = [
  {
    name: 'Activity Feed',
    link: '/livefeed',
    icon: faWaveSquare,
  },
  {
    name: 'Channels',
    link: '/channels',
    icon: faTv,
  },
  {
    name: 'Online Events',
    link: '/online-events',
    icon: '/img/online-events.svg',
  },
  {
    name: 'Courses',
    link: '/courses',
    icon: '/img/mortarboard.svg',
  },
  {
    name: 'In-Person Events',
    link: '/in-person-events',
    icon: '/img/location-events.svg',
  },
  {
    name: 'Communities',
    link: '/communities-details',
    icon: faUsers,
  },
]

function LeftMenu() {
  const router = useRouter()
  return (
    <div css={navStyle} className="banner-container">
      <ul className="nav flex-column bg-black bd-radius pt-3 px-2">
        {routers.map((route) => (
          <li
            key={route.link}
            className={`nav-item mb-3 ${
              router.route === route.link ? 'active' : ''
            }`}
          >
            <Link href={`${route.link}`}>
              <a className="nav-link d-flex align-items-center">
                <span className="nav-icon d-inline-block mr-3">
                  {(router.route === '/online-events' &&
                    route.link === '/online-events') ||
                  (router.route === '/in-person-events' &&
                    route.link === '/in-person-events') ? (
                    <Icon route={{ icon: '/img/online-pink.svg' }} />
                  ) : (
                    <Icon route={route} />
                  )}
                </span>
                {route.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LeftMenu

const Icon = ({ route }) => {
  if (typeof route.icon === 'object' && route.icon !== null) {
    return <FontAwesomeIcon icon={route.icon} />
  }
  return <img className="custom-icon" src={route.icon} />
}
