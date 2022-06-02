import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faBuffer } from '@fortawesome/free-brands-svg-icons'
import {
  faCalculator,
  faChild,
  faCloudDownloadAlt,
  faCreditCard,
  faPowerOff,
  faWallet,
  faWifi,
  faLocationArrow,
  faCog,
  faTv,
} from '@fortawesome/free-solid-svg-icons'
import { css } from '@emotion/core'
import Link from 'next/link'
import { Router } from 'next/router'

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

function MyAccountMenu(props) {
  const { tab, handleRedirect, setUser, status, user } = props

  const [isVendor, setIsVendor] = useState(null)

  useEffect(() => {
    if (!user) return;
    if (user?.roles.includes('wcfm_vendor')) {
      setIsVendor(true)
    }
  }, [user])
  

  const signOut = () => {
    try {
      Router.push('/')
      setUser(null)
    } catch (error) {}
  }

  return (
    <div css={navStyle} className="wcfm_menu banner-container">
      <ul className="nav flex-column bg-black bd-radius pt-3 px-2">
        <li
          onClick={() => handleRedirect('dashboard')}
          className={`nav-item mb-3 pointer ${tab === 'dashboard' ? 'active' : ''}`}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faCalculator} />
            </span>
            Dashboard
          </span>
        </li>
        {isVendor && (<li
          onClick={() => Router.push("/channel-manager?tab=home&nav=store")}
          className="nav-item mb-3 pointer"
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faTv} />
            </span>
            Channel Manager
          </span>
        </li>)}

        {/* {user?.roles.includes('wcfm_vendor') && (
          <li 
          onClick={() => Router.push("/channel-manager?tab=home&nav=store")}
          className="nav-item mb-3 pointer">
              <span className="nav-link d-flex align-items-center">
                <span className="nav-icon d-inline-block mr-3">
                  <FontAwesomeIcon icon={faChalkboard} />
                </span>
                Channel Manager
              </span>
          </li>
        )} */}

        <li
          onClick={() => handleRedirect('orders')}
          className={`nav-item mb-3 pointer ${
            (tab === 'orders' || tab === 'orders-view') ? 'active' : ''
          }`}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faBuffer} />
            </span>
            Orders
          </span>
        </li>

        <li
          onClick={() => handleRedirect('subscriptions')}
          className={`nav-item mb-3 pointer ${tab === 'subscriptions' ? 'active' : ''}`}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faWifi} />
            </span>
            Subscriptions
          </span>
        </li>
        <li
          onClick={() => handleRedirect('downloads')}
          className={`nav-item mb-3 pointer ${tab === 'downloads' ? 'active' : ''}`}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faCloudDownloadAlt} />
            </span>
            Downloads
          </span>
        </li>
        <li
          onClick={() => handleRedirect('address')}
          className={`nav-item mb-3 pointer  ${
            (tab === 'address' || tab === 'edit-address') ? 'active' : ''
          }`}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faLocationArrow} />
            </span>
            Addresses
          </span>
        </li>
        <li
          onClick={() => handleRedirect('payment-method')}
          className={`nav-item mb-3 pointer ${tab === 'payment-method' ? 'active' : ''}`}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faCreditCard} />
            </span>
            Payment methods
          </span>
        </li>
        <li
          onClick={() => handleRedirect('my-wallet')}
          className={`nav-item mb-3 pointer ${tab === 'my-wallet' ? 'active' : ''}`}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faWallet} />
            </span>
            My Wallet
          </span>
        </li>
        <li
          onClick={() => handleRedirect('followings')}
          className={`nav-item mb-3 pointer ${tab === 'followings' ? 'active' : ''}`}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faChild} />
            </span>
            Followings
          </span>
        </li>
        <li
          onClick={() => handleRedirect('account-details')}
          className={`nav-item mb-3 pointer ${tab === 'account-details' ? 'active' : ''}`}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faCog} />
            </span>
            Account Details
          </span>
        </li>
        <li className='nav-item mb-3 pointer' onClick={() => signOut()}>
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
            <FontAwesomeIcon icon={faPowerOff} />
            </span>
            Logout
          </span>
        </li>
      </ul>
    </div>
  )
}
export default MyAccountMenu
