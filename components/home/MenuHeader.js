import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faInbox,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
import ButtonChannelManager from '../layout/ButtonChannelManager'
import { stringToSlug } from '../../lib/stringToSlug'
import NotificationBell from '../layout/NotificationBell'
import ProfileButton from './ProfileButton'
import { useCart } from '../../context/CartContext'
import { css } from '@emotion/core'
import CartIcon from '/public/img/bx-cart.svg'

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
  .custom-icon{
    fill: var(--white-color);
    width: 23px;
    height: 23px !important;
  }
`

const MenuHeader = (props) => {
  const { user, data, auth } = props
  const { countItems } = useCart()
  return (
    <ul css={headerStyle} className="menu-container text-center d-flex justify-content-end">
      <li className="menu-item only-desk">
        <Link href="/channel-manager?tab=home&nav=store">
          <a>
            <span className="menu-icon">
              <FontAwesomeIcon icon={faHome} />
            </span>
            <span className="menu-title">My Portal</span>
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
        <span className="menu-icon d-block m-auto profile">
          {data && <img src={data.avatar_urls.thumb} />}
        </span>
        <span className="menu-title">
          <ProfileButton data={data} user={user} auth={auth} />
        </span>
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
    </ul>
  )
}

export default MenuHeader
