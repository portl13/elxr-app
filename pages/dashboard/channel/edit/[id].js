import React from 'react'
import Meta from '@components/layout/Meta'
import Head from 'next/head'
import ChannelCreate from '@components/dashboard/channels/ChannelCreate'

function ChannelEdit({ data }) {
  const { id } = data
  return (
    <>
      <Meta />
      <Head>
        <title>EDIT CHANNEL</title>
      </Head>
      <ChannelCreate id={id} />
    </>
  )
}

export default ChannelEdit

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { data: { id } },
  }
}
