import React from 'react'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import PageCommunitues from '@components/main/pages/PageCommunitues'
import Head from 'next/head'

function CommunitiesPage() {
  return (
    <>
      <Head>
        <title>Communities</title>
      </Head>
      <MainLayout sidebar={<MainSidebar />}>
        <PageCommunitues />
      </MainLayout>
    </>
  )
}

export default CommunitiesPage
