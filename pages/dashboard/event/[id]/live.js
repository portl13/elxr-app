import React, { useContext, useRef, useState, useEffect } from 'react'
import Head from 'next/head'
import Meta from '@components/layout/Meta'
import { css } from '@emotion/core'
import { Client } from '@livepeer/webrtmp-sdk'
import useSWRImmutable from 'swr/immutable'
import { genericFetch } from '@request/dashboard'
import { UserContext } from '@context/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
const urlStream = `${process.env.apiV2}/channel-event/stream`

const styleLivePage = css`
  .live-page {
    padding-top: 100px;
  }
  .video-control {
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: unset;
    padding: 20px 0;
  }
  .video-control-icon {
    width: 15px;
    height: 15px;
  }
  .btn-icon {
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 50%;
    background-color: #303236;
  }
`

function LivePage({ id }) {
  const { user } = useContext(UserContext)
  const token = user?.token

  const { data: stream_data } = useSWRImmutable(
    token ? [`${urlStream}?channel_id=${id}`, token] : null,
    genericFetch
  )

  const videoPreview = useRef(null)
  const stream = useRef(null)
  const session = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [muted, setMuted] = useState(true)
  const [video, setVideo] = useState(true)

  const getLocalVideo = async () => {
    videoPreview.current.volume = 0

    stream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })

    videoPreview.current.srcObject = stream.current

    videoPreview.current.play()
  }

  const startStream = async (streamKey) => {
    if (!streamKey) {
      return
    }

    if (!stream.current) {
      await getLocalVideo()
    }

    const client = new Client()

    session.current = client.cast(stream.current, streamKey)

    session.current.on('open', () => {
      setIsActive(true)
    })

    session.current.on('close', () => {
      setIsActive(false)
    })

    session.current.on('error', (err) => {})
  }

  const stopCameraAndMic = () => {
    stream.current.getTracks().forEach((track) => track.stop())
    stream.current = null
  }

  const showCamera = () => {
    stream.current.getVideoTracks().forEach((track) => {
      const enabled = !track.enabled
      setVideo(enabled)
      track.enabled = enabled
    })
  }

  const showMuted = () => {
    stream.current.getAudioTracks().forEach((track) => {
      const enabled = !track.enabled
      setMuted(enabled)
      track.enabled = enabled
    })
  }

  const stopStream = () => {
    session.current.close()
  }

  useEffect(() => {
    getLocalVideo()
  }, [])

  useEffect(() => {
    return () => stopCameraAndMic()
  }, [])

  return (
    <>
      <Meta />
      <Head>
        <title>Live Stream</title>
      </Head>
      <div className="container">
        <div className="d-flex align-items-center">
          <Link href={'/dashboard/events'}>
            <a className="text-font ml-5 mt-3">
              <span className="contain-icon">
                <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
              </span>
              <span className="back">Back</span>
            </a>
          </Link>
        </div>
      </div>
      <div css={styleLivePage} className="container container-80">
        <div className="row live-page">
          <div className="col-12 col-lg-8">
            <div className="border-white video-container p-0 overflow-hidden">
              <div className="ratio ratio-16x9">
                <video ref={videoPreview}></video>
                <div className="video-control d-flex justify-content-center">
                  <div>
                    <button
                      onClick={() => showCamera()}
                      className="btn btn-icon mr-2"
                    >
                      {!video && (
                        <FontAwesomeIcon
                          className="video-control-icon text-white"
                          icon={faVideo}
                        />
                      )}
                      {video && (
                        <FontAwesomeIcon
                          className="video-control-icon text-white"
                          icon={faVideo}
                        />
                      )}
                    </button>
                    <button
                      onClick={() => showMuted()}
                      className="btn  btn-icon ml-2"
                    >
                      {!muted && (
                        <FontAwesomeIcon
                          className="video-control-icon text-white"
                          icon={faMicrophone}
                        />
                      )}

                      {muted && (
                        <FontAwesomeIcon
                          className="video-control-icon text-white"
                          icon={faMicrophoneSlash}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <aside className="col-12 col-lg-4 d-flex">
            <div className="border-white w-100 d-flex justify-content-center align-items-center">
              {!isActive && (
                <div className="text-center">
                  <h4 className="font-weight-bold">READY TO GO LIVE</h4>
                  <p>Go Live and your Subscribers will get notified.</p>
                  <button
                    onClick={() => startStream(stream_data.stream_key)}
                    disabled={!stream_data}
                    className="btn btn-primary btn-create"
                  >
                    Go Live
                  </button>
                </div>
              )}
              {isActive && (
                <div className="text-center">
                  <h4 className="font-weight-bold">LIVE NOW</h4>
                  <p>Your Subscribers are watching you.</p>
                  <button
                    onClick={() => stopStream()}
                    disabled={!stream_data}
                    className="btn btn-primary btn-create"
                  >
                    End Session
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

export default LivePage

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { id },
  }
}
