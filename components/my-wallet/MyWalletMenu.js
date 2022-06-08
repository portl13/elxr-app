import Sidebar from '@components/sidebar/Sidebar'
import SidebarLi from '@components/sidebar/SidebarLi'
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
    value: 'transactions',
    icon: faWallet,
  },
  {
    name: 'Wallet topup',
    value: 'topup',
    icon: faPlusCircle,
  },
  {
    name: 'Wallet transfer',
    value: 'transfer',
    icon: faRandom,
  },
  {
    name: 'Transactions',
    value: 'wallet-transaction',
    icon: faList,
  },
  {
    name: 'Withdrawal',
    value: 'wallet-withdrawl',
    icon: faListAlt,
  },
]

function MyWalletMenu({ handleRedirect, tab }) {
  return (
    <Sidebar>
      {router.map((route) => (
        <SidebarLi
          key={route.value}
          icon={<FontAwesomeIcon icon={route.icon} />}
          text={route.name}
          isActive={tab === route.value}
          onClick={() => handleRedirect(route.value)}
        />
      ))}
    </Sidebar>
  )
}

export default MyWalletMenu
