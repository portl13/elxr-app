import React from 'react'
import DashBoard from '@components/dashboard/DashBoard'
import Courses from '@components/dashboard/courses/Courses'
import CoursesList from '@components/dashboard/courses/CoursesList'

function CoursesPage() {
  return (
    <DashBoard title='courses'>
      <CoursesList />
    </DashBoard>
  )
}

export default CoursesPage