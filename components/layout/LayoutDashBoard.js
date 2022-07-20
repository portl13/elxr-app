import React, { useState } from 'react'
import ProfileButton from '@components/dashboard/ProfileButton'
import { layoutDashBoardStyle } from './LayoutDashBoard.style'
import Meta from './Meta'
import GoLiveButton from '@components/dashboard/GoLiveButton'
import InviteButton from '@components/dashboard/InviteButton'
import SearchButton from '@components/dashboard/SearchButton'
import BellButton from '@components/dashboard/BellButton'
import SideBarMenu from '@components/dashboard/sidebar/SideBarMenu'

function LayoutDashBoard({ children, sidebar, title = '' }) {
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  return (
    <>
      <Meta />
      <div css={layoutDashBoardStyle} className="main_grid position-relative">
        <header className="header z-index-2">
          <nav className="d-flex align-items-center">
            <div className="mr-3">
              <GoLiveButton />
            </div>
            <div className="mr-3">
              <InviteButton />
            </div>
            <div className="mr-3">
              <SearchButton />
            </div>
            <div className="mr-3">
              <BellButton />
            </div>
            <div>
              <ProfileButton
                open={open}
                setOpen={setOpen}
                setProfile={setProfile}
              />
            </div>
          </nav>
        </header>
        <aside className="sidebar z-index-3">{sidebar}</aside>
        <main className="main">{children}</main>
        <SideBarMenu open={open} setOpen={setOpen} profile={profile} />
      </div>
    </>
  )
}

export default LayoutDashBoard
