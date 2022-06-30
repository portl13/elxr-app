import React, { useState } from 'react'
import InviteAddModal from './InviteAddModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

function InviteButton() {
  const [open, setOpen] = useState(false)
  return (
    <button
      onClick={() => setOpen(!open)}
      className="btn btn-border-primary-2 py-2"
    >
      <i>
        <FontAwesomeIcon className="icon-width-09" icon={faUserPlus} />
      </i>
      <span>Invite</span>
      <InviteAddModal open={open} setOpen={setOpen} />
    </button>
  )
}

export default InviteButton
