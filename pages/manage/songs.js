import React from 'react'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import BackButton from '@components/shared/button/BackButton'
import ManageSongs from '@components/manage/section/ManageSongs'

function SongsPage() {
  return (
    <MainLayout title="Songs" sidebar={<MainSidebar />}>
      <BackButton />
      <ManageSongs />
    </MainLayout>
  )
}

export default SongsPage
