import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import SongDetail from '@components/song/SongDetail'
import React from 'react'

function PageSongDetail({ id }) {
  return (
    <>
      <MainLayout title='Song Detail' sidebar={<MainSidebar />}>
        <SongDetail id={id} />
      </MainLayout>
    </>
  )
}

export default PageSongDetail

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { id },
  }
}
