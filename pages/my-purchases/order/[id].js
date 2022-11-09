import React from 'react'
import Head from 'next/head'
import MyPurchasesLayout from '@components/my-purchases/MyPurchasesLayout'

import Ordersdetails from '@components/my-purchases/orders/OrdersDetails'
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";

function OrderDetail({ id }) {
  return (
    <>
      <MainLayout title={`Order - #${id}`} sidebar={<MainSidebar />}>
          <BackButton />
        <div className="main-container-tag bg-black bd-radius">
          <div className="wcfm-collapse bsdatasection w-100">
            <Ordersdetails id={id} />
          </div>
        </div>
      </MainLayout>
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
