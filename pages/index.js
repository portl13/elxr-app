import React from 'react'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import MainHome from '@components/main/MainHome'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>PORTL</title>
      </Head>
      <MainLayout sidebar={<MainSidebar />}>
        <MainHome />
      </MainLayout>
    </>
  )
}
