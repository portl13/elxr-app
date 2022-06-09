import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { menuMobileStyle } from '@components/home/MenuMobile'
import {
  faBars,
  faSignInAlt,
  faTimes,
  faCalculator,
  faChild,
  faCloudDownloadAlt,
  faCreditCard,
  faWallet,
  faLocationArrow,
  faCog,
  faChalkboard,
} from '@fortawesome/free-solid-svg-icons'
import { faBuffer } from '@fortawesome/free-brands-svg-icons'
import { useRouter } from 'next/router'
import { UserContext } from '@context/UserContext'
import Link from 'next/link'

const routes = [
  {
    type: 'router',
    icon: faCalculator,
    name: 'My Dashboard',
    route: 'dashboard',
    key: 1,
  },
  {
    type: 'router',
    icon: faBuffer,
    name: 'My Orders',
    route: 'orders',
    key: 2,
  },
  {
    type: 'router',
    icon: faCloudDownloadAlt,
    name: 'My Downloads',
    route: 'downloads',
    key: 3,
  },
  {
    type: 'router',
    icon: faLocationArrow,
    name: 'Addresses',
    route: 'address',
    key: 4,
  },
  {
    type: 'router',
    icon: faCreditCard,
    name: 'Payment methods',
    route: 'payment-method',
    key: 5,
  },
  {
    type: 'router',
    icon: faWallet,
    name: 'My Wallet',
    route: 'my-wallet',
    key: 6,
  },
  {
    type: 'router',
    icon: faChild,
    name: 'Followings',
    route: 'followings',
    key: 7,
  },
  {
    type: 'router',
    icon: faCog,
    name: 'Account Details',
    route: 'account-details',
    key: 8,
  },
]

function MyAccountMenuMobile(props) {
  const router = useRouter()
  const { setUser } = useContext(UserContext)
  const { auth, data, tab, status } = props

  const handleRedirect = (e, id) => {
    if (e === '/my-portal?tab=home&nav=store' && status) {
      router.push('/my-portal?tab=home&nav=store')
      setOpen(false)
      return
    }
    e === 'my-walle' && router.push(`/my-account?tab=${e}&nav=transactions`)

    e === 'orders-view'
      ? router.push(`/my-account?tab=${e}&nav=${id}`)
      : router.push(`/my-account?tab=${e}`)

    // router.push(`/my-account?tab=${e}`);
    setOpen(false)
  }

  const [open, setOpen] = useState(false)

  const logout = () => {
    router.push('/')
    setUser(null)
  }

  const closeOverlay = (e) => {
    if (e.target.classList.contains('menu-mobile-overlay')) {
      setOpen(!open)
    }
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
              {auth &&
                routes.map((route) => (
                  <li key={route.route}>
                    {route.route === '/my-portal?tab=home&nav=store' &&
                    status ? (
                      <span
                        onClick={() => handleRedirect(route.route)}
                        className={`item-profile ${
                          route.route === tab ? 'active' : ''
                        }`}
                        key={route.key}
                      >
                        {route.type === 'router' && (
                          <>
                            <span className="profile-icon">
                              <FontAwesomeIcon icon={route.icon} />
                            </span>
                            <h5 className="profile-title-card">{route.name}</h5>
                          </>
                        )}
                        {route.type === 'separator' && (
                          <hr className="hr-profile" />
                        )}
                      </span>
                    ) : (
                      <span
                        onClick={() => handleRedirect(route.route)}
                        className={`item-profile ${
                          route.route === tab ? 'active' : ''
                        }`}
                        key={route.key}
                      >
                        {route.type === 'router' && (
                          <>
                            <span className="profile-icon">
                              <FontAwesomeIcon icon={route.icon} />
                            </span>
                            <h5 className="profile-title-card">{route.name}</h5>
                          </>
                        )}
                        {route.type === 'separator' && (
                          <hr className="hr-profile" />
                        )}
                      </span>
                    )}
                  </li>
                ))}

              {auth && (
                <>
                  <hr className="hr-profile" />
                  <li onClick={logout} className="item-profile">
                    <span className="profile-icon">
                      <FontAwesomeIcon icon={faSignInAlt} />
                    </span>
                    <h5 className="profile-title-card">Sign Out</h5>
                  </li>
                </>
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

export default MyAccountMenuMobile
