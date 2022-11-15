import React from 'react'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import PageCommunities from '@components/main/pages/PageCommunities'
import Head from 'next/head'
import CommunityList from "@components/community/CommunityList";

function CommunitiesPage() {
  return (
      <MainLayout 
        title="Communities"
        sidebar={<MainSidebar />}
      >
        {/*<PageCommunities />*/}
          <CommunityList />
      </MainLayout>
  )
}

export default CommunitiesPage
