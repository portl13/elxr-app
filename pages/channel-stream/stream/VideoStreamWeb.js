import React, { useState, useRef, useEffect } from 'react'
import { Client } from '@livepeer/webrtmp-sdk'
import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
} from '@fortawesome/free-solid-svg-icons'

const VideoStreamWebStyle = css`
  .ratio {
    position: relative;
  }
`

function VideoStreamWeb(props) {
  const { stream_data = null } = props

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
    stopCameraAndMic()
  }

  useEffect(() => {
    getLocalVideo()
  }, [])

  useEffect(() => {
    return () => stopCameraAndMic()
  }, [])

  return (
    <div css={VideoStreamWebStyle}>
      <div className="video-container">
        <div className="ratio ratio-16x9">
          <video ref={videoPreview}></video>
          <span className="buttom-live-stream preview">
            {isActive ? 'live' : 'live preview'}
          </span>
        </div>
      </div>
      <div className="strip-stream">
        <div className="controls-stream">
          <button
            css={css`
              min-width: 52px;
            `}
            onClick={() => showCamera()}
            className="btn btn-secondary"
          >
            {video ? (
              <FontAwesomeIcon
                css={css`
                  width: 15px;
                `}
                icon={faVideo}
              />
            ) : (
              <FontAwesomeIcon
                css={css`
                  width: 15px;
                `}
                icon={faVideoSlash}
              />
            )}
          </button>
          <button
            css={css`
              min-width: 52px;
            `}
            onClick={() => showMuted()}
            className="btn btn-secondary"
          >
            {muted ? (
              <FontAwesomeIcon
                css={css`
                  width: 10px;
                `}
                icon={faMicrophone}
              />
            ) : (
              <FontAwesomeIcon
                css={css`
                  width: 18px;
                `}
                icon={faMicrophoneSlash}
              />
            )}
          </button>
          <button
            onClick={() =>
              isActive ? stopStream() : startStream(stream_data.stream_key)
            }
            className="buttom-live-stream"
          >
            {isActive ? 'end stream' : 'go live'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoStreamWeb
