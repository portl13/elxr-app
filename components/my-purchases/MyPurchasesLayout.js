import React from 'react'
import MainLayout from '@components/main/MainLayout'
import SidebarMyPucharses from './sidebar/SidebarMyPucharses'
import { myAccountWrapper } from '@components/my-account/MyAccountWrapper.style'

function MyPurchasesLayout({ children }) {
  return (
    <MainLayout sidebar={<SidebarMyPucharses />}>
      <div css={myAccountWrapper}>{children}</div>
    </MainLayout>
  )
}

export default MyPurchasesLayout
