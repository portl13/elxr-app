import React from 'react'
import Logo from '@components/layout/Logo'
import { css } from '@emotion/core'

import AuthButtons from '@components/home/AuthButtons'
import MenuHeader from '@components/home/MenuHeader'
import MenuMobile from '@components/home/MenuMobile'

import Menu from './Menu'
import MyAccountMenuMobile from '@pages/my-account/MyAccountMenuMobile'
import MyPortalMenuMobile from '@components/my-portal/MyPortalMenuMobile'
import MyWalletMenuMobile from '@components/my-wallet/MyWalletMenuMobile'

const headerStyle = css`
  .menu-container {
    list-style: none;
    padding-left: 0;
  }
  .menu-item {
    margin-left: 20px;
  }
  .menu-item a {
    color: var(--typo);
  }
  .menu-title {
    font-size: 12px;
  }
  .menu-icon svg {
    height: 18px;
  }
  .profile {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    overflow: hidden;
  }
  .notification-bell,
  .notification-bell svg {
    margin: 0 !important;
  }
  @media (max-width: 1199px) {
    .center-icon {
      display: flex;
      align-items: center;
    }
  }
  .left-header {
    display: flex;
  }
`

function Header(props) {
  const { auth, user, data, menuMobile } = props

  const getMenuMobile = (menu) => {
    const menuMobileProps = {
      ...menu,
      data,
      user,
      auth,
    }
    const menusMobiles = {
      'my-account': <MyAccountMenuMobile {...menuMobileProps} />,
      'channel-manager': <MyPortalMenuMobile {...menuMobileProps} />,
      'my-wallet': <MyWalletMenuMobile {...menuMobileProps} />,
      default: <MenuMobile {...menuMobileProps} />,
    }
    return menusMobiles[menu?.type] || menusMobiles['default']
  }

  return (
    <header css={headerStyle} className="header main-header">
      {getMenuMobile(menuMobile)}
      <div className="left-header">
        <Logo logo="/img/brand/logo.png" alt="weshare" />
        <Menu user={user} />
      </div>
      {auth ? (
        <MenuHeader user={user} data={data} auth={auth} />
      ) : (
        <AuthButtons />
      )}
    </header>
  )
}

export default Header
