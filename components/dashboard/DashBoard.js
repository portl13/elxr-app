import React, { useContext } from 'react'
import Head from 'next/head'
import LayoutDashBoard from '@components/layout/LayoutDashBoard'
import SidebarDashboard from './sidebar/SidebarDashboard'
import { UserContext } from '@context/UserContext'

function DashBoard({ children, title }) {
  const { user } = useContext(UserContext)
  return (
    <LayoutDashBoard
      title={title}
      sidebar={user ? <SidebarDashboard user={user} /> : null}
    >
      <Head>
        <title>STUDIO</title>
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
