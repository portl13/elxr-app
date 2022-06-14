import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import JitsiMeet from '@pages/group/JitsiMeet'
import { css } from '@emotion/core'
import { v4 as uuidv5 } from 'uuid'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const nextSiteUrl = 'http://localhost:3000/'

const meetStyle = css`
    .only-read-meet{
        background-color: var(--bg);
        border:1px solid var(--white-color);
    }
`

function MyPortalMeet() {
  const webcamRef = React.useRef(null)
  const [displayName, setDisplayName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [roomNameUrl, setRoomNameUrl] = useState('')
  const [password, setPassword] = useState('')
  const [onCall, setOnCall] = useState(false)


  useEffect(() => {
    let roomname = uuidv5()
    setRoomName(roomname)
    setRoomNameUrl(`${nextSiteUrl}portal-meeting/${roomname}`)
  }, [])
  

  const apiReady = (api) => {
    api.addListener('readyToClose', (payload) => setOnCall(false))
    api.addListener('participantLeft', (payload) => setOnCall(false))
  }

  const callStart = () => {



    setOnCall(true)
  }

  return (
    <div css={meetStyle}>
      {!onCall && (
        <>
          <div className="video-panel">
            <Webcam
              audio={false}
              height={450}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={900}
            />
          </div>
          <div className="meeting-panel">
            <h1>Join meeting</h1>
            <input
              type="text"
              placeholder="Your name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              name="meet-password"
            />
            <button onClick={() => callStart()}> Join meeting</button>
          </div>
        </>
      )}
      <div class="form-group">
        <label for="exampleInputEmail1">Meet Url</label>
        <input
          type="text"
          className="form-control only-read-meet"
          value={roomNameUrl}
          readOnly
        />
        <small className="form-text text-muted">
            send this url to your friends
        </small>
      </div>
      {onCall && (
        <>
          <JitsiMeet
            onApiReady={apiReady}
            roomName={roomName}
            displayName={displayName}
            password={password}
          />
        </>
      )}
    </div>
  )
}

export default MyPortalMeet
