import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import PageCourses from '@components/main/pages/PageCourses'
import Head from 'next/head'
import React from 'react'

function CoursesPage() {
  return (
    <>
      <Head>
        <title>Courses</title>  
      </Head>    
      <MainLayout
        sidebar={<MainSidebar />}
      >
        <PageCourses />
      </MainLayout>
    </>
  )
}

export default CoursesPage