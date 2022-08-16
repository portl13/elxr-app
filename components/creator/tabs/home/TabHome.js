import React from 'react'
import CreatorBlogs from './CreatorBlogs'
import CreatorChannels from './CreatorChannels'
import CreatorCommunities from './CreatorCommunities'
import CreatorCourses from './CreatorCourses'
import CreatorEvents from './CreatorEvents'
import CreatorPodcasts from './CreatorPodcasts'
import CreatorVideos from './CreatorVideos'

function TabHome({ creator_id }) {
  return (
    <>
      <CreatorChannels creator_id={creator_id} />
      <CreatorEvents creator_id={creator_id} />
      <CreatorVideos creator_id={creator_id} />
      <CreatorPodcasts creator_id={creator_id} />
      <CreatorCourses creator_id={creator_id} />
      <CreatorCommunities creator_id={creator_id} />
      <CreatorBlogs creator_id={creator_id} />
    </>
  )
}

export default TabHome
