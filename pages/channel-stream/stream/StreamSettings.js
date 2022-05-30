import React, { useRef, useState } from 'react'
import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'

const StreamSettingsStyle = css`
  .title {
    text-transform: uppercase;
    border-bottom: 1px solid #fff;
    padding: 4px 28px;
  }

  .stream-title {
    font-size: 18px;
    display: table;
  }

  .stream-subtitle {
    display: block;
    font-size: 14px;
  }

  .input-stream-container {
    display: flex;
    align-items: end;
  }
  .input-stream {
    display: flex;
    border-bottom: 1px solid #fff;
    justify-content: space-between;
    &-label {
      opacity: 0.5;
    }
    &-text {
      background-color: transparent;
      color: #fff;
      border: none;
      min-width: 350px;
    }
    &-icon {
      width: 35px;
      height: 35px;
      border: none;
      color: #fff;
      background: transparent;
      outline: none;
    }
    &-icon.lock {
      width: 25px;
    }
  }
  .btn-stream-small {
    min-width: 70px;
    background-color: transparent;
    border: 1px solid #fff;
  }
`

function StreamSettings(props) {
  const { stream_data } = props
  const inputStreamKey = useRef();
  const inputStreamUrl = useRef();

  const [showKey, setShowKey] = useState(false)

  const copyToClipboar = (copyText) => {
    navigator.clipboard.writeText(copyText.value)
  }

  return (
    <div css={StreamSettingsStyle} className="StreamSettings">
      <h3 className="stream-title title">stream settings</h3>
      <h4 className="stream-subtitle title">stream key</h4>
      <div className="input-stream-container mb-5 mt-4">
        <div>
          <label className="input-stream-label">
            Stream Key (Paste in encoder)
          </label>
          <div className="input-stream">
            <input
              ref={inputStreamKey}
              defaultValue={stream_data?.stream_key}
              className="input-stream-text"
              type={showKey ? 'text' : 'password'}
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="input-stream-icon"
            >
              {showKey ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </button>
          </div>
        </div>
   
        <button 
        className='btn-stream-small ml-2 btn btn-secondary'
        onClick={()=>copyToClipboar(inputStreamKey.current)}>
                copy
        </button>
      </div>
      <div className="input-stream-container">
        <div>
          <label className="input-stream-label">Stream URL</label>
          <div className="input-stream">
            <button className="input-stream-icon lock">
              <FontAwesomeIcon icon={faLock} />
            </button>
            <input
              ref={inputStreamUrl}
              readOnly
              defaultValue={stream_data?.rtmp_url}
              className="input-stream-text"
              type="text"
            />
          </div>
        </div>
        <button 
        className='btn-stream-small ml-3 btn btn-secondary'
        onClick={()=>copyToClipboar(inputStreamUrl.current)}>
                copy
        </button>
      </div>
    </div>
  )
}

export default StreamSettings
