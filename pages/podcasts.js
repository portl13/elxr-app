import MainLayout from '@components/main/MainLayout'
import PagePodcasts from '@components/main/pages/PagePodcasts'
import React from 'react'

function PodcastsPage() {
  return (
    <MainLayout
      title="Podcasts"
    >
      <PagePodcasts />
    </MainLayout>
  )
}

export default PodcastsPage