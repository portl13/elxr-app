import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player'
import useInterval from '@hooks/useInterval';
import axios from 'axios'

function EventVideoStream(props) {
  const { stream_data, imageOffline } = props
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

  if (!streamStatus) {
    return (
      <div
        style={{
          backgroundImage: `url(${imageOffline})`,
        }}
        className="ratio ratio-16x9 bg-gray cover-bg"
      ></div>
    )
  }

  return (
    <div className="video-container">
      <div className="ratio ratio-16x9">
        {stream_data && streamStatus && (
          <ReactPlayer
            url={stream_data?.playback_url}
            width="100%"
            height="100%"
            controls={true}
            muted={false}
            onError={() => stopInterval()}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload', //<- this is the important bit
                },
              },
            }}
          />
        )}
      </div>
    </div>
  )
}

export default EventVideoStream
