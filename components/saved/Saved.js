import React from 'react'
import useSWR from 'swr'

import { genericFetch } from '@request/creator'
import useSaved from './hook/useSaved'
import BlogsSaved from './sections/BlogsSaved'
import VideosSaved from './sections/VideosSaved'
import PodcastsSaved from './sections/PodcastsSaved'
import EventsSaved from './sections/EventsSaved'

function Saved() {
  const { data: blogIds } = useSaved('blog')
  const { data: blogs } = useSWR(
    blogIds ? `${process.env.apiV2}/blogs?include=${blogIds.join(',')}` : null,
    genericFetch
  )

  const { data: videoIds } = useSaved('video')
  const { data: videos } = useSWR(
    videoIds
      ? `${process.env.apiV2}/video?include=${videoIds.join(',')}`
      : null,
    genericFetch
  )

  const { data: podcastIds } = useSaved('podcast')
  const { data: podcasts } = useSWR(
    podcastIds
      ? `${process.env.apiV2}/podcasts?include=${podcastIds.join(',')}`
      : null,
    genericFetch
  )

  const { data: eventIds } = useSaved('event')
  const { data: events } = useSWR(
    eventIds
      ? `${process.env.apiV2}/channel-event?include=${eventIds.join(',')}`
      : null,
    genericFetch
  )
  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
        <h2 className="title-dashboard">Saved</h2>
      </div>
      <EventsSaved events={events} />
      <BlogsSaved blogs={blogs} />
      <VideosSaved videos={videos} />
      <PodcastsSaved audios={podcasts} />
    </div>
  )
}

export default Saved
