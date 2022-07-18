import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalBody } from 'reactstrap'
import { css } from '@emotion/core'
import ReactPlayer from 'react-player'
import ChannelVideoActions from './ChannelVideoActions'
import ChannelVideoModalDelete from './ChannelVideoModalDelete'
import ChannelVideoModalEdit from './ChannelVideoModalEdit'

const modalInviteStyle = css`
  .modal-content {
    background-color: var(--bg);
    border: 1px solid var(--white-color);
  }
`

function ChannelCardVideo({ video, mutateVideos, channel_id, token, mutateVideosEdit }) {
  const [openModal, setOpenModal] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  return (
    <>
      <div className="col-12 col-md-6 col-lg-3 mb-4">
        <article className="card-general">
          <div
            onClick={() => setOpenModal(!openModal)}
            className="ratio ratio-16x9 pointer"
          >
            <span className="duration-video">
              <FontAwesomeIcon className="play-icon" icon={faPlay} />
            </span>
            <video src={video.video}></video>
          </div>
          <div className="p-3">
            <div className='d-flex justify-content-between'>
              <span className="badge badge-primary mb-1">Video</span>
              <ChannelVideoActions
                video={video}
                openDeleteModal={openModalDelete}
                setOpenDeleteModal={setOpenModalDelete}
                openEditModal={openModalEdit}
                setOpenEditModal={setOpenModalEdit}
              />
            </div>
            <div className='mt-3'>
              <h5 className="m-0 font-size-12 font-weight-bold">
                {video.title}
              </h5>
              <p className="m-0 font-size-12 line-clamp-2">
                {video.description}
              </p>
            </div>
          </div>
        </article>
      </div>
      <Modal
        css={modalInviteStyle}
        isOpen={openModal}
        toggle={() => setOpenModal(!openModal)}
        centered
        size="lg"
      >
        <ModalBody>
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
        </ModalBody>
      </Modal>
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
