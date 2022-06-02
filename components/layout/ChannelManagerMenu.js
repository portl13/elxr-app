import React from 'react'
import { css } from '@emotion/core'
import {
  faCog,
  faCreditCard,
  faLaptop,
  faLayerGroup,
  faTv,
  faUserFriends,
  faVideo,
  faWifi,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CHANEL_SUB_NAV, LIVE_SUB_NAV } from '@utils/constant'
import { useRouter } from 'next/router'
import { stringToSlug } from '@lib/stringToSlug'

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
  .sub-section {
    &-icon {
      margin-right: 8px;
      margin-left: 40px;
    }
    svg {
      width: 15px;
      color: var(--typo);
    }
  }
  .tab-section {
    cursor: pointer;
    padding: 10px 0 10px 0;
    &.active,
    &.active svg {
      color: var(--primary-color);
      fill: var(--primary-color);
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
      color: #fff;
    }
  }
  .go-live {
    background-color: #fe025c;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      color: #fff !important;
      width: 14px;
    }
  }
`

function ChannelManagerMenu(props) {

  const { tab, handleRedirect, hide, setHide, innerNav, channel } = props

  const router = useRouter()

  const myChannel = ({vendor_shop_name, vendor_id}) => {
    router.push(`/channel/${stringToSlug(vendor_shop_name)}/${vendor_id}?key=timeline&tab=personal`)
  }

  return (
    <div css={navStyle} className="banner-container">
      <ul className="nav flex-column bg-black bd-radius pt-3 px-2">

        <li
          className={`nav-item mb-3 pointer ${
            (tab === 'order' || tab === 'order-detail') && 'active'
          }`}
          onClick={() => myChannel(channel)}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faTv} />
            </span>
            My Channel
          </span>
        </li>

        <li
          className={`nav-item mb-1 pointer ${
            (tab === 'golive' || tab === 'edit-event') && 'active'
          }`}
          onClick={() => handleRedirect('golive', 'stream')}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon mr-3 go-live">
              <FontAwesomeIcon icon={faVideo} />
            </span>
            Go Live
          </span>
        </li>
        <div className="sub-section">
          {LIVE_SUB_NAV.map((e) => (
            <div
              key={e.value}
              className={`tab-section ${innerNav === e.value && 'active'}`}
              onClick={() => handleRedirect('golive', e.value)}
            >
              <span className="sub-section-icon">
                <FontAwesomeIcon icon={e.icon} />
              </span>
              <span className="sub-section-title">{e.name}</span>
            </div>
          ))}
        </div>
        <li
          className={`nav-item mb-1 mt-2 pointer ${tab === 'home' && 'active'}`}
          onClick={() => handleRedirect('home', 'store')}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faLaptop} />
            </span>
            Channel Settings
          </span>
        </li>
        <div className="sub-section">
          {CHANEL_SUB_NAV.map((e) => (
            <div
              key={e.value}
              className={`tab-section ${innerNav === e.value && 'active'}`}
              onClick={() => handleRedirect('home', e.value)}
            >
              <span className="sub-section-icon">
                <FontAwesomeIcon icon={e.icon} />
              </span>
              <span className="sub-section-title">{e.name}</span>
            </div>
          ))}
        </div>
        <li
          className={`nav-item mb-3  mt-2 pointer ${tab === 'setting' && 'active'}`}
          onClick={() => handleRedirect('setting', 'edit-subscription')}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faCog} />
            </span>
            Subscription Settings
          </span>
        </li>
        <li
          className={`nav-item mb-3 pointer ${
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
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
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
            Product Manager
          </span>
        </li>
        <li
          className={`nav-item mb-3 pointer ${
            (tab === 'subscriber' || tab === 'subscriber-detail') && 'active'
          }`}
          onClick={() => handleRedirect('subscriber', 'all')}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faWifi} />
            </span>
            Subscribers
          </span>
        </li>
        <li
          className={`nav-item mb-3 pointer ${
            (tab === 'order' || tab === 'order-detail') && 'active'
          }`}
          onClick={() => handleRedirect('order', 'all')}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faLayerGroup} />
            </span>
            Orders
          </span>
        </li>
        <li
          className={`nav-item mb-3 pointer ${
            (tab === 'customer' || tab === 'customer-detail') && 'active'
          }`}
          onClick={() => handleRedirect('customer')}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faUserFriends} />
            </span>
            Customers
          </span>
        </li>
        <li
          className={`nav-item mb-3 pointer ${tab === 'payment' && 'active'}`}
          onClick={() => handleRedirect('payment')}
        >
          <span className="nav-link d-flex align-items-center">
            <span className="nav-icon d-inline-block mr-3">
              <FontAwesomeIcon icon={faCreditCard} />
            </span>
            Payments
          </span>
        </li>
      </ul>
    </div>
  )
}

export default ChannelManagerMenu
