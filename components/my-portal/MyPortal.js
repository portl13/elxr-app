import React from 'react'
import Head from 'next/head'
import LayoutDashBoard from '@components/layout/LayoutDashBoard'
import SidebarMyPortal from './sidebar/SidebarMyPortal'
import { mainContentWrapperStyle } from '@components/my-portal/MainContentWrapper.style'

function MyPotal({ children }) {
  return (
    <LayoutDashBoard
      sidebar={<SidebarMyPortal />}
    >
      <Head>
        <title>WeShare | My Portal</title>
      </Head>
      <div
        css={mainContentWrapperStyle}
        className="main-content-wrapper bg-black bd-radius"
      >
        {children}
      </div>
    </LayoutDashBoard>
  )
}
export default MyPotal
