import React from 'react'
import Head from 'next/head'
import LayoutAuth from '@components/layout/LayoutAuth'
import Header from '@components/layout/Header'
import { BackLink } from '@components/ui/auth/auth.style'
import { FormGroup, Input, Label } from 'reactstrap'
import { inputLabelStyle } from '@components/profile-edit/biography.style'

import { useFormik } from 'formik'
import * as Yup from 'yup'

function subscriptionSettings() {
  const SubscriptionForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => signIn(values),
    validationSchema: Yup.object({
      email: Yup.string().required('Email or Username is Required'),
      password: Yup.string()
        .required('Password is Required')
        .min(6, 'Password is too short - should be 6 chars minimum.'),
    }),
  })

  const updateSubcription = ''

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
        <form>
          <div className="inner-form">
            <h1 className="mb-2">
              <span>Subscription</span> Settings
            </h1>
            <FormGroup>
              <Label for="name" css={inputLabelStyle}>
                Title
              </Label>
              <Input type="text" name="title" value="" id="title" />
            </FormGroup>

            <FormGroup>
              <Label for="name" css={inputLabelStyle}>
                Subscription price ($)
              </Label>
              <div className="form-row">
                <Input type="number" />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="name" css={inputLabelStyle}>
                Short Description
              </Label>
              <div className="form-row">
                <Input type="textarea" />
              </div>
            </FormGroup>
          </div>
        </form>
      </div>
    </LayoutAuth>
  )
}

export default subscriptionSettings
