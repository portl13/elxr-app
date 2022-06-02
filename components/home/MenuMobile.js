import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faBell,
  faCog,
  faInbox,
  faSignInAlt,
  faTimes,
  faTv,
  faUserFriends,
  faUsers,
  faWallet,
} from '@fortawesome/free-solid-svg-icons'
import { css } from '@emotion/core'
import { useRouter } from 'next/router'
import { stringToSlug } from '../../lib/stringToSlug'
import { UserContext } from '../../context/UserContext'
import  Link  from 'next/link'
import { getProfileRoute } from '../../utils/constant'
import CartICon from '/public/img/bx-cart.svg'
import MortarBoard from '/public/img/mortarboard.svg'

export const menuMobileStyle = css`
  display: flex;
  @media screen and (min-width: 1200px) {
    display: none;
  }
  .button-mobile {
    width: 20px;
  }
  .menu-mobile-overlay {
    background-color: rgba(100, 100, 100, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    opacity: 0;
    transform: translateX(-100%);
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  .menu-mobile-overlay.open {
    transform: translateX(0);
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    opacity: 1;
  }
  .menu-mobile {
    list-style: none;
    padding: 15px 20px;
  }
  .menu-mobile-container {
    background-color: var(--dark-color);
    max-width: 75%;
    min-height: 100vh;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    background-color: var(--dark);
  }
  .card-profile {
    padding-bottom: 15px;
  }
  .content-profile-title {
    font-size: 16px;
    margin: 0;
  }
  .close-profile {
    width: 20px;
  }
  .hr-profile {
    border: 1px solid #343434;
    width: 100%;
    margin: 0;
  }
  .item-profile {
    display: flex;
    padding: 10px 0;
    &.active h5, &.active svg{
      fill: var(--primary-color);
      color: var(--primary-color);
    }
  }
  .profile-icon {
    width: 20px;
    height: 20px;
    margin-right: 15px;
  }
  .profile-title-card {
    font-size: 16px;
    margin: 0;
  }
  .button-card-profile{
    border-radius: 20px;
  }
`

const routes = [
  {
    type: 'router',
    icon: <FontAwesomeIcon icon={faWallet} /> ,
    name: 'My Account',
    route: '/my-account?tab=dashboard',
    key: 2,
  },
  {
    type: 'router',
    icon: <CartICon />,
    name: 'Shopping Cart',
    route: '/cart',
    key: 3,
  },
  {
    type: 'router',
    icon: <FontAwesomeIcon icon={faCog} /> ,
    name: 'Settings',
    route: '/account-setting?tab=general',
    key: 4,
  },
  {
    type: 'separator',
    key: 5,
  },
  {
    type: 'router',
    icon: <FontAwesomeIcon icon={faInbox} /> ,
    name: 'Messages',
    route: '/messages/compose/',
    key: 6,
  },
  {
    type: 'router',
    icon: <FontAwesomeIcon icon={faBell} /> ,
    name: 'Notifications',
    route: '/notifications',
    key: 7,
  },
  {
    type: 'router',
    icon: <FontAwesomeIcon icon={faUserFriends} /> ,
    name: 'Connections',
    route: '/members',
    key: 8,
  },
  {
    type: 'separator',
    key: 9,
  },
  {
    type: 'router',
    icon: <FontAwesomeIcon icon={faTv} /> ,
    name: 'My Channels',
    route: '/channels',
    key: 10,
  },
  {
    type: 'router',
    icon: <MortarBoard />,
    name: 'My Courses',
    route: '/courses',
    key: 12,
  },
  {
    type: 'router',
    icon: <FontAwesomeIcon icon={faUsers} />,
    name: 'My Communities',
    route: '/communities-details',
    key: 13,
  },
  {
    type: 'separator',
    key: 14,
  },
]

const Icon = ({ route }) => {
  if (typeof route.icon === 'object' && route.icon !== null) {
    return <FontAwesomeIcon icon={route.icon} />
  }
  return <img className="custom-icon" src={route.icon} />
}

function MenuMobile(props) {
  const router = useRouter()
  const { setUser } = useContext(UserContext)
  const { user, auth, data } = props

  const [open, setOpen] = useState(false)

  const closeOverlay = (e) => {
    if (e.target.classList.contains('menu-mobile-overlay')) {
      setOpen(!open)
    }
  }

  const handlerRedirect = (route) => {
    if (route.route === '/messages/compose/') {
      router.push(`/messages/compose/${stringToSlug(user?.name)}/${user?.id}`)
      setOpen(!open)
      return
    }
    router.push(route.route)
    setOpen(!open)
  }

  const logout = () => {
    router.push('/')
    setUser(null)
  }

  const goToProfile = () => {
    setOpen(!open)
    router.push(user ? getProfileRoute(user.name, user.id, "profile", "") : "")
  }

  return (
    <>
      <div
        className="align-items-center button-mobile-container"
        css={menuMobileStyle}
      >
        <div className="button-mobile" onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div
          onClick={closeOverlay}
          className={`menu-mobile-overlay ${open ? 'open' : ''}`}
        >
          <div className="menu-mobile-container">
            <ul className="menu-mobile">
              {auth ? (
                <li className="d-flex justify-content-between card-profile">
                  <div className="avatar">
                    <img
                      src={data?.avatar_urls.thumb}
                      alt={data?.profile_name}
                    />
                  </div>
                  <div className="content-profile">
                    <h5 className="content-profile-title">
                      {data?.profile_name}
                    </h5>
                    <span
                      onClick={() => goToProfile()}
                      className="text-primary"
                    >
                      View Profile
                    </span>
                  </div>
                  <div className="close-profile d-flex">
                    <FontAwesomeIcon
                      onClick={() => setOpen(!open)}
                      icon={faTimes}
                    />
                  </div>
                </li>
              ) : (
                <li className="d-flex justify-content-end card-profile">
                  <div className="close-profile d-flex">
                    <FontAwesomeIcon
                      onClick={() => setOpen(!open)}
                      icon={faTimes}
                    />
                  </div>
                </li>
              )}

              {auth && user?.roles.includes('wcfm_vendor') && (
                <li
                  onClick={() => handlerRedirect({route:'/channel-manager?tab=golive&nav=events'})}
                  className="item-profile"
                  key={'9485893'}
                >
                  <span className="profile-icon">
                    <Icon route={{ icon: faTv }} />
                  </span>
                  <h5 className="profile-title-card">Channel Manager</h5>
                </li>
              )}
              {auth &&
                routes.map((route) => (
                  <li
                    onClick={() => handlerRedirect(route)}
                    className="item-profile"
                    key={route.key}
                  >
                    {route.type === 'header' && (
                      <>
                        <span className="profile-icon">
                        {route.icon}
                        </span>
                        <h5 className="profile-title-card">{route.name}</h5>
                      </>
                    )}
                    {route.type === 'router' && (
                      <>
                        <span className="profile-icon">
                          {route.icon}
                        </span>
                        <h5 className="profile-title-card">{route.name}</h5>
                      </>
                    )}
                    {route.type === 'separator' && (
                      <hr className="hr-profile" />
                    )}
                  </li>
                ))}
              {auth && (
                <li onClick={logout} className="item-profile">
                  <span className="profile-icon">
                    <FontAwesomeIcon icon={faSignInAlt} />
                  </span>
                  <h5 className="profile-title-card">Sign Out</h5>
                </li>
              )}

              {!auth && (
                <>
                  <li className="item-profile mt-5 mb-3">
                    <Link href="/login">
                      <a className="btn btn-primary button-card-profile w-100">
                        Sign In
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup">
                      <a className="btn btn-secundary button-card-profile w-100">
                        Sign Up
                      </a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default MenuMobile
