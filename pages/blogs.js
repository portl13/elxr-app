import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import PageBlogs from '@components/main/pages/PageBlogs'
import React from 'react'

function blogs() {
  return (
    <MainLayout
      title="Writings"
    >
      <PageBlogs />
    </MainLayout>
  )
}

export default blogs