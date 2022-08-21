import VideoCard from '@components/creator/cards/VideoCard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getFetchPublic } from '@request/creator'
import React from 'react'
import useSWR from 'swr'

const url = `${process.env.apiV2}/video`

function VideoRelated({ category }) {
  const { data } = useSWR(
    `${url}?category=${category}&page=1&per_page=3`,
    getFetchPublic
  )

  return (
    <aside>
      {!data && <SpinnerLoader />}
      {data &&
        data.videos.map((video) => (
          <div className="mb-4" key={video.id}>
            <VideoCard video={video} />
          </div>
        ))}
    </aside>
  )
}

export default VideoRelated
