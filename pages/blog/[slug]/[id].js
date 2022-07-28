import BlogDetail from '@components/main/details/BlogDetail'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import Head from 'next/head'
import React from 'react'

function PageBlogDetail({ id }) {
  return (
    <>
      <Head>
        <title>Blog Detail</title>
      </Head>
      <MainLayout sidebar={<MainSidebar />}>
        <BlogDetail id={id} />
      </MainLayout>
    </>
  )
}

export default PageBlogDetail

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { id },
  }
}
