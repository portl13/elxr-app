import React from 'react'
import MyPurchasesLayout from '@components/my-purchases/MyPurchasesLayout'
import Head from 'next/head'
import MyOrders from '@components/my-purchases/orders/MyOrders'

function Pageorders() {
  return (
    <>
      <Head>
        <title>My Orders</title>
      </Head>
      <MyPurchasesLayout>
        <MyOrders />
      </MyPurchasesLayout>
    </>
  )
}

export default Pageorders
