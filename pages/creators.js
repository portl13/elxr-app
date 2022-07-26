import React from 'react'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import PageCreators from '@components/main/pages/PageCreators'

function CreatorsPage() {
  return (
    <MainLayout sidebar={<MainSidebar />}>
        <PageCreators />
  </MainLayout>
  )
}

export default CreatorsPage