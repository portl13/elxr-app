import React, { useState } from 'react'
import PlusIcon from '@icons/PlusIcon'
import ChannelAddVideoModal from './ChannelAddVideoModal'

function ChannelVideoUploadButton({ id, token, mutateVideo }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="btn btn-borde text-white"
      >
        <i className="btn-icon-container">
          <PlusIcon className="btn-icon text-white" />
        </i>
        <span>Upload Video</span>
      </button>
      <ChannelAddVideoModal
        mutateVideo={mutateVideo}
        token={token}
        id={id}
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}

export default ChannelVideoUploadButton
