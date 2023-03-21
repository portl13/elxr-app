import MainLayout from '@components/main/MainLayout'
import PageVideos from '@components/main/pages/PageVideos'
import React from 'react'

function VideoPage() {
  return (
    <MainLayout title={"videos"}>
      <PageVideos/>
    </MainLayout>
  )
}

export default VideoPage