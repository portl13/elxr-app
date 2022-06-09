import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import LayoutAuth from '@components/layout/LayoutAuth'
import Header from '@components/layout/Header'
import { BackLink } from '@components/ui/auth/auth.style'
import { Form, FormGroup, Input, Label } from 'reactstrap'
import { inputLabelStyle } from '@components/profile-edit/biography.style'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getProductDetails, updateSubscription } from '@api/channel.api'
import { UserContext } from '@context/UserContext'
import { useRouter } from 'next/router'

function subscriptionSettings() {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [productID, setProductID] = useState(null)

  const form = useFormik({
    initialValues: {
      name: '',
      regular_price: '',
      short_description: '',
    },
    onSubmit: (values) => submitSubscription(values),
    // validationSchema: Yup.object({
    //   name: Yup.string().required('Email or Username is Required'),
    //   regular_price: Yup.string().required('Email or Username is Required'),
    //   short_description: Yup.string().required('Email or Username is Required')
    //  }),
  })

  const getSubscription = (user) => {
    getProductDetails(user, {
      page: 1,
      per_page: 1,
      status: 'any',
      type: 'subscription',
    })
      .then(({ data }) => {
        if (data.length > 0) {
          let subscription = data[0]
          setProductID(subscription.id)
          form.setFieldValue('name', subscription.name)
          form.setFieldValue('regular_price', subscription.regular_price)
          form.setFieldValue(
            'short_description',
            subscription.short_description
          )
        }
      })
      .catch(() => {
        console.log('error')
      })
      .finally(() => setLoading(false))
  }

  const submitSubscription = (data) => {
    setLoading(true)
    const updateData = {
      ...data,
      regular_price: String(data.regular_price),
      meta_data: [
        {
          key: '_subscription_price',
          value: String(data.regular_price),
        },
      ],
    }
    updateSubscription(user, updateData, productID)
      .then(() => {
        router.push('/my-portal?tab=home&nav=store')
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!user) return
    getSubscription(user)
  }, [user])

  return (
    <LayoutAuth image={true}>
      <Head>
        <title>Subscription Setting</title>
      </Head>
      <Header actionButton={false} />
      <div className="form-section">
        <BackLink>
          <span
            onClick={() => Router.push('/creator-details')}
            className="back"
          >
            {' '}
            Back{' '}
          </span>
        </BackLink>
        <div className="skip-button" onClick={() => Router.push('/')}>
          Skip
        </div>
        <Form onSubmit={form.handleSubmit}>
          <div className="inner-form">
            <h1 className="mb-2">
              <span>Subscription</span> Settings
            </h1>
            <FormGroup>
              <Label for="name" css={inputLabelStyle}>
                Title
              </Label>
              <Input
                type="text"
                name="name"
                value={form.values.name}
                onChange={form.handleChange}
                id="title"
                readOnly={loading}
              />
            </FormGroup>

            <FormGroup>
              <Label for="regular_price" css={inputLabelStyle}>
                Subscription price ($)
              </Label>
              <div className="form-row">
                <Input
                  type="number"
                  name="regular_price"
                  value={form.values.regular_price}
                  onChange={form.handleChange}
                  readOnly={loading}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="short_description" css={inputLabelStyle}>
                Short Description
              </Label>
              <div className="form-row">
                <Input
                  type="textarea"
                  name="short_description"
                  value={form.values.short_description}
                  onChange={form.handleChange}
                  readOnly={loading}
                />
              </div>
            </FormGroup>
          </div>
          <button 
          disabled={loading}
          className="btn btn-primary" 
          type="submit">
            {loading ? 'Loading' : 'Save'}
          </button>
        </Form>
      </div>
    </LayoutAuth>
  )
}

export default subscriptionSettings
