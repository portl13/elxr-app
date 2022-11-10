import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import PageSongs from '@components/main/pages/PageSongs'
import React from 'react'

function SongsPage() {
    return (
        <MainLayout
          sidebar={<MainSidebar />}
          title="Songs"
        >
          <PageSongs/>
        </MainLayout>
      )
  
}

export default SongsPage