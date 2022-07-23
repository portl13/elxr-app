import React, { useState } from 'react'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MediaLibrary from '@components/MediaLibrary/MediaLibrary'

function MediaLibraryCover({ selectMedia, cover, reset, text, token, isAvatar = true }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="upload-image border-moteado d-flex justify-content-center align-items-center">
        {!cover && (
          <div 
          onClick={() => setOpen(true)}
          className="upload-image position-relative d-flex justify-content-center align-items-center pointer">
            <div
              className={`upload-image-info text-center  ${
                isAvatar ? 'pb-5 pb-md-0' : 'p-0'
              }`}
            >
              <span className="upload-contain-icon ">
                <FontAwesomeIcon className="upload-image-icon" icon={faPlus} />
              </span>
              <p className="upload-cover-info">{text}</p>
              <span className="upload-info">10 mb max, png or jpeg</span>
            </div>
          </div>
        )}

        {cover && (
          <div
            style={{
              backgroundImage: `url(${cover.url})`,
            }}
            className="upload-image  position-relative  d-flex justify-content-center align-items-center"
          >
            <button onClick={reset} className="btn btn-clean-media banner">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )}
      </div>
      {token && open && (
        <MediaLibrary
          token={token}
          show={open}
          onHide={() => setOpen(!open)}
          selectMedia={selectMedia}
          media_type={'image'}
        />
      )}
    </>
  )
}

export default MediaLibraryCover
