import React from 'react'
import Head from 'next/head'
import MyPurchasesLayout from '@components/my-purchases/MyPurchasesLayout'
import MyDownloads from '@components/my-purchases/downloads/MyDownloads'

function PageDonwloads() {
  return (
    <>
      <Head>
        <title>My Downloads</title>
      </Head>
      <MyPurchasesLayout>
        <div className="main-container-tag bg-black bd-radius">
          <div className="wcfm-collapse bsdatasection w-100">
            <MyDownloads />
          </div>
        </div>
      </MyPurchasesLayout>
    </>
  )
}

export default PageDonwloads
