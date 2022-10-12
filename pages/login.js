import { useState, useContext, useEffect } from 'react'

import { Form, FormGroup, Alert } from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Link from 'next/link'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import LayoutAuth from '@components/layout/LayoutAuth'
import {
  AnchorCaption,
  DivCaption,
  LoginContainer,
} from '@components/ui/auth/auth.style'
import BlockUi, { containerBlockUi } from '@components/ui/blockui/BlockUi'
import Axios from 'axios'

import { UserContext } from '@context/UserContext'
import InputDashForm from "@components/shared/form/InputDashForm";

export default function Login() {
  const { setUser } = useContext(UserContext)

  const [newUser, setNewUser] = useState(null)
  const [showMsg, setShowMsg] = useState(false)

  const { query } = useRouter()

  const { changePasswordSuccess = null } = query

  const [blocking, setBlocking] = useState(false)
  const [error, setError] = useState(false)

  const signIn = async ({ email, password }) => {
    setNewUser({ email, password })
    setError(false)
    setBlocking(true)
    try {
      const url = process.env.baseUrl + '/wp-json/jwt-auth/v1/token'
      const profile = process.env.bossApi + '/members/'
      const { data } = await Axios.post(url, { username: email, password })
      const respuesta = await Axios.get(profile + data.data.id, {
        headers: {
          Authorization: `Bearer ${data.data.token}`,
        },
      })
      const getColorRequest = await Axios.get(
        `${process.env.baseUrl}/wp-json/portl/v1/user/color/`,
        {
          headers: {
            Authorization: `Bearer ${data.data.token}`,
          },
        }
      )
      if (data.success && data.code === 'jwt_auth_valid_credential') {
        const userData = Object.assign(data.data, respuesta.data, {
          color: getColorRequest.data.data,
        })

        setUser(userData)
        setNewUser(null)
        if (query?.next) {
          Router.push(`/${query?.next}`)
          return
        }

        if (userData?.roles.includes('wcfm_vendor')) {
          Router.push('/studio')
          return
        }

        Router.push('/')
      } else if (!data.success && data.code === 'invalid_email') {
        setError(data.message)
        setBlocking(false)
      } else if (!data.success && data.code === 'incorrect_password') {
        setError(
          `The email or password you entered is incorrect. Lost your password?`
        )
        setBlocking(false)
      } else {
        setError('we have technical problems, reload your browser')
        setBlocking(false)
      }
    } catch (e) {
      if (e.response) {
        const { data } = e.response

        if (data?.code === 'bp_account_not_activated') {
          setError('bp_account_not_activated')
          setBlocking(false)
          return
        }

        if (!data.success && data.code === 'incorrect_password') {
          setError(
            `The email or password you entered is incorrect. Lost your password?`
          )
          setBlocking(false)
          return
        }
        if (!data.success && data.code === 'invalid_email') {
          setError(
            `The email or password you entered is incorrect. Lost your password?`
          )
          setBlocking(false)
          return
        }

        if (data?.code === 'jwt_auth_obsolete_token') {
          signIn(newUser)
          return
        }
      }
      setError(
        'The email or password you entered is incorrect. Lost your password?'
      )
      setBlocking(false)
    }
  }

  const resendEmailVerification = async (e) => {
    e.preventDefault()
    setBlocking(true)
    try {
      const { data } = await Axios.post(
        `${process.env.baseUrl}/wp-json/portl/v1/auth/sent-email-verify/`,
        { user_email: newUser.email }
      )

      setError(data.message)
      setBlocking(false)
    } catch (error) {
      setBlocking(false)
    }
  }

  useEffect(() => {
    setBlocking(false)
  }, [])

  useEffect(() => {
    if (changePasswordSuccess === '') {
      setShowMsg(true)
    }
  }, [changePasswordSuccess])

  const login = useFormik({
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

  return (
    <LoginContainer>
      <LayoutAuth>
        <Head>
          <title>PORTL | Login</title>
        </Head>
        <Form css={containerBlockUi} onSubmit={login.handleSubmit}>
          {blocking && <BlockUi color="var(--primary)" />}

          {/*{login.errors.email && login.touched.email ? (*/}
          {/*  <Alert color="warning">{login.errors.email}</Alert>*/}
          {/*) : null}*/}
          {/*{login.errors.password && login.touched.password ? (*/}
          {/*  <Alert color="warning">{login.errors.password}</Alert>*/}
          {/*) : null}*/}

          {showMsg && (
            <Alert color="success">
              Your password has been successfully reset.
            </Alert>
          )}

          {error === 'bp_account_not_activated' && (
            <Alert color="warning">
              "ERROR: Your account has not been activated. Check your email for
              the activation link. If you have not received an email yet, click{' '}
              <a href="#" onClick={(e) => resendEmailVerification(e)}>
                here
              </a>
              to resend it."
            </Alert>
          )}

          {error && error !== 'bp_account_not_activated' && (
            <Alert color="warning">{error}</Alert>
          )}

          <FormGroup>
            <div className="mb-3">
              <InputDashForm
                required={true}
                name="email"
                type="email"
                label="Email or Username"
                value={login.values.email}
                error={login.errors.email}
                touched={login.touched.email}
                onChange={login.handleChange}
              />
            </div>
            <div className="mb-3">
              <InputDashForm
                required={true}
                name="password"
                type="password"
                label="Password"
                value={login.values.password}
                error={login.errors.password}
                touched={login.touched.password}
                onChange={login.handleChange}
              />
            </div>
            {/*<Input*/}
            {/*  css={topInputStyle}*/}
            {/*  id="email"*/}
            {/*  placeholder="email or username"*/}
            {/*  type="text"*/}
            {/*  name="email"*/}
            {/*  onChange={login.handleChange}*/}
            {/*  value={login.values.email}*/}
            {/*/>*/}
            {/*<Input*/}
            {/*  css={bottomInputStyle}*/}
            {/*  id="password"*/}
            {/*  placeholder="Password"*/}
            {/*  type="password"*/}
            {/*  name="password"*/}
            {/*  onChange={login.handleChange}*/}
            {/*  value={login.values.password}*/}
            {/*/>*/}


          </FormGroup>
          <input
            className="btn btn-block btn-primary"
            value="Sign In"
            type="submit"
          />
          <FormGroup className="d-flex justify-content-between mt-2">
            <a className="link-login" href="/forgot-password">
              Forgot Password
            </a>
            <Link href="/">
              <a className="link-login">Continue as Guest</a>
            </Link>
          </FormGroup>
        </Form>
        <DivCaption className="mt-4">
          <span>Not a Member Yet?</span>
        </DivCaption>
        <AnchorCaption>
          <Link href="/signup">
            <a>Sign Up Now</a>
          </Link>
        </AnchorCaption>
      </LayoutAuth>
    </LoginContainer>
  )
}
