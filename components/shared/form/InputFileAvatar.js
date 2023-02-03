
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '@components/profile/loader'
import React from 'react'

function InputFileAvatar({ isLoading, handlerUpload, logo, url, reset, text }) {
  return (
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
          <div className="avatar-upload pointer">
            {!isLoading ? (
              <>
                <input
                  onChange={handlerUpload}
                  accept="image/*"
                  type="file"
                  name="vendor_banner"
                  className="upload-input-hidden z-index-2 pointer"
                />
                <div className="avatar-contain-img ratio ratio-1x1"></div>
                <span className="avatar-contain-icon">
                  <FontAwesomeIcon
                    className="upload-image-icon"
                    icon={faPlus}
                  />
                </span>
              </>
            ) : (
              <div className="avatar-contain-img ratio ratio-1x1">
                <div className="loading-upload h-100 d-flex align-items-center w-100 justify-content-center">
                  <Loader color="primary" />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="pl-3">
          <p className="mb-0 mt-2">{text}</p>
          <span className="upload-info">10 mb max, png or jpeg</span>
        </div>
      </div>
    </div>
  )
}

export default InputFileAvatar
