import React from 'react'
import DashBoard from '@components/dashboard/DashBoard'
import CoursesList from '@components/dashboard/courses/CoursesList'

function CoursesPage() {
  return (
    <DashBoard title='courses'>
      <CoursesList />
    </DashBoard>
  )
}

export default CoursesPage