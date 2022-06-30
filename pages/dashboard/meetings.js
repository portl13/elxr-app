import React from 'react'
import DashBoard from '@components/dashboard/DashBoard'
import Meetings from '@components/dashboard/meetings/Meetings'

function meetings() {
  return (
    <DashBoard title={'Meetings'}>
      <Meetings />
    </DashBoard>
  )
}

export default meetings
