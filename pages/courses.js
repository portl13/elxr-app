import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import PageCourses from '@components/main/pages/PageCourses'
import React from 'react'

function CoursesPage() {
  return (
    <> 
      <MainLayout
        title="Courses"
      >
        <PageCourses />
      </MainLayout>
    </>
  )
}

export default CoursesPage