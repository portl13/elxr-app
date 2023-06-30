import React, { useContext, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(process.env.Stripe_Key)
import { Elements } from '@stripe/react-stripe-js'
import WalletTopupPayment from '@components/my-wallet/WalletTopupPayment'
import { getPaymentItentWallet } from '@request/checkout'
import { UserContext } from '@context/UserContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputDashForm from '@components/shared/form/InputDashForm'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '@utils/constant'

function WalletTopup() {
  const alert = useAlert()
  const { user } = useContext(UserContext)
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)

  const formAmount = useFormik({
    initialValues: {
      amount: '',
    },
    onSubmit: (values) => getPaymentItent(values),
    validationSchema: Yup.object({
      amount: Yup.number()
        .min(5, 'The amount must be greater than $5.00')
        .required('Enter an amount'),
    }),
  })

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#e0116d',
      colorBackground: '#ffffff',
      colorText: '#000000',
    },
  }

  const options = {
    clientSecret,
    appearance,
  }

  const getPaymentItent = ({ amount }) => {
    setLoading(true)
    getPaymentItentWallet(user, amount)
      .then(({ data }) => {
        setClientSecret(data.data.clientSecret)
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        const msj = 'your topup could not be processed'
        alert.error(msj, TIMEOUT)
      })
  }

  const getPayment = async () => await formAmount.submitForm()

  return (
    <>
      <div className="w-100">
        <InputDashForm
          label="Enter amount"
          name="amount"
          type={'number'}
          required={true}
          value={formAmount.values.amount}
          onChange={formAmount.handleChange}
          touched={formAmount.touched.amount}
          error={formAmount.errors.amount}
        />
      </div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <WalletTopupPayment />
        </Elements>
      )}
      {!clientSecret && (
        <div className="d-flex justify-content-end">
          <div onClick={() => getPayment()} className="mt-4">
            <button className="btn-create py-1 px-4" disabled={loading}>
              {!loading ? 'Add' : 'Loading'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
export default WalletTopup
