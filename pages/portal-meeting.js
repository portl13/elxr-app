import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Col } from 'reactstrap'
import Webcam from 'react-webcam'
import Layout from '@components/layout/Layout'
import { useRouter } from 'next/router'
import { css } from '@emotion/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import JitsiMeet from '@pages/group/JitsiMeet'
import Loader from "@pages/profile/loader";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";

const meetStyle = css`
  .only-read-meet {
    background-color: var(--bg);
    border: 1px solid var(--white-color);
  }
`

const LoadMeeting = () => {
    return (
        <div css={meetStyle} className="d-flex justify-content-center align-items-center">
            <Loader />
        </div>
    )
}

export default function PagePortalMeeting() {
  const webcamRef = React.useRef(null)
  const [displayName, setDisplayName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [onCall, setOnCall] = useState(false)
  const router = useRouter()
  const { query } = router
  const { room = null } = query

  const formMeet = useFormik({
    initialValues: {
      your_name: '',
      meet_password: ''
    },
    onSubmit: (values) => callStart(values),
    validationSchema: Yup.object({
      your_name: Yup.string().required('Your name is Required'),
    }),
  })

  useEffect(() => {
    if(room) setRoomName(room)
  }, [room])

  const callStart = ({your_name}) => {
    if(!roomName){
        return
    }
    setDisplayName(your_name)
    setOnCall(true)
  }


  const apiReady = (api) => {
    api.addListener('readyToClose', (payload) => setOnCall(false))
    api.addListener('participantLeft', (payload) => setOnCall(false))
  }
  
  return (
    <MainLayout sidebar={<MainSidebar />}>
      <Col className="bg-black bd-radius py-3 col-padding" xs="12">
        <div css={meetStyle}>
          {!onCall && (
            <>
              <div className="video-panel ratio ratio-16x9">
                <Webcam
                  audio={false}
                  height={"100%"}
                  width={"100%"}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                />
              </div>
              <form className="meeting-panel" onSubmit={formMeet.handleSubmit}>
                <h1>Join meeting</h1>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formMeet.values.your_name}
                  onChange={formMeet.handleChange}
                  name="your_name"
                  autoComplete="off"
                  className="mb-0"
                />
                <div className="invalid-feedback d-block text-center my-1">
                  {formMeet.errors.your_name && formMeet.errors.your_name}
                </div>
                <button type="submit"> Join meeting</button>
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
            </>
          )}
        </div>
      </Col>
    </MainLayout>
  )
}
