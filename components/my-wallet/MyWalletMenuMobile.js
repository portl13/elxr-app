import MenuMobileBase from '@components/menu/MenuMobileBase'
import {
  faList,
  faListAlt,
  faPlusCircle,
  faRandom,
  faWallet,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const router = [
  {
    name: 'My Wallet',
    route: 'transactions',
    icon: faWallet,
  },
  {
    name: 'Wallet topup',
    route: 'topup',
    icon: faPlusCircle,
  },
  {
    name: 'Wallet transfer',
    route: 'transfer',
    icon: faRandom,
  },
  {
    name: 'Transactions',
    route: 'wallet-transaction',
    icon: faList,
  },
  {
    name: 'Withdrawal',
    route: 'wallet-withdrawl',
    icon: faListAlt,
  },
]

function MyWalletMenuMobile(props) {
  const { tab, handleRedirect } = props


  return (
    <MenuMobileBase {...props}>
      {router.map((route) => (
        <li onClick={() => handleRedirect(route.route)} key={route.route}>
          <span
            className={`item-profile ${route.route === tab ? 'active' : ''}`}
          >
            <span className="profile-icon">
              <FontAwesomeIcon icon={route.icon} />
            </span>
            <h5 className="profile-title-card">{route.name}</h5>
          </span>
        </li>
      ))}
    </MenuMobileBase>
  )
}

export default MyWalletMenuMobile
