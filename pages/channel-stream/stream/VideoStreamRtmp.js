import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import ReactPlayer from 'react-player'
import axios from 'axios'
import useInterval from '../../../hooks/useInterval'

function VideoStreamRtmp(props) {
  const { stream_data, event_channel } = props

  const mounted = useRef(false)
  const [streamStatus, setstreamStatus] = useState(false)
  const [intervalStatus, setIntervalStatus] = useState(true)

  const stopInterval = () => {
    setstreamStatus(false)
    setIntervalStatus(true)
  }

  const checkConexionStream = async (stream_data) => {
    if (!mounted.current) return
    try {
      const { data } = await axios.get(`/api/stream/${stream_data.id}`)

      if (data.isActive) {
        setstreamStatus(data.isActive)
        setIntervalStatus(false)
      }

      if (!data.isActive) {
        setstreamStatus(data.isActive)
      }
    } catch (e) {
      setstreamStatus(false)
    }
  }

  useInterval(
    () => {
      mounted.current = true
      checkConexionStream(stream_data)
    },
    intervalStatus ? 10000 : null
  )

  return (
    <div>
      <div className="video-container">
        <div className="ratio ratio-16x9">
          {stream_data && streamStatus ? (
            <ReactPlayer
              url={stream_data?.playback_url}
              width="100%"
              height="100%"
              controls={true}
              muted={true}
              onError={() => stopInterval()}
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload', //<- this is the important bit
                  },
                },
              }}
            />
          ) : (
            <>
              <video
                autoPlay={false}
                poster={event_channel?.thumbnail ? event_channel?.thumbnail : ''}
                playsInline
                className="video-element"
              ></video>
              <span className="buttom-live-stream btn-rtmp preview">
                {streamStatus ? 'live' : 'no live'}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="strip-stream">
        <div className="controls-stream"></div>
      </div>
    </div>
  )
}

export default VideoStreamRtmp
