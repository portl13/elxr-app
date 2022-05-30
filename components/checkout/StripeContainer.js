import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './PaymentForm'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise=loadStripe(process.env.Stripe_Key)
const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
        <PaymentForm />
    </Elements>
  )
}

export default StripeContainer