import React, {useState, useEffect, useContext} from 'react'
import { useCart } from '@context/CartContext'
import { css } from '@emotion/core'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBell, faInbox, faPowerOff, faWaveSquare} from '@fortawesome/free-solid-svg-icons'
import { stringToSlug } from '@lib/stringToSlug'
import Notification from '../layout/Notification'
import CartIcon from '/public/img/bx-cart.svg'
import DashboardIcon from '@icons/DashboardIcon'
import ActivityIcon from '@icons/ActivityIcon'
import CreateButton from './CreateButton'
import {UserContext} from "@context/UserContext";
import {useRouter} from "next/router";

//import ActivityIcon from '/public/img/icons/right-header/activity.png'

const headerStyle = css`
  margin-bottom: 0;
  .only-desk {
    display: none;
  }
  .menu-title {
    display: none;
  }
  @media (min-width: 1200px) {
    .only-desk {
      display: block;
    }
    .menu-title {
      display: block;
    }
  }
  .custom-icon {
    fill: var(--white-color);
    width: 23px;
    height: 23px !important;
  }
  .profile-button-avatar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .menu-title.show {
    display: block !important;
  }
`

const MenuHeader = (props) => {
  const { user, data, auth, open, setOpen } = props
  const router = useRouter()
  const [isVendor, setIsVendor] = useState(false)
  const { setUser } = useContext(UserContext)

  const { countItems } = useCart()

  useEffect(() => {
    if (user && user?.roles.includes('wcfm_vendor')) {
      setIsVendor(true)
    }
  }, [user])


  const logout = () => {
    setUser(null)
    router.push('/')
  }
  

  return (
    <ul
      css={headerStyle}
      className="menu-container text-center d-flex justify-content-end"
    >
      {/* {user && user?.roles.includes('wcfm_vendor') && (
        <li className="menu-item center-icon mr-0 mr-md-3">
          <CreateButton />
        </li>
      )}
      <li className="menu-item center-icon d-none d-md-block">
        <Link href={'/livefeed'}>
          <a>
            <span className="menu-icon">
              <ActivityIcon className="custom-icon" />
            </span>
            <span className="menu-title">Activity Feed</span>
          </a>
        </Link>
      </li>
      {user && (
        <li className="menu-item center-icon">
          <Link
            href={`/messages/compose/${stringToSlug(user?.name)}/${user?.id}`}
          >
            <a>
              <span className="menu-icon">
                <FontAwesomeIcon icon={faInbox} />
              </span>
              <span className="menu-title">Inbox</span>
            </a>
          </Link>
        </li>
      )}
      <li className="menu-item center-icon">
        <NotificationBell user={user} />
        <span className="menu-title">Notifications</span>
      </li>
      <li className="menu-item center-icon">
        <span className="menu-icon d-block m-auto profile position-relative">
          <span
            onClick={() => setOpen(!open)}
            className="profile-button-avatar"
          ></span>
          {data && <img src={data.avatar_urls.thumb} />}
        </span>
        <span className="menu-title">Me</span>
      </li>
      <li className="menu-item only-desk">
        <Link href={`/cart`}>
          <a>
            <span
              css={{
                position: 'relative',
                '& .cart-items': {
                  position: 'absolute',
                  top: '-5px',
                  right: '-10px',
                  minWidth: '17px',
                  height: '17px',
                  background: 'var(--primary-color)',
                  color: 'var(--white-color)',
                  fontSize: '12px',
                  borderRadius: '10px',
                },
              }}
              className="menu-icon"
            >
              {countItems > 0 && (
                <span className="cart-items">{countItems}</span>
              )}
              <CartIcon className="custom-icon" />
            </span>
            <span className="menu-title">Cart</span>
          </a>
        </Link>
      </li>
      {user && user.roles && user?.roles?.includes('wcfm_vendor') && (
        <li className="menu-item center-icon">
          <Link href={'/dashboard/creator'}>
            <a>
              <span className="menu-icon">
                <DashboardIcon className="custom-icon text-primary" />
              </span>
              <span className="menu-title text-primary">Studio</span>
            </a>
          </Link>
        </li>
      )} */}
      <li className='ml-3'>
        <Link href="/livefeed">
          <a className='btn-icon-header'>
            <img src='/img/icons/right-header/activity.png'  className="text-icon-header-icon text-icon-header center-absolute" />
          </a>
        </Link>
      </li>
      <li className='ml-3'>
        <Link 
          href={`/messages/compose/${stringToSlug(user?.name)}/${user?.id}`}
        >
          <a className='btn-icon-header'>
            <img src='/img/icons/right-header/inbox.png' className="text-icon-header-icon text-icon-header center-absolute" />
          </a>
        </Link>
      </li>
      <li className='ml-3'>
        <Link href="/dashboard/creator">
          <Notification user={user} />
        </Link>
      </li>
      <li className='ml-3'>
        <Link href="/dashboard/creator">
          <a className='btn-icon-header'>
            <DashboardIcon className="text-icon-header-icon text-icon-header center-absolute" />
          </a>
        </Link>
      </li>
      <li className='ml-3'>
          <button onClick={logout} className='btn-icon-header'>
            <FontAwesomeIcon icon={faPowerOff} className="text-icon-header-icon text-icon-header center-absolute" />
          </button>
      </li>
    </ul>
  )
}

export default MenuHeader
