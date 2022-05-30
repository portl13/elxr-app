import React, { useState } from 'react'
import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import ReactPlayer from 'react-player/youtube'

const homeVideoStyle = css`
  margin-bottom: 30px;
  .video-home-container {
    background-image: url(/img/tattoo-girl.webp);
    background-size: cover;
    background-position: center;
    max-width: 1144px;
    background-color: var(--bg);
    margin: auto;
  }
  .video-home-container-play {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid var(--primary-color);
    position: relative;
  }
  .video-home-container-play svg {
    width: 30px;
    height: 30px;
    color: var(--primary-color);
    position: absolute;
    transform: translate(-40%, -46%);
  }
`

function HomeVideo() {
  const [play, setPlay] = useState(false)
  return (
    <section css={homeVideoStyle}>
      <div className="video-home-container ratio ratio-16x9 d-flex align-items-center justify-content-center">
        {!play && (
          <button
            onClick={() => setPlay(true)}
            className="video-home-container-play"
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
        {play && (
          <ReactPlayer
            width={'100%'}
            height={'100%'}
            url="https://youtu.be/xFVRn-T4TE8"
            config={{
              youtube: {
                playerVars: { autoplay: 1 },
              },
            }}
          />
        )}
      </div>
    </section>
  )
}

export default HomeVideo
