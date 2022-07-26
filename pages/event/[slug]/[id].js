import EventDetails from '@components/main/details/channel/EventDetails'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import Head from 'next/head'
import React from 'react'

function PageEventDetails({ id }) {
  return (
    <>
    <Head>
        <title>Event Detail</title>
    </Head>
    <MainLayout
      sidebar={<MainSidebar />}
    >
      <EventDetails id={id} />
    </MainLayout>
    </>
  )
}

export default PageEventDetails

export async function getServerSideProps({ query }) {
    const { id } = query
    return {
      props: { id },
    }
  }
  