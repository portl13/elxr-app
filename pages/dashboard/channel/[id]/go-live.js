import React from 'react'
import Meta from '@components/layout/Meta'
import Head from 'next/head'
import ChannelCreateEvent from '@components/dashboard/channels/ChannelCreateEvent'

function GoLive({ data }) {
  const { id } = data
                    
  return (
    <>
      <Meta />
      <Head>
        <title>GO LIVE</title>
      </Head>
      <ChannelCreateEvent text={"Go Live"} id={id} now={true} />
    </>
  )
}

export default GoLive

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { data: { id } },
  }
}