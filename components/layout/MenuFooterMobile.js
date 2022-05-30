import React from 'react'
import { faHome, faTv, faUsers, faWaveSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import  Link  from 'next/link'
import { css } from '@emotion/core'

const mobileFooterStyle = css`
  background-color: var(--dark-color);
  position: fixed;
  bottom: 0;
  list-style: none;
  padding-left: 0;
  display: flex;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 15px;
  margin-bottom: 0;
  min-height: 65px;
  z-index: 999;
  @media (min-width: 1200px) {
      display: none;
  } 
  .nav-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 40px;
  }
  .nav-icon {
    min-height: 20px;
    width: 20px;
    svg,
    .custom-icon {
      width: 20px;
      color: var(--typo);
    }
  }
  .nav-link {
    color: var(--typo);
    font-size: 10px;
  }
  .nav-item.active .nav-link,
  .nav-item.active .nav-icon svg,
  .nav-item.active .st0 {
    color: var(--primary-color);
    fill: var(--primary-color);
  }
  .nav-item {
    width: calc(100% / 5);
  }
`

const routers = [
  {
    name: 'Feed',
    link: '/livefeed',
    icon: faWaveSquare,
  },
  {
    name: 'Channels',
    link: '/channels',
    icon: faTv,
  },
  {
    name: 'Events',
    link: '/online-events',
    icon: '/img/icons/events.png',
  },
  {
    name: 'Courses',
    link: '/courses',
    icon: '/img/mortarboard.svg',
  },
  {
    name: 'Community',
    link: '/communities-details',
    icon: faUsers,
  },
]

const Icon = ({ route }) => {
  if (typeof route.icon === 'object' && route.icon !== null) {
    return <FontAwesomeIcon icon={route.icon} />
  }
  return <img className="custom-icon" src={route.icon} />
}

function MenuFooterMobile() {
  const router = useRouter()

  return (
    <ul className='menu-footer' css={mobileFooterStyle}>
      {routers.map((route) => (
        <li
          key={route.link}
          className={`nav-item ${router.route === route.link ? 'active' : ''}`}
        >
          <Link href={`${route.link}`}>
            <a className="nav-link">
              <div className="nav-icon">
                {router.route === '/online-events' &&
                route.link === '/online-events' ? (
                  <Icon route={{ icon: '/img/online-pink.svg' }} />
                ) : (
                  <Icon route={route} />
                )}
              </div>
              <div>{route.name}</div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default MenuFooterMobile
