import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { css } from '@emotion/core'
import PlayerYouTube from 'react-player/youtube'
import PlayerVimeo from 'react-player/vimeo'
import ChannelVideoActions from './ChannelVideoActions'
import ChannelVideoModalDelete from './ChannelVideoModalDelete'
import ChannelVideoModalEdit from './ChannelVideoModalEdit'
import CategoryAndTags from '@components/shared/cards/CategoryAndTags'
import { useRouter } from 'next/router'
import { stringToSlug } from '@lib/stringToSlug'
import Link from 'next/link'

const modalInviteStyle = css`
  .modal-content {
    background-color: var(--bg);
    border: 1px solid var(--white-color);
  }
`

function ChannelCardVideo({
  video,
  mutateVideos,
  channel_id,
  token,
  mutateVideosEdit,
}) {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)

  const redirectVideoDetail = async (video) => {
    await router.push(`/video/${stringToSlug(video.title)}/${video.id}`)
  }

  return (
    <>
      <div className="col-12 col-md-6 col-lg-3 mb-4">
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
              onClick={() => redirectVideoDetail(video)}
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
                onClick={() => redirectVideoDetail(video)}
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
                onClick={() => redirectVideoDetail(video)}
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
                onClick={() => redirectVideoDetail(video)}
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
              <ChannelVideoActions
                video={video}
                openDeleteModal={openModalDelete}
                setOpenDeleteModal={setOpenModalDelete}
                openEditModal={openModalEdit}
                setOpenEditModal={setOpenModalEdit}
              />
            </div>
            <div className="mt-3">
              <h5 className="m-0 font-size-12 font-weight-bold">
                <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
                  <a className="text-white">{video.title}</a>
                </Link>
              </h5>
              <p className="m-0 font-size-12 line-clamp-2">
                {video.description}
              </p>
              <CategoryAndTags tags={video.tags} category={video.category} />
            </div>
          </div>
        </article>
      </div>
      <ChannelVideoModalDelete
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        video={video}
        mutateVideos={mutateVideos}
      />
      <ChannelVideoModalEdit
        open={openModalEdit}
        setOpen={setOpenModalEdit}
        id={channel_id}
        token={token}
        video_id={video.id}
        mutateVideos={mutateVideosEdit}
      />
    </>
  )
}

export default ChannelCardVideo
