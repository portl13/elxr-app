import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import ReactPlayer from 'react-player'
import PlayerYouTube from 'react-player/youtube'
import PlayerVimeo from 'react-player/vimeo'

function VideoCard({ video }) {
  return (
    <article className="card-general">
      {!video.video && (
        <div className="ratio ratio-16x9 pointer">
          <span className="duration-video">
            <FontAwesomeIcon className="play-icon" icon={faPlay} />
          </span>
        </div>
      )}

      {video.thumbnail && (
        <div
          style={{
            backgroundImage: `url(${video.thumbnail})`,
          }}
          className="ratio ratio-16x9 pointer  cover-bg"
        >
          <span className="duration-video">
            <FontAwesomeIcon className="play-icon" icon={faPlay} />
          </span>
        </div>
      )}

      {!video.thumbnail &&
        !video?.video.includes('youtu') &&
        !video?.video.includes('vimeo') && (
          <div className="ratio ratio-16x9 pointer  cover-bg">
            <span className="duration-video">
              <FontAwesomeIcon className="play-icon" icon={faPlay} />
            </span>
            <video src={video.video}></video>
          </div>
        )}

      {!video.thumbnail && video?.video.includes('youtu') && (
        <div className="ratio ratio-16x9 pointer">
          <div className="button-open-modal"></div>
          <PlayerYouTube
            width={'100%'}
            height={'100%'}
            url={video?.video}
            config={{
              youtube: {
                playerVars: {
                  controls: 0,
                  showinfo: 0,
                  fs: 0,
                  disablekb: 1,
                  rel: 0,
                  modestbranding: 1,
                },
              },
            }}
          />
        </div>
      )}
      {!video.thumbnail && video?.video.includes('vimeo') && (
        <div className="ratio ratio-16x9 pointer">
          <div className="button-open-modal cursor"></div>
          <PlayerVimeo
            width={'100%'}
            height={'100%'}
            url={video?.video}
            config={{
              vimeo: {
                playerOptions: {
                  title: 0,
                  controls: 0,
                  showinfo: 0,
                },
              },
            }}
          />
        </div>
      )}
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
