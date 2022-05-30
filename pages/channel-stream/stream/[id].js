import React, { useContext, useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../../../components/layout/Layout'
import { css } from '@emotion/core'
import MainChat from '../../../components/eventChat/MainChat'
import StreamSettings from './StreamSettings'
import VideoStreamRtmp from './VideoStreamRtmp'
import VideoStreamWeb from './VideoStreamWeb'
import { useRouter } from 'next/router'
import { UserContext } from '../../../context/UserContext'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '../../../utils/constant'
const baseApi = process.env.baseUrl + '/wp-json/portl/v1/'
const containerChannel = css`
  padding: 0;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 1fr 320px;
    grid-template-rows: repeat(3, auto);
    gap: 15px;

    & .rato.ratio-16x9{
      position: relative;
    }

    & .video-container{
      line-height: 0;
    }

    & .video-element{
      max-width: 100%;
      height: auto;
    }
    .VideoStream {
      grid-column: 1 / span 1;
      grid-row: 1 / span 1;
    }
    .StreamSettings {
      grid-column: 1 / span 1;
      grid-row: 2 / span 1;
    }
    .MainChat {
      grid-column: 2 / span 1;
      grid-row: 1 / span 3;
      position: relative;
    }
  }

  .VideoStream {
    padding: 0;
  }
  .StreamSettings {
    padding: 0;
  }
  .MainChat {
    margin-bottom: 1rem;
    position: relative;
  }
  .buttom-live-stream {
    background-color: #f21c4d;
    display: inline-block;
    width: auto;
    margin: 10px;
    padding: 8px 15px;
    border-radius: 2px;
    border: none;
    text-transform: uppercase;
    color: #fff;
  }
  .buttom-live-stream.preview{
    padding: 18px 15px;
  }
  .strip-stream {
    background-color: #424242;
    min-height: 40px;
    display: flex;
    justify-content: center;
  }
  .btn{
    margin: 10px;
    padding: 8px 15px;
    min-height: 40px;
    max-height: 40px;
  }
`

function StreamPage() {
  const alert = useAlert()
  const { user } = useContext(UserContext)

  const router = useRouter()

  const { query } = router

  const [ stream, setStream ] = useState(null)

  const [videoHeight, setVideoHeight] = useState()

  useEffect(() => {
    if (!query?.id) return

    axios
      .get(baseApi + `channel_events/${query?.id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then(({ data }) => {
        setStream(data.data[0])
      })
      .catch((e) => {
        alert.error('Please reload this page again', TIMEOUT)
      })
  }, [query])

  return (
    <Layout>
      <Head>
        <title>WeShare | STREAM</title>
      </Head>
      <div className="container" css={containerChannel}>
        {stream && query?.type === 'rtmp' && (
          <VideoStreamRtmp event_channel={stream} stream_data={stream?.stream_data} />
        )}
        {stream && query?.type === 'webcam' && (
          <VideoStreamWeb stream_data={stream?.stream_data} />
        )}
        {stream && query?.type === 'rtmp' && (
          <StreamSettings stream_data={stream?.stream_data} />
        )}
        {user && stream?.live_chat && (
          <MainChat vendor_id={user?.id} videoHeight={videoHeight} />
        )}
      </div>
    </Layout>
  )
}

export default StreamPage
