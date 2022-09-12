import React from 'react'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import PageCommunities from '@components/main/pages/PageCommunities'
import Head from 'next/head'

function CommunitiesPage() {
  return (
      <MainLayout 
        title="Communities"
        sidebar={<MainSidebar />}
      >
        <PageCommunities />
      </MainLayout>
  )
}

export default CommunitiesPage
