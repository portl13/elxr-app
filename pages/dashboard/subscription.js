import React from 'react'
import DashBoard from '@components/dashboard/DashBoard'
import Subscription from '@components/dashboard/subcription/Subcription'

function SubcriptionPage() {
  return (
    <DashBoard title="Subscription" >
        <Subcription />
    </DashBoard>
  )
}

export default SubcriptionPage