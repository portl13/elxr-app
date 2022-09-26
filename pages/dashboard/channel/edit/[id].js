import React from 'react'
import Meta from '@components/layout/Meta'
import Head from 'next/head'
import ChannelCreate from '@components/dashboard/channels/ChannelCreate'
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";

function ChannelEdit({ data }) {
  const { id } = data
  return (
    <MainLayout title={"Edit Channel"} sidebar={<MainSidebar />}>
      <ChannelCreate id={id} />
    </MainLayout>
  )
}

export default ChannelEdit

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { data: { id } },
  }
}
