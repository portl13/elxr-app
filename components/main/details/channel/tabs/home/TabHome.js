import React from 'react'
import CreatorChannels from './CreatorChannels'
import CreatorEvents from './CreatorEvents'
import CreatorPodcasts from './CreatorPodcasts'
import CreatorVideos from './CreatorVideos'

function TabHome({ channel_id }) {
  return (
    <>
      <CreatorChannels channel_id={channel_id} />
      <CreatorEvents channel_id={channel_id} />
      <CreatorVideos channel_id={channel_id} />
      <CreatorPodcasts channel_id={channel_id} />
    </>
  )
}

export default TabHome
