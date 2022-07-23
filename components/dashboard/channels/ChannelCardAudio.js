import React, { useState } from 'react'
import ChannelVideoActions from './ChannelVideoActions'
import ChannelAudioModalDelete from './ChannelAudioModalDelete'
import ChannelAudioModalEdit from './ChannelAudioModalEdit'


function ChannelCardAudio({
  audio,
  mutateAudios,
  channel_id,
  token,
  mutateAudiosEdit,
}) {
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  return (
    <>
      <div className="col-12 col-md-6 col-lg-3 mb-4">
        <article className="card-general">
        <div
          className="ratio ratio-16x9 bg-gray card-head cover-bg"
          style={{ backgroundImage: `url(${audio.thumbnail || audio.cover})` }}
        ></div>
          <audio className="w-100" src={audio.audio} controls></audio>
          <div className="p-3">
            <div className="d-flex justify-content-between">
              <span className="badge badge-primary mb-1">Podcast</span>
              <ChannelVideoActions
                video={audio}
                openDeleteModal={openModalDelete}
                setOpenDeleteModal={setOpenModalDelete}
                openEditModal={openModalEdit}
                setOpenEditModal={setOpenModalEdit}
              />
            </div>
            <div className="mt-3">
              <h5 className="m-0 font-size-12 font-weight-bold">
                {audio.title}
              </h5>
              <p className="m-0 font-size-12 line-clamp-2">
                {audio.description}
              </p>
            </div>
          </div>
        </article>
      </div>
      <ChannelAudioModalDelete
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        audio={audio}
        mutateAudios={mutateAudios}
      />
      <ChannelAudioModalEdit
        open={openModalEdit}
        setOpen={setOpenModalEdit}
        id={channel_id}
        token={token}
        audio_id={audio.id}
        mutateAudiosEdit={mutateAudiosEdit}
      />
    </>
  )
}

export default ChannelCardAudio
