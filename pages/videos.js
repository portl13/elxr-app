import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import PageVideos from '@components/main/pages/PageVideos'
import React from 'react'

function VideoPage() {
  return (
    <MainLayout sidebar={<MainSidebar />}>
      <PageVideos/>
    </MainLayout>
  )
}

export default VideoPage