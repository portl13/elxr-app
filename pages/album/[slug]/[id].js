import AlbumDetail from '@components/album/AlbumDetail'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'

import React from 'react'

function PageAlbumDetail({ id }) {
  return (
    <>
      <MainLayout title='Album Detail' sidebar={<MainSidebar />}>
        <AlbumDetail id={id} />
      </MainLayout>
    </>
  )
}

export default PageAlbumDetail

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { id },
  }
}