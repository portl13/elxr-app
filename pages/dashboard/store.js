import DashBoard from '@components/dashboard/DashBoard'
import MyStore from '@components/dashboard/my-store/MyStore'
import React from 'react'

function MyStorePage() {
  return (
    <DashBoard title='My Store'>
        <MyStore />
    </DashBoard>
  )
}

export default MyStorePage