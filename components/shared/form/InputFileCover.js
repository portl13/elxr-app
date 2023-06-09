import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '@components/profile/loader'
import React from 'react'

function InputFileCover({
  isLoading,
  handlerUpload,
  cover,
  url,
  reset,
  text,
  isAvatar,
}) {
  return (
    <div className="upload-image border-moteado d-flex justify-content-center align-items-center">
      {!cover && (
        <div className="upload-image position-relative d-flex justify-content-center align-items-center pointer">
          {!isLoading ? (
            <>
              <input
                onChange={handlerUpload}
                accept="image/*"
                type="file"
                name="featured_image"
                className="upload-input-hidden pointer"
              />
              <div
                className={`upload-image-info text-center  ${
                  isAvatar ? 'pb-5 pb-md-0' : 'p-0'
                }`}
              >
                <span className="upload-contain-icon ">
                  <FontAwesomeIcon
                    className="upload-image-icon"
                    icon={faPlus}
                  />
                </span>
                <p className="upload-cover-info">{text}</p>
                <span className="upload-info">10 mb max, png or jpeg</span>
              </div>
            </>
          ) : (
            <div className="loading-upload">
              <Loader color="primary" />
            </div>
          )}
        </div>
      )}

      {cover && (
        <div
          style={{
            backgroundImage: `url(${url})`,
          }}
          className="upload-image  position-relative  d-flex justify-content-center align-items-center"
        >
          <button onClick={reset} className="btn btn-clean-media banner">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}
    </div>
  )
}

export default InputFileCover
