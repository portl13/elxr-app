import React from 'react'
import MyPortalMeet from '@components/my-portal/MyPortalMeet'

function SchedulingTab({innerNav}) {
  return (
    <>
        {innerNav === "meetings" && <MyPortalMeet />}
    </>
  )
}

export default SchedulingTab