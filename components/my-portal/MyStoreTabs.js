import React from 'react'
import SubSetting from '@components/my-portal/SubSetting'
import Products from '@components/my-portal/Products'
import Subscriber from '@components/my-portal/Subscriber'
import Orders from '@components/my-portal/Orders'
import Customers from '@components/my-portal/Customers'

function MyStoreTabs(props) {
  const { innerNav } = props
  return (
    <>
      {innerNav === 'edit-subscription' && <SubSetting {...props} />}
      {innerNav === 'product' && <Products {...props} />}
      {innerNav === 'subscriber' && <Subscriber {...props} />}
      {innerNav === 'order' && <Orders {...props} />}
      {innerNav === 'customer' && <Customers {...props} />}
    </>
  )
}

export default MyStoreTabs
