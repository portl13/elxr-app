import React, { useState } from 'react'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MediaLibrary from '@components/MediaLibrary/MediaLibrary'

function MediaLibraryAvatar({ selectMedia, logo, url, reset, text, token }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="d-flex w-100">
        <div className="avatar-upload-contain text-center position-relative">
          {logo && (
            <>
              <button onClick={reset} className="btn btn-clean-media logo">
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div className="avatar-upload">
                <div
                  style={{
                    backgroundImage: `url(${url})`,
                  }}
                  className="avatar-contain-img ratio ratio-1x1 solid"
                ></div>
              </div>
            </>
          )}
          {!logo && (
            <div
              onClick={() => setOpen(true)}
              className="avatar-upload pointer"
            >
              <div className="avatar-contain-img ratio ratio-1x1"></div>
              <span className="avatar-contain-icon">
                <FontAwesomeIcon className="upload-image-icon" icon={faPlus} />
              </span>
            </div>
          )}

          <div className="pl-3">
            <p className="mb-0 mt-2">{text}</p>
            <span className="upload-info">10 mb max, png or jpeg</span>
          </div>
        </div>
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

export default MediaLibraryAvatar
