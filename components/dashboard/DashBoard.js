import React from 'react'
import Head from 'next/head'
import LayoutDashBoard from '@components/layout/LayoutDashBoard'
import SidebarDashboard from './sidebar/SidebarDashboard'

function DashBoard({ children, title }) {
  return (
    <LayoutDashBoard
      title={title}
      sidebar={<SidebarDashboard />}
    >
      <Head>
        <title>WeShare | Dashboard</title>
      </Head>
      <div
        className="main-content-wrapper bg-black bd-radius"
      >
        {children}
      </div>
    </LayoutDashBoard>
  )
}
export default DashBoard
