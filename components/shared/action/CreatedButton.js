import AddPlusIcon from '@icons/AddPlusIcon'
import React from 'react'

function CreatedButton() {
  return (
    <button className="btn btn-detail-action">
      <span>ADD</span>
      <span className="btn-detail-icon">
        <AddPlusIcon />
      </span>
    </button>
  )
}

export default CreatedButton
