import React from 'react'
import ChannelBlogs from './ChannelBlogs'
import CreatorEvents from './CreatorEvents'
import CreatorPodcasts from './CreatorPodcasts'
import CreatorVideos from './CreatorVideos'

function TabHome({ channel_id }) {
  return (
    <>
      <CreatorEvents channel_id={channel_id} />
      <CreatorVideos channel_id={channel_id} />
      <CreatorPodcasts channel_id={channel_id} />
      <ChannelBlogs channel_id={channel_id} />
    </>
  )
}

export default TabHome
