import React from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import VideoCard from '@components/creator/cards/VideoCard'

function CreatorVideos({ videos, isLoading }) {

  if (videos && videos.videos && videos.videos.length === 0) {
    return ''
  }

  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14 mb-3">VIDEOS</h4>
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
    </div>
  )
}

export default CreatorVideos
