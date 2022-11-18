import React from 'react'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import CommunityList from "@components/community/CommunityList";

function CommunitiesPage() {
  return (
      <MainLayout 
        title="Communities"
        sidebar={<MainSidebar />}
      >
          <CommunityList />
      </MainLayout>
  )
}

export default CommunitiesPage
