import React from 'react'
import MyPurchasesLayout from '@components/my-purchases/MyPurchasesLayout'
import Head from 'next/head'
import MySubscriptions from '@components/my-purchases/subscriptions/MySubscriptions'

function PageSubscriptions() {
  return (
    <>
      <Head>
        <title>My Subscriptions</title>
      </Head>
      <MyPurchasesLayout>
        <div className="main-container-tag bg-black bd-radius">
          <div className="wcfm-collapse bsdatasection w-100">
            <MySubscriptions />
          </div>
        </div>
      </MyPurchasesLayout>
    </>
  )
}

export default PageSubscriptions
