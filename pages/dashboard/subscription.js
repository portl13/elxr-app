import React from 'react'
import DashBoard from '@components/dashboard/DashBoard'
import Subscription from '@components/dashboard/subcription/Subcription'

function SubscriptionPage() {
  return (
    <DashBoard title="Subscription" >
        <Subscription />
    </DashBoard>
  )
}

export default SubscriptionPage