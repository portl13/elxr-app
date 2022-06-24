import DashBoard from '@components/dashboard/DashBoard'
import Orders from '@components/dashboard/orders/Orders'
import React from 'react'

function OrdersPage() {
  return (
    <DashBoard title='orders & payments'>   
        <Orders />
    </DashBoard>
  )
}

export default OrdersPage