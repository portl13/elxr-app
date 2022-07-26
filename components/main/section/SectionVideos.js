import VideoCard from '@components/creator/cards/VideoCard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getFetchPublic } from '@request/creator'
import Link from 'next/link'

import React from 'react'
import useSWR from 'swr'

const videoUrl = `${process.env.apiV2}/video?all=true`

function SectionVideos() {
  const { data: videos, error } = useSWR(
    `${videoUrl}&page=1&per_page=4`,
    getFetchPublic
  )

  const isLoading = !videos && !error

  return (
    <div className="row mt-4">
      <div className="col-12 d-flex justify-content-between mb-2">
        <h4 className="font-size-14">VIDEOS</h4>
        <Link href={'/videos'}>
          <a className="font-size-14 text-white">See all</a>
        </Link>
      </div>
      {isLoading && <SpinnerLoader />}
      {videos &&
        videos.videos &&
        videos.videos.length > 0 &&
        videos.videos.map((video) => (
          <div key={video.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <VideoCard video={video} />
          </div>
        ))}
      {videos && videos.videos && videos.videos.length === 0 && (
        <h3 className="col display-4">You have not created any videos yet</h3>
      )}
    </div>
  )
}

export default SectionVideos
