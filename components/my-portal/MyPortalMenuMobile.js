import {
  faBars,
  faSignInAlt,
  faTimes,
  faCog,
  faCreditCard,
  faLaptop,
  faLayerGroup,
  faUserFriends,
  faVideo,
  faWifi,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { menuMobileStyle } from '@components/home/MenuMobile'
import { UserContext } from '@context/UserContext'

function MyPortalMenuMobile(props) {
  const router = useRouter()
  const { setUser } = useContext(UserContext)
  const { tab, hide, setHide, auth, data, setTab,setInnerNav } = props

  const [open, setOpen] = useState(false)

  const logout = () => {
    router.push('/')
    setUser(null)
  }

  const handleRedirect = (e, id, value) => {
    id === 'edit-event' &&
      router.push(`/channel-manager?tab=${e}&nav=${id}&id=${value}`)
    const param =
      id && e !== 'editproduct' && 'order-detail' ? `&nav=${id}` : ''
    e === 'editproduct'
      ? router.push(`/channel-manager?tab=${e}&id=${id}`)
      : router.push(`/channel-manager?tab=${e}${param}`)
    e === 'order-detail'
      ? router.push(`/channel-manager?tab=${e}&orders=${id}`)
      : router.push(`/channel-manager?tab=${e}${param}`)
    setTab(e)
    if (id && e !== 'editproduct') setInnerNav(id)
    setOpen(false)
  }

  const closeOverlay = (e) => {
    if (e.target.classList.contains('menu-mobile-overlay')) {
      setOpen(!open)
    }
  }

  return (
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
                  <img src={data?.avatar_urls.thumb} alt={data?.profile_name} />
                </div>
                <div className="content-profile">
                  <h5 className="content-profile-title">
                    {data?.profile_name}
                  </h5>
                  <span onClick={() => goToProfile()} className="text-primary">
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
            <li
              className={`item-profile ${
                (tab === 'golive' || tab === 'edit-event') && 'active'
              }`}
              onClick={() => handleRedirect('golive', 'stream')}
            >
              <span className="profile-icon go-live">
                <FontAwesomeIcon icon={faVideo} />
              </span>
              <h5 className="profile-title-card">Go Live</h5>
            </li>
            <li
              className={`item-profile ${tab === 'home' && 'active'}`}
              onClick={() => handleRedirect('home', 'store')}
            >
              <span className="profile-icon">
                <FontAwesomeIcon icon={faLaptop} />
              </span>
              <h5 className="profile-title-card">Channel Settings</h5>
            </li>
            <li
              className={`item-profile ${tab === 'setting' && 'active'}`}
              onClick={() => handleRedirect('setting', 'edit-subscription')}
            >
              <span className="profile-icon">
                <FontAwesomeIcon icon={faCog} />
              </span>
              <h5 className="profile-title-card">Subscription Settings</h5>
            </li>
            <li
              className={`item-profile ${
                !hide &&
                (tab === 'product' ||
                  tab === 'addproduct' ||
                  tab === 'editproduct') &&
                'active'
              }`}
              onClick={() => {
                handleRedirect('product', 'any')
                setHide(false)
              }}
            >
              <span className="profile-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  width="24"
                  role="img"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z" />
                  <circle cx="10.5" cy="19.5" r="1.5" />
                  <circle cx="17.5" cy="19.5" r="1.5" />
                </svg>
              </span>
              <h5 className="profile-title-card">Product Manager</h5>
            </li>
            <li
              className={`item-profile ${
                (tab === 'subscriber' || tab === 'subscriber-detail') &&
                'active'
              }`}
              onClick={() => handleRedirect('subscriber', 'all')}
            >
              <span className="profile-icon">
                <FontAwesomeIcon icon={faWifi} />
              </span>
              <h5 className="profile-title-card">Subscribers</h5>
            </li>
            <li
              className={`item-profile ${
                (tab === 'order' || tab === 'order-detail') && 'active'
              }`}
              onClick={() => handleRedirect('order', 'all')}
            >
              <span className="profile-icon">
                <FontAwesomeIcon icon={faLayerGroup} />
              </span>
              <h5 className="profile-title-card">Orders</h5>
            </li>
            <li
              className={`item-profile ${
                (tab === 'customer' || tab === 'customer-detail') && 'active'
              }`}
              onClick={() => handleRedirect('customer')}
            >
              <span className="profile-icon">
                <FontAwesomeIcon icon={faUserFriends} />
              </span>
              <h5 className="profile-title-card">Customers</h5>
            </li>
            <li
              className={`item-profile ${tab === 'payment' && 'active'}`}
              onClick={() => handleRedirect('payment')}
            >
              <span className="profile-icon">
                <FontAwesomeIcon icon={faCreditCard} />
              </span>
              <h5 className="profile-title-card">Payments</h5>
            </li>
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
  )
}

export default MyPortalMenuMobile
