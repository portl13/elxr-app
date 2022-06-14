import { useCart, useCartMutation } from '@context/CartContext'
import { css } from '@emotion/core'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStripe } from '@stripe/react-stripe-js'
import React, { useState, useEffect } from 'react'

const successStyle = css`
  padding-top: 200px;
  .check-order {
    width: 20px;
    color: #1cd991;
    svg {
      width: 20px;
    }
  }
`

const CheckOutSuccess = () => {
  const stripe = useStripe()
  const [message, setMessage] = useState(null)
  const { clearCart } = useCartMutation()
  const [success, setSuccess] = useState(false)
  const [items, setItems] = useState([])
  const [total, setTotal] = useState()

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          clearCart()
          setSuccess(true)
          break
        case 'processing':
          setMessage('Your payment is processing.')
          break
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.')
          break
        default:
          setMessage('Something went wrong.')
          break
      }
    })
  }, [stripe])

  return (
    <div css={successStyle}>
      {message && (
        <div
          css={css`
            margin-top: 15px;
            background-color: blue;
            padding: 1rem;
            text-align: center;
            border-radius: 5px;
            color: var(--white-color);
          `}
          id="payment-message"
        >
          {message}
        </div>
      )}
      {success && (
        <>
          <div className="container">
            <div className="text-center">
              <h4>
                {' '}
                <span className="check-order">
                  <FontAwesomeIcon icon={faCheckCircle} />{' '}
                </span>{' '}
                Your Order Confirmed
              </h4>
              <p>Thank you. Your order has been received.</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CheckOutSuccess
