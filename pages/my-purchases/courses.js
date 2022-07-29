import React from 'react'
import Head from 'next/head'
import MyPurchasesLayout from '@components/my-purchases/MyPurchasesLayout'

function PageCourses() {
  return (
    <>
      <Head>
        <title>My Courses</title>
      </Head>
      <MyPurchasesLayout>
        <div>PageCourses</div>
      </MyPurchasesLayout>
    </>
  )
}

export default PageCourses
