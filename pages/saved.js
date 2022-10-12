import React from 'react'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import Saved from '@components/saved/Saved'
import Head from 'next/head'

function SavedPage() {
  return (
    <MainLayout 
    title="PORTL | Saved"
    sidebar={<MainSidebar />}>
        <Saved />
    </MainLayout>
  )
} 

export default SavedPage