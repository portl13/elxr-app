import React from 'react'
import Meta from '@components/layout/Meta'
import Head from 'next/head'
import ChannelCreateEvent from '@components/dashboard/channels/ChannelCreateEvent'


function CreateEvent({ data }) {
  const { id } = data
  return (
    <>
      <Meta />
      <Head>
        <title>Create Event</title>
      </Head>
      <ChannelCreateEvent id={id} now={false} />
    </>
  )
}

export default CreateEvent

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { data: { id } },
  }
}
