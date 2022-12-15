import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '@pages/profile/loader'
import React from 'react'

function CoursesUploadCover({
  text,
  cover,
  url,
  reset,
  onClick,
  className = '',
  error = null,
}) {
  return (
    <>
      {!cover && (
        <div
          onClick={onClick}
          className={`upload-image border-moteado d-flex justify-content-center align-items-center ${className}`}
        >
          <div className="upload-image position-relative d-flex justify-content-center align-items-center pointer">
            <div className={`upload-image-info text-center p-0`}>
              <span className="upload-contain-icon ">
                <FontAwesomeIcon className="upload-image-icon" icon={faPlus} />
              </span>
              <p
                className="upload-cover-info"
                dangerouslySetInnerHTML={{ __html: text }}
              />
              <span className="upload-info">10 mb max, png or jpeg</span>
              {error ? <div className="text-danger">{error}</div> : null}
            </div>
          </div>
        </div>
      )}
      {cover && (
        <div
          className={`upload-image border-moteado d-flex justify-content-center align-items-center ${className}`}
        >
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
        </div>
      )}
    </>
  )
}

export default CoursesUploadCover
