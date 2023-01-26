import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import PageGallery from '@components/main/pages/PageGallery'
import React from 'react'

function Gallery({ id }) {
  return (
    <MainLayout sidebar={<MainSidebar />} title="Gallery">
      <PageGallery id={id} />
    </MainLayout>
  )
}

export default Gallery

export async function getServerSideProps({ query }) {
    const { id } = query;
    return {
      props: { id },
    };
}