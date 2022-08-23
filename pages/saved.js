import React from 'react'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import Saved from '@components/saved/Saved'
import Head from 'next/head'

function SavedPage() {
  return (
    <>
    <Head>
        <title>Weshare | Saved</title>
    </Head>
    <MainLayout sidebar={<MainSidebar />}>
        <Saved />
    </MainLayout>
    </>
  )
}

export default SavedPage