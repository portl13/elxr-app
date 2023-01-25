import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import PageGalleries from '@components/main/pages/PageGalleries'
import React from 'react'

function galleries() {
  return (
    <MainLayout
      sidebar={<MainSidebar />}
      title="Galleries"
    >
      <PageGalleries />
    </MainLayout>
  )
}

export default galleries