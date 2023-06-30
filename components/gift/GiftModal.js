import { genericFetch } from '@request/dashboard'
import React, { useEffect, useState } from 'react'
import { Modal, ModalBody } from 'reactstrap'
const myBalance = `${process.env.myAccount}/wallet/balance`
import useSWR from 'swr'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Link from 'next/link'

const SpinnerSm = () => {
  return (
    <div className="spinner-border spinner-border-sm" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

function GiftModal({ open, toggle, token, authorName, authorId, user }) {
  const { data, isLoading, mutate } = useSWR(
    token ? [myBalance, token] : null,
    genericFetch
  )

  const [loading, setLoading] = useState(false)

  const formWallet = useFormik({
    initialValues: {
      transfer_user_id: '',
      transfer_amount: 1,
      transfer_note: '',
    },
    onSubmit: (values) => onSubmitTransfer(values),
    validationSchema: Yup.object({
      transfer_amount: Yup.number()
        .min(1, 'The amount must be greater than $1.00')
        .required('Enter an amount'),
    }),
  })

  const onSubmitTransfer = async (values) => {
    const formData = {
      transfer_user_id: parseInt(values?.transfer_user_id),
      transfer_amount: parseFloat(values?.transfer_amount),
      transfer_note: `${
        user?.mention_name
      } has sent you a gift of $${parseFloat(values?.transfer_amount)}`,
    }

    try {
      setLoading(true)
      await axios.post('/api/wallet/transfer', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      await mutate()
      toggle()
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authorId) {
      formWallet.setFieldValue('transfer_user_id', authorId)
    }
  }, [])

  return (
    <Modal centered isOpen={open} toggle={toggle}>
      <ModalBody>
        <section className="text-center gift-modal">
          <h3 className="gift-modal-title mb-4">
            You are sending a gift to{' '}
            <span className="text-primary">{authorName}</span>
          </h3>
          <form onSubmit={formWallet.handleSubmit} className="gift-modal-body">
            <span className="gift-modal-text">Gift Amount:</span>
            <input
              min={1}
              className="gift-modal-input form-control"
              type="number"
              name="transfer_amount"
              value={formWallet.values.transfer_amount}
              onChange={formWallet.handleChange}
            />
            <span>
              <button className="btn gift-modal-button d-flex justify-content-center align-items-center align-content-center">
                {loading ? <SpinnerSm /> : 'Send'}
              </button>
            </span>
          </form>
          <div className="gift-modal-footer mt-4">
            {isLoading ? <SpinnerSm /> : null}
            {Number(data?.data) === 0 ? (
              <>
                You don't have enough balance please{' '}
                <Link href={'/wallet/topup'}>
                  <a className="font-weight-bolder">Add Funds</a>
                </Link>
              </>
            ) : null}
            {Number(data?.data) > 0 ? (
              <>
                Your current Gifting Balance is{' '}
                <span className="text-primary">{data?.data}</span>
              </>
            ) : null}
          </div>
        </section>
      </ModalBody>
    </Modal>
  )
}

export default GiftModal
