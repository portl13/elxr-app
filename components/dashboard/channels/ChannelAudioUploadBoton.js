import React, { useState } from 'react'
import PlusIcon from '@icons/PlusIcon'
import ChannelAddAudioModal from './ChannelAddAudioModal'

function ChannelAudioUploadBoton({ id, token, mutateAudio }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(!open)} className="btn btn-borde">
        <i className="btn-icon-container">
          <PlusIcon className="btn-icon" />
        </i>
        <span className="text-font">Upload Podcast</span>
      </button>
      <ChannelAddAudioModal
        mutateAudio={mutateAudio}
        token={token}
        id={id}
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}

export default ChannelAudioUploadBoton
