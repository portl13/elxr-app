import React from 'react'
import VideoDetail from '@components/video/VideoDetail'

function VideoDetailPage({ id }) {
  return <VideoDetail id={id} />
}

export default VideoDetailPage

export async function getServerSideProps({ query }) {
    const { id } = query
    return {
      props: { id },
    }
  }
  