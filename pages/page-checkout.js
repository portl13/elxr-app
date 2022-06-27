import Head from 'next/head'
import React, { useContext, useState } from 'react'
import Layout from '@components/layout/Layout'
import { useCart, useCartMutation } from '@context/CartContext'
import { loadStripe } from '@stripe/stripe-js'
import { UserContext } from '@context/UserContext'
import CheckOutAddressForm from '@components/checkout/CheckOutAddressForm'
import CheckOutPaymentForm from '@components/checkout/CheckOutPaymentForm'
import { getPaymentItent, setAdressUser } from '@request/checkout'
import { css } from '@emotion/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const stripePromise = loadStripe(process.env.Stripe_Key)

const checkOutStyle = css`
  .title-page {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 700;
    width: 100%;
  }
`

export default function PageCheckOut() {
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const { items, total } = useCart()
  const { removeProduct } = useCartMutation()
  const [clientSecret, setClientSecret] = useState('')

  const addressForm = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      postcode: '',
      country: '',
      state: '',
      email: '',
      phone: '',
    },
    onSubmit: async (values) => {
      setLoading(true)
      try {
        await setAdressUser(user, values)
        const { data } = await getPaymentItent(user, items, values)
        setClientSecret(data.data.clientSecret)
      } catch (error) {

      } finally {
        setLoading(false)
      }
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('first name is a required field'),
      last_name: Yup.string().required('last name is a required field'),
      address_1: Yup.string().required('street address is a required field'),
      city: Yup.string().required(),
      postcode: Yup.string().required('ZIP code is a required field'),
      country: Yup.string().required(),
      state: Yup.string().required(),
      email: Yup.string().required('email address is a required field'),
      phone: Yup.string().required(),
    }),
  })

  const [address, setAddress] = useState({
    first_name: '',
    last_name: '',
    company: '',
    address_1: '',
    address_2: '',
    city: '',
    postcode: '',
    country: '',
    state: '',
    email: '',
    phone: '',
  })

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

  const getPayment = async () => await addressForm.submitForm()

  return (
    <Layout>
      <Head>
        <title>WeShare</title>
      </Head>
      <div css={checkOutStyle} className="bg-black bd-radius col-12">
        <div className="row">
          <div className="col-12 col-md-6">
            <CheckOutAddressForm
              address={address}
              user={user}
              setAddress={setAddress}
              addressForm={addressForm}
            />
          </div>
          <div className="col-12 col-md-6">
            <CheckOutPaymentForm
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              items={items}
              total={total}
              options={options}
              removeProduct={removeProduct}
            />
            <div className="d-flex justify-content-end mt-3">
              {!clientSecret && (
                <button
                  onClick={() => getPayment()}
                  className="btn btn-primary radius-25"
                >
                  {loading ? 'Loading' : 'Place Order'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
