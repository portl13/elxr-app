import React from 'react'
import EventEditForm from '@components/dashboard/events/EventEditForm'
import Meta from '@components/layout/Meta'
import Head from 'next/head'

function EventEdit({ data }) {
  const { id } = data
  return (
    <>
    <Meta />
    <Head>
      <title>Edit Event</title>
    </Head>
    <EventEditForm id={id} />
  </>
  )
}

export default EventEdit

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { data: { id } },
  }
}
