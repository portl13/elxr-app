import React from 'react'
import DashBoard from '@components/dashboard/DashBoard'
import Lessons from '@components/dashboard/lessons/Lessons'

function LessonsPage() {
  return (
    <DashBoard title="Lessons">
      <Lessons />
    </DashBoard>
  )
}

export default LessonsPage
