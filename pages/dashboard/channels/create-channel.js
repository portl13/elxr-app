import React from 'react'
import Meta from '@components/layout/Meta'
import Head from 'next/head'
import ChannelCreate from '@components/dashboard/channels/ChannelCreate'

function CreateChannel() {
  return (
    <>
      <Meta />
      <Head>
        <title>CREATE CHANNEL</title>
      </Head>
      <ChannelCreate />
    </>
  )
}

export default CreateChannel
