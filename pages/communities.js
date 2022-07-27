import React from 'react'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import PageCommunities from '@components/main/pages/PageCommunities'
import Head from 'next/head'

function CommunitiesPage() {
  return (
    <>
      <Head>
        <title>Communities</title>
      </Head>
      <MainLayout sidebar={<MainSidebar />}>
        <PageCommunities />
      </MainLayout>
    </>
  )
}

export default CommunitiesPage
