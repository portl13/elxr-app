import React from 'react'
import MainLayout from '@components/main/MainLayout'
import SidebarSettings from '../sidebar/SidebarSettings'
import { myAccountWrapper } from '@components/my-account/MyAccountWrapper.style'
import { MySettingsStyle } from '../MySettingsStyle'

function MySettingsLayout({ children }) {
  return (
      <MainLayout sidebar={<SidebarSettings />}>
        <div css={myAccountWrapper}>
          <div css={MySettingsStyle}>
              {children}</div>
        </div>
      </MainLayout>
  )
}

export default MySettingsLayout
