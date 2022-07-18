import React from 'react'
import DashBoard from '@components/dashboard/DashBoard'
import Podcasts from '@components/dashboard/podcasts/Podcasts'

function PodcastsPage() {
  return (
    <DashBoard title='Podcasts'>
        <Podcasts />
    </DashBoard>
  )
}

export default PodcastsPage