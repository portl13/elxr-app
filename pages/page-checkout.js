import Head from 'next/head'
import React, { useContext, useState, useEffect } from 'react'
import { Table } from 'reactstrap'
import Layout from '../components/layout/Layout'
import { useCart, useCartMutation } from '../context/CartContext'
import axios from 'axios'
import {
  Elements,
  useElements,
  useStripe,
  PaymentElement,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { UserContext } from '../context/UserContext'
import { css } from '@emotion/core'

const siteUrl = process.env.baseUrl;

const baseUrl = siteUrl + '/wp-json/portl/payment/v1/'

const stripePromise = loadStripe('pk_test_mKs8ayC2SBIgxcY4crvr8b36')

const inputCss = css`
  background-color: transparent;
  color: var(--typo);
  border: 1px solid var(--typo);
  &[readonly] {
    background: var(--white-color);
  }
`

const CheckoutForm = () => {
  const elements = useElements()
  const stripe = useStripe()

  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlerSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${siteUrl}/page-checkout`,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
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

const SuccessPayment = () => {
  const stripe = useStripe()
  const [message, setMessage] = useState(null)
  const { clearCart } = useCartMutation()

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
          setMessage('Payment succeeded!')
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
    <>
      {message ? (
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
      ) : (
        ''
      )}
    </>
  )
}

export default function PageCheckOut() {
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const { items, total } = useCart()
  const [clientSecret, setClientSecret] = useState("")

  const [address, setAddress] = useState({
    first_name: '',
    last_name: '',
    company: '',
    address_1: '',
    address_2: '',
    city: '',
    postcode: '',
    country: 'US',
    state: 'OR',
    email: '',
    phone: '',
  })

  const handlerChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    })
  }

  const getPayment = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post(
        baseUrl + 'payment-intent',
        {
          items: items,
          address: address,
        },
        {
          headers: {
            Authorization: 'Bearer ' + user?.token,
          },
        }
      )
      
      setClientSecret(data.data.clientSecret)
    } catch (error) {
      console.log(
        '🚀 ~ file: checkout.js ~ line 17 ~ getPayment ~ error',
        error
      )
    } finally {
      setLoading(false)
    }
  }

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
    <Layout>
      <Head>
        <title>WeShare</title>
      </Head>
      <div className='bg-black bd-radius col-12'>
        <h1 className="text-center mb-5">Checkout</h1>
        <div className="row">
          <div className="col-12 col-md-6">
            <form>
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <label className="d-block" htmlFor="first_name">
                    First name <span className="text-danger">*</span>
                  </label>
                  <input
                    css={inputCss}
                    onChange={handlerChange}
                    value={address.first_name}
                    className="w-100 form-control"
                    type="text"
                    name="first_name"
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label className="d-block" htmlFor="last_name">
                    Last name <span className="text-danger">*</span>
                  </label>
                  <input
                    css={inputCss}
                    onChange={handlerChange}
                    value={address.last_name}
                    className="w-100 form-control"
                    type="text"
                    name="last_name"
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="d-block" htmlFor="company">
                    Company name (optional)
                  </label>
                  <input
                    css={inputCss}
                    onChange={handlerChange}
                    value={address.company}
                    className="w-100 form-control"
                    type="text"
                    name="company"
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="d-block" htmlFor="country">
                    Country / Region <span className="text-danger">*</span>
                  </label>
                  <input
                    css={inputCss}
                    defaultValue="US"
                    readOnly
                    className="w-100 form-control"
                    type="text"
                    name="country"
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="d-block" htmlFor="address_1">
                    Street address <span className="text-danger">*</span>
                  </label>
                  <input
                    css={inputCss}
                    onChange={handlerChange}
                    value={address.address_1}
                    className="w-100 form-control"
                    type="text"
                    name="address_1"
                  />
                </div>
                <div className="col-12 mb-3">
                  <input
                    css={inputCss}
                    onChange={handlerChange}
                    value={address.address_2}
                    className="w-100 form-control"
                    type="text"
                    name="address_2"
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="d-block" htmlFor="city">
                    Town / City <span className="text-danger">*</span>
                  </label>
                  <input
                    css={inputCss}
                    onChange={handlerChange}
                    value={address.city}
                    className="w-100 form-control"
                    type="text"
                    name="city"
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="d-block" htmlFor="state">
                    State <span className="text-danger">*</span>
                  </label>
                  <input
                    css={inputCss}
                    defaultValue="OR"
                    readOnly
                    className="w-100 form-control"
                    type="text"
                    name="state"
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="d-block" htmlFor="postcode">
                    ZIP Code <span className="text-danger">*</span>
                  </label>
                  <input
                    css={inputCss}
                    onChange={handlerChange}
                    value={address.postcode}
                    className="w-100 form-control"
                    type="text"
                    name="postcode"
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="d-block" htmlFor="phone">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    css={inputCss}
                    onChange={handlerChange}
                    value={address.phone}
                    className="w-100 form-control"
                    type="text"
                    name="phone"
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="d-block" htmlFor="email">
                    Email address <span className="text-danger">*</span>
                  </label>
                  <input
                    css={inputCss}
                    onChange={handlerChange}
                    value={address.email}
                    className="w-100 form-control"
                    type="email"
                    name="email"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-12 col-md-6">
            <Table responsive >
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.name} x {item.quantity}
                    </td>
                    <td className="text-right">
                      $ {item.quantity * item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td className="text-right">$ {total}</td>
                </tr>
              </tfoot>
            </Table>
            {clientSecret && (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
              </Elements>
            )}
            <div className="d-flex justify-content-end">
              {!clientSecret && (
                <button
                  onClick={() => getPayment()}
                  className="btn btn-success"
                >
                  {loading ? 'Loading' : 'Place Order'}
                </button>
              )}
            </div>
            <Elements stripe={stripePromise}>
              <SuccessPayment />
            </Elements>
          </div>
        </div>
      </div>
    </Layout>
  )
}
