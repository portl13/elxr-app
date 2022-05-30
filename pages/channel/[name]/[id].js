import React, { useRef, useState, useEffect} from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout/Layout'
import ChannelMain from '../../../components/channelEvent/ChannelMain'
import MainChat from '../../../components/eventChat/MainChat'
import { css } from '@emotion/core'
import ChannelLiveFeed from '../../../components/channelEvent/ChannelLiveFeed'
import VideoEvent from '../../../components/eventChat/component/VideoEvent'
import ChannelProfile from '../../../components/channelEvent/ChannelProfile'
import { stringToSlug } from '../../../lib/stringToSlug'

const containerChannel = css`
padding: 0;
@media (min-width: 992px) {
  display: grid;
  grid-template-columns: 1fr 320px;
  grid-template-rows: repeat(3, auto);
  gap: 15px;
  .ChannelLiveFeed{
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
  }
  .VideoEvent{
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
  }
  .ChannelMain{
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
  }
  .MainChat{
    grid-column: 2 / span 1;
    grid-row: 1 / span 3;
    position: relative;
  }
}

.ChannelLiveFeed{

}
.VideoEvent{
  padding: 0;

}
.ChannelMain{
  padding: 0;

}
.MainChat{
  margin-bottom: 1rem;
  position: relative;
}
`

export default function ChannelPageDetail() {
  const { query, push: routerPush } = useRouter()

  const [channelData, setChannelData] = useState({})
  
  const [videoHeight, setVideoHeight] = useState()

  useEffect(() => {
    if(!query?.id) return;
    if(!query?.key && !query?.tab) {
      routerPush(`/channel/${stringToSlug(query?.name)}/${query?.id}?key=timeline&tab=personal`)
    }
  }, [query])
  
  return (
    <Layout>
      <Head>
        <title>WeShare | Channel</title>
      </Head>
      <div className="container bg-black bd-radius" css={containerChannel}>
        <section  className="container VideoEvent">
          {query?.id && <VideoEvent 
          vendor_id={query?.id} 
          channelData={channelData}
          setVideoHeight={setVideoHeight} />}
        </section>
        {query?.id && <MainChat vendor_id={query?.id} videoHeight={videoHeight} />}
        {query?.id && <ChannelMain setChannelData={setChannelData} vendor_id={query?.id} />}
        {query?.id && <ChannelProfile />}
      </div>
    </Layout>
  )
}
