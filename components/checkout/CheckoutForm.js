import React, { useState } from 'react'
import { useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js'

const nextUrl = process.env.nextSite

const CheckoutForm = () => {
  const elements = useElements()
  const stripe = useStripe()

  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlerSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${nextUrl}/order-received`,
      },
    })

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occured.')
    }

    setIsLoading(false)
  }

  return (
    <form id="payment-form" onSubmit={handlerSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        className="btn btn-primary w-100 mt-4"
      >
        {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
      </button>

      {message && (
        <div
          css={css`
            margin-top: 15px;
            background-color: blue;
            padding: 1rem;
            text-align: center;
            border-radius: 5px;
          `}
          id="payment-message"
        >
          {message}
        </div>
      )}
    </form>
  )
}

export default CheckoutForm
