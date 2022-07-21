import React from 'react'
import SectionBlogs from './section/SectionBlogs'
import SectionChannels from './section/SectionChannels'
import SectionCommunities from './section/SectionCommunities'
import SectionCourses from './section/SectionCourses'
import SectionEvents from './section/SectionEvents'
import SectionHeader from './section/SectionHeader'
import SectionPodcasts from './section/SectionPodcasts'
import SectionVideos from './section/SectionVideos'

function MainHome() {
  return (
    <>
      <SectionHeader/>
      <SectionChannels/>
      <SectionEvents />
      <SectionVideos/>
      <SectionPodcasts/>
      <SectionCourses/>
      <SectionBlogs/>
      <SectionCommunities/>
    </>
  )
}

export default MainHome