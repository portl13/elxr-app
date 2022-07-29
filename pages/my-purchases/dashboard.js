import React from 'react'
import Head from 'next/head'
import MyPurchasesLayout from '@components/my-purchases/MyPurchasesLayout'
import MyDashBoard from '@components/my-purchases/dashboard/MyDashBoard'

function Pagedashboard() {
  return (
    <>
      <Head>
        <title>My Dashboard</title>
      </Head>
      <MyPurchasesLayout>
        <MyDashBoard />
      </MyPurchasesLayout>
    </>
  )
}

export default Pagedashboard
