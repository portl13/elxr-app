import React, { useState } from 'react'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RepostModal from './RepostModal'

function RepostButton({
  className,
  activity,
  photoArray,
  setPhotoArray,
  updateContent,
  createRepost,
  handleDescription,
  groupData,
  likeAction
}) {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  return (
    <>
      <button onClick={toggle} className={`btn-3 btn ${className}`}>
        <i>
          <FontAwesomeIcon icon={faRetweet} className="icon-2rem" />
        </i>
      </button>
      {open ? (
        <RepostModal
          updateContent={updateContent}
          handleDescription={handleDescription}
          photoArray={photoArray}
          setPhotoArray={setPhotoArray}
          activity={activity}
          groupData={groupData}
          open={open}
          toggle={toggle}
          likeAction={likeAction}
          createRepost={createRepost}
        />
      ) : null}
    </>
  )
}

export default RepostButton
