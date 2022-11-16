import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckOutSuccess from '@components/checkout/CheckOutSuccess'
import Layout from '@components/layout/Layout'
import Head from 'next/head'
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
const stripePromise = loadStripe(process.env.Stripe_Key)

function PageOrderReceived() {
  const [clientSecret, setClientSecret] = useState('')
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#056fe1',
      colorBackground: '#ffffff',
      colorText: '#000000',
    },
  }

  const options = {
    clientSecret,
    appearance,
  }
  return (
    <MainLayout title={"PORTL"} sidebar={<MainSidebar />}>
      <div  className="bg-black bd-radius col-12">
        <div className="row">
          <div className="col-12">
            <Elements stripe={stripePromise} >
              <CheckOutSuccess />
            </Elements>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default PageOrderReceived
