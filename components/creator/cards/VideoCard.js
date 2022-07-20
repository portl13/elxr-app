import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function VideoCard({ video }) {
  return (
    <article className="card-general">
      <div className="ratio ratio-16x9 pointer bg-gray">
        <span className="duration-video">
          <FontAwesomeIcon className="play-icon" icon={faPlay} />
        </span>
        {video && video.video && <video src={video.video}></video>}
      </div>
      <div className="p-3">
        <div className="d-flex justify-content-between">
          <span className="badge badge-primary mb-1">Video</span>
        </div>
        <div className="mt-3">
          <h5 className="m-0 font-size-12 font-weight-bold">{video.title}</h5>
          <p className="m-0 font-size-12 line-clamp-2">{video.description}</p>
        </div>
      </div>
    </article>
  )
}

export default VideoCard
