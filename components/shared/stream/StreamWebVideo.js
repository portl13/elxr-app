import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/core'
import {
  faMicrophone,
  faMicrophoneSlash,
  faPlay,
  faStop,
  faVideo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Client } from '@livepeer/webrtmp-sdk'

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

function StreamWebVideo({ stream_key }) {
  const videoPreview = useRef(null)
  const stream = useRef(null)
  const session = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [muted, setMuted] = useState(true)
  const [video, setVideo] = useState(true)
  const [streamKey, setStreamKey] = useState(null)

  const getLocalVideo = async () => {
    videoPreview.current.volume = 0

    stream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })

    videoPreview.current.srcObject = stream.current

    videoPreview.current.play()
  }

  const startStream = async () => {
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

  useEffect(() => {
    if (stream_key) {
      setStreamKey(stream_key)
    }
  }, [stream_key])

  return (
    <div css={styleLivePage} className={`ratio ratio-16x9`}>
      <video ref={videoPreview}></video>
      <div className="video-control d-flex justify-content-center">
        <div>
          <button onClick={() => showCamera()} className="btn btn-icon mr-2">
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

          {!isActive && (
            <button
              onClick={() => startStream()}
              className="btn  btn-icon ml-2"
            >
              <FontAwesomeIcon
                className="video-control-icon text-white"
                icon={faPlay}
              />
            </button>
          )}
          {isActive && (
            <button
              onClick={() => stopStream()}
              className="btn  btn-icon ml-2 bg-danger"
            >
              <FontAwesomeIcon
                className="video-control-icon text-white"
                icon={faStop}
              />
            </button>
          )}

          <button onClick={() => showMuted()} className="btn  btn-icon ml-2">
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
  )
}

export default StreamWebVideo
