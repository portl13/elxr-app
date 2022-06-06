import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faBuffer } from '@fortawesome/free-brands-svg-icons'
import {
  faCalculator,
  faChild,
  faCloudDownloadAlt,
  faWifi,
} from '@fortawesome/free-solid-svg-icons'
import { css } from '@emotion/core'

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

function MyPurchasesMenu(props) {
  const { tab, handleRedirect } = props

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
            My Dashboard
          </span>
        </li>
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
            My Orders
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
            My Subscriptions
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
            My Downloads
          </span>
        </li>
        <li
          onClick={() => handleRedirect('courses')}
          className={`nav-item mb-3 pointer ${tab === 'courses' ? 'active' : ''}`}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faChild} />
            </span>
            My Courses
          </span>
        </li>
      </ul>
    </div>
  )
}
export default MyPurchasesMenu
