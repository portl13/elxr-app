import React from 'react'
import Head from 'next/head'
import Layout from '@components/layout/Layout'
import Card from '@components/cart/Cart'
export default function Cart() {

  return (
    <Layout>
      <Head>Cart</Head>
      <Card />
    </Layout>
  )
}
