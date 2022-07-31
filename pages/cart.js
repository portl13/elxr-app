import React from 'react'
import Head from 'next/head'
import Card from '@components/cart/Cart'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
export default function Cart() {
  return (
    <MainLayout sidebar={<MainSidebar />}>
      <Head>Cart</Head>
      <Card />
    </MainLayout>
  )
}
