import React from 'react'
import DashBoard from '@components/dashboard/DashBoard'
import Customer from '@components/dashboard/customer/Customer'

function customers() {
  return (
    <DashBoard title="Customers">
      <Customer />
    </DashBoard>
  )
}

export default customers
