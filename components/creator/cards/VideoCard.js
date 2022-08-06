import React, { useState } from 'react'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactPlayer from 'react-player'
import PlayerYouTube from 'react-player/youtube'
import PlayerVimeo from 'react-player/vimeo'
import { Modal, ModalBody } from 'reactstrap'

function VideoCard({ video }) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
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
            onClick={() => setOpenModal(!openModal)}
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
            <div
              onClick={() => setOpenModal(!openModal)}
              className="ratio ratio-16x9 pointer  cover-bg"
            >
              <span className="duration-video">
                <FontAwesomeIcon className="play-icon" icon={faPlay} />
              </span>
              <video src={video.video}></video>
            </div>
          )}

        {!video.thumbnail && video?.video.includes('youtu') && (
          <div className="ratio ratio-16x9 pointer">
            <button
              className="button-open-modal"
              onClick={() => setOpenModal(!openModal)}
            ></button>
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
            <button
              className="button-open-modal"
              onClick={() => setOpenModal(!openModal)}
            ></button>
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
      <Modal
        isOpen={openModal}
        toggle={() => setOpenModal(!openModal)}
        centered
        size="lg"
      >
        <ModalBody>
          {video?.video.includes('youtu') && (
            <div className="ratio ratio-16x9">
              <PlayerYouTube
                width={'100%'}
                height={'100%'}
                url={video?.video}
                config={{
                  youtube: {
                    playerVars: {
                      controls: 1,
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

          {!video?.video.includes('youtu') && !video?.video.includes('vimeo') && (
            <ReactPlayer
              url={video?.video}
              width="100%"
              height="100%"
              controls={true}
              muted={true}
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload', //<- this is the important bit
                  },
                },
              }}
            />
          )}

          {video?.video.includes('vimeo') && (
            <div className="ratio ratio-16x9">
              <PlayerVimeo
                width={'100%'}
                height={'100%'}
                url={video?.video}
                config={{
                  vimeo: {
                    playerOptions: {
                      title: 1,
                      controls: 1,
                      showinfo: 1,
                    },
                  },
                }}
              />
            </div>
          )}
        </ModalBody>
      </Modal>
    </>
  )
}

export default VideoCard
