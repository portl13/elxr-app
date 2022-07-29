import React from 'react'
import Head from 'next/head'
import MyPurchasesLayout from '@components/my-purchases/MyPurchasesLayout'

import Ordersdetails from '@components/my-purchases/orders/OrdersDetails'

function OrderDetail({ id }) {
  return (
    <>
      <Head>
        <title>Order Detail</title>
      </Head>
      <MyPurchasesLayout>
        <div className="main-container-tag bg-black bd-radius">
          <div className="wcfm-collapse bsdatasection w-100">
            <Ordersdetails id={id} />
          </div>
        </div>
      </MyPurchasesLayout>
    </>
  )
}

export default OrderDetail

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { id },
  }
}
