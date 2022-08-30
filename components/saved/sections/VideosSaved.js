import React from 'react'
import VideoCard from '@components/creator/cards/VideoCard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'

function VideosSaved({ videos }) {
  if (videos && videos.videos && videos.videos.length === 0) {
    return ''
  }

  return (
    <div className="row mb-4">
      <div className="col-12 d-flex justify-content-between mb-2">
        <h4 className="font-size-14">VIDEOS</h4>
      </div>
      {videos &&
        videos.videos.map((video) => (
          <div className="col-12 col-md-4 col-lg-3 mb-4" key={video.id}>
            <VideoCard video={video} />
          </div>
        ))}
      {!videos && <SpinnerLoader />}
    </div>
  )
}

export default VideosSaved
