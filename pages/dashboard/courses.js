import React from 'react'
import DashBoard from '@components/dashboard/DashBoard'
import Courses from '@components/dashboard/courses/Courses'

function CoursesPage() {
  return (
    <DashBoard title='courses'>
      <Courses />
    </DashBoard>
  )
}

export default CoursesPage