import React, { useState }  from 'react'
import Logo from '@components/layout/Logo'
import { css } from '@emotion/core'

import AuthButtons from '@components/home/AuthButtons'
import MenuHeader from '@components/home/MenuHeader'
import MenuMobile from '@components/home/MenuMobile'

import Menu from './Menu'

import MyPortalMenuMobile from '@components/my-portal/MyPortalMenuMobile'
import MyWalletMenuMobile from '@components/my-wallet/MyWalletMenuMobile'
import MySettingsMenuMobile from '@components/my-settings/MySettingsMenuMobile'
import MyPurchasesMenuMobile from '@components/my-purchases/MyPurchasesMenuMobile'

import SideBarMenu from '@components/dashboard/sidebar/SideBarMenu'
import useSWRImmutable from 'swr/immutable'
import { getProfile } from '@request/dashboard'
const profileUrl = process.env.bossApi + '/members'

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
  const token = user?.token
  const [open, setOpen] = useState(false)
  const getMenuMobile = (menu) => {
    const menuMobileProps = {
      ...menu,
      data,
      user,
      auth,
    }
    const menusMobiles = {
      'my-portal': <MyPortalMenuMobile {...menuMobileProps} />,
      'my-wallet': <MyWalletMenuMobile {...menuMobileProps} />,
      'my-settings': <MySettingsMenuMobile {...menuMobileProps} />,
      'my-purchases': <MyPurchasesMenuMobile {...menuMobileProps} />,
      default: <MenuMobile {...menuMobileProps} />,
    }
    return menusMobiles[menu?.type] || menusMobiles['default']
  }

  const { data: userData } = useSWRImmutable(
    token ? [`${profileUrl}/${user?.id}`, token] : null,
    getProfile
  )

  return (
    <>    
      <header css={headerStyle} className="header main-header">
        <div className="left-header">
          <Logo logo="/img/brand/logo.png" alt="weshare" />
          {/* <Menu user={user} /> */}
        </div>
        {auth ? (
          <MenuHeader open={open} setOpen={setOpen} user={user} data={data} auth={auth} />
        ) : (
          <AuthButtons />
        )}
      </header>
      <SideBarMenu profile={userData} open={open} setOpen={setOpen}  />
    </>
  )
}

export default Header
