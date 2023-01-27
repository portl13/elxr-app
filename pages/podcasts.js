import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
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