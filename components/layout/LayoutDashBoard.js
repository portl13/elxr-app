import React from 'react'
import ProfileButton from '@components/dashboard/ProfileButton'
import { layoutDashBoardStyle } from './LayoutDashBoard.style'
import Meta from './Meta'
import GoLiveButton from '@components/dashboard/GoLiveButton'
import InviteButton from '@components/dashboard/InviteButton'
import SearchButton from '@components/dashboard/SearchButton'
import BellButton from '@components/dashboard/BellButton'
function LayoutDashBoard({ children, sidebar, title = "" }) {
  return (
    <>
      <Meta />
      <div css={layoutDashBoardStyle} className='main_grid'>
        <header className='header z-index-2'>
          <h1 className='title-header'>
          </h1>
          <nav className='d-flex align-items-center'>
            <div className='mr-3'>
            <GoLiveButton/>
            </div>
            <div className='mr-3'>
            <InviteButton/>
            </div>
            <div className='mr-3'>
            <SearchButton/>
            </div>
            <div className='mr-3'>
            <BellButton/>
            </div>
            <div >
            <ProfileButton/>
            </div>
            
            
            
            
          </nav>
        </header>
        <aside
        className='sidebar z-index-3'
        >
            {sidebar}
        </aside>
        <main className='main'>{children}</main>
      </div>
    </>
  )
}

export default LayoutDashBoard
