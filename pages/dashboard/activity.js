import React from 'react'
import DashBoard from '@components/dashboard/DashBoard'
import Activity from '@components/dashboard/activity'

function ActivityPage() {
  return (
    <DashBoard title="Activity Feeds">
      <Activity />
    </DashBoard>
  )
}

export default ActivityPage