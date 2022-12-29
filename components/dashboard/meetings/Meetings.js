import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import JitsiMeet from '@pages/group/JitsiMeet'
import { css } from '@emotion/core'
import { v4 as uuidv5 } from 'uuid'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";

const nextSiteUrl = process.env.nextSite

const meetStyle = css`
  margin: auto;
  .border-white {
    border: 2px solid var(--white-color);
  }
  .meeting-panel-title {
    font-size: 1.5rem;
  }
  .only-read-meet {
    background-color: var(--bg);
    border: 1px solid var(--white-color);
  }
`

function Meetings() {
  const webcamRef = React.useRef(null)
  const [displayName, setDisplayName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [onCall, setOnCall] = useState(false)
  const [roomNameUrl, setRoomNameUrl] = useState('')

  const formMeet = useFormik({
    initialValues: {
      your_name: '',
    },
    onSubmit: (values) => callStart(values),
    validationSchema: Yup.object({
      your_name: Yup.string().required('Your name is Required'),
    }),
  })

  useEffect(() => {
    let roomname = uuidv5()
    setRoomName(roomname)
    setRoomNameUrl(`${nextSiteUrl}/portal-meeting?room=${roomname}`)
  }, [])

  const apiReady = (api) => {
    api.addListener('readyToClose', (payload) => setOnCall(false))
    api.addListener('participantLeft', (payload) => setOnCall(false))
  }

  const callStart = ({ your_name, meet_password }) => {
    setDisplayName(your_name)
    setOnCall(true)
  }

  return (
    <>
      <BackButton />
    <div className='container container-80' css={meetStyle}>
      <div className="my-5">
        <ListNavItem
            data={{
              title: "Meeting",
              icon: "/img/icon-movil/create-menu/blog-icon.svg",
              type: "heading",
            }}
        />
      </div>
      {!onCall && (
        <>
          <div className="video-panel ratio ratio-16x9 border-white font-color">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              height="100%"
              className=" p-0"
            />
          </div>
          <form className="meeting-panel" onSubmit={formMeet.handleSubmit}>
            <h1 className="meeting-panel-title my-3">Join meeting</h1>
            <div className=" p-2 input-search mr-0 border-radius-35 mb-3">
              <input
                type="text"
                placeholder="Your name"
                value={formMeet.values.your_name}
                onChange={formMeet.handleChange}
                name="your_name"
                autoComplete="off"
                className="mb-0 bg-transparent border-0 color-font w-100 mr-0"
              />
            </div>
            <div className="invalid-feedback d-block text-center my-1">
              {formMeet.errors.your_name && formMeet.errors.your_name}
            </div>
            <button type='submit' className="submit btn btn-create w-100"> Join meeting</button>
          </form>
        </>
      )}

      {onCall && (
        <>
          <JitsiMeet
            onApiReady={apiReady}
            roomName={roomName}
            displayName={displayName}
          />
          <div className="form-group">
            <label>Meet Url</label>
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
        </>
      )}
    </div>
    </>
    
  )
}

export default Meetings
