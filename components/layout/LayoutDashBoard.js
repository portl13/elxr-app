import React from 'react'
import { layoutDashBoardStyle } from './LayoutDashBoard.style'
import Meta from './Meta'
function LayoutDashBoard({ children, sidebar, title = "" }) {
  return (
    <>
      <Meta />
      <div css={layoutDashBoardStyle} className='main_grid'>
        <aside
        className='sidebar'
        >
            {sidebar}
        </aside>
        <header className='header'>
          <h1 className='title-header'>
            {title}
          </h1>
          <nav>

          </nav>
        </header>
        <main className='main'>{children}</main>
      </div>
    </>
  )
}

export default LayoutDashBoard
