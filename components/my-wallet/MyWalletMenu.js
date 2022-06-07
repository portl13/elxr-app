import { css } from '@emotion/core'
import { faList, faListAlt, faPlusCircle, faRandom, faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

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

const router = [
  {
    name: 'My Wallet',
    value: 'transactions',
    icon: faWallet
  },
  {
    name: 'Wallet topup',
    value: 'topup',
    icon: faPlusCircle
  },
  {
    name: 'Wallet transfer',
    value: 'transfer',
    icon: faRandom
  },
  {
    name: 'Transactions',
    value: 'wallet-transaction',
    icon: faList
  },
  {
    name: 'Withdrawal',
    value: 'wallet-withdrawl',
    icon: faListAlt
  }
]


function MyWalletMenu({ handleRedirect, tab }) {
  return (
    <div css={navStyle} className="wcfm_menu banner-container">
      <ul className="nav flex-column bg-black bd-radius pt-3 px-1">
        {router.map((route) => (
          <li
            key={route.value}
            onClick={() => handleRedirect(route.value)}
            className={`nav-item mb-3 pointer ${
              tab === route.value ? 'active' : ''
            }`}
          >
            <span className="nav-link d-flex align-items-center">
              <span className="nav-icon d-inline-block mr-3">
                <FontAwesomeIcon icon={route.icon} />
              </span>
              <span className="w-100">{route.name}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MyWalletMenu