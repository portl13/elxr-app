import React from 'react'
import PodcastsDetails from '@components/podcasts/PodcastsDetails'

function PodcastsDetailPage({ id }) {
  return <PodcastsDetails id={id} />
}

export default PodcastsDetailPage

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { id },
  }
}
