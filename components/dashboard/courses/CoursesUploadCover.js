import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '@pages/profile/loader'
import React from 'react'

function CoursesUploadCover({ text, cover, url, reset, onClick }) {
  return (
    <>
      {!cover && (
        <div
          onClick={onClick}
          className="upload-image border-moteado d-flex justify-content-center align-items-center"
        >
          <div className="upload-image position-relative d-flex justify-content-center align-items-center pointer">
            <div className={`upload-image-info text-center  p-0`}>
              <span className="upload-contain-icon ">
                <FontAwesomeIcon className="upload-image-icon" icon={faPlus} />
              </span>
              <p className="upload-cover-info">{text}</p>
              <span className="upload-info">10 mb max, png or jpeg</span>
            </div>
          </div>
        </div>
      )}
      {cover && (
        <div className="upload-image border-moteado d-flex justify-content-center align-items-center">
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
