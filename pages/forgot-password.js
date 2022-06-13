import React, { useState, useEffect } from 'react'
import LayoutAuth from '@components/layout/LayoutAuth'
import { LoginContainer, topInputStyle } from '@components/ui/auth/auth.style'
import Head from 'next/head'
import { Alert, Form, FormGroup, Input } from 'reactstrap'
import BlockUi, { containerBlockUi } from '@components/ui/blockui/BlockUi'
import Link from 'next/link'
import { getForgotPassword } from '@request/auth'

function PageForgotPassword() {
  const [blocking, setBlocking] = useState(false)
  const [userLogin, setUserLogin] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const sendForgotPassword = (e) => {
    e.preventDefault()

    setError('')

    if (!sendForgotPassword) {
      setError('field is required')
      return
    }
    setBlocking(true)
    getForgotPassword({
      user_login: userLogin,
    })
      .then(() => {
        setSuccess(true)
      })
      .catch(({ response }) => {
        const errors = response.data.data.errors
        if ('invalid_email' in errors) {
          setError('There is no user registered with that email address.')
        }
        if ('invalidcombo' in errors) {
          setError('Invalid username or email.')
        }
      })
      .finally(() => {
        setBlocking(false)
      })
  }

  useEffect(() => {
    const cleanError = setTimeout(() => {
      setError('')
    }, 5000)

    return () => clearInterval(cleanError)
  }, [error])

  const handlerOnChange = (e) => {
    setUserLogin(e.target.value)
  }

  return (
    <LoginContainer>
      <LayoutAuth>
        <Head>
          <title>WeShare | Forgot password</title>
        </Head>

        <Form css={containerBlockUi} onSubmit={sendForgotPassword}>
          {blocking && <BlockUi color="#eb1e79" />}

          {!success && (
            <>
              <h5>Forgot your password?</h5>
              <p>
                Please enter your email address. You will receive an email with
                instructions on how to reset your password.
              </p>
              {error && <Alert color="danger">{error}</Alert>}
              <FormGroup>
                <Input
                  css={topInputStyle}
                  id="email"
                  placeholder="email or username"
                  type="text"
                  name="email"
                  onChange={handlerOnChange}
                  value={userLogin}
                />
              </FormGroup>
              <input
                className="btn btn-block btn-primary mt-4"
                value="Request reset link"
                type="submit"
              />
            </>
          )}
          {success && (
            <p>
              Check your email for the confirmation link, then visit the login
              page.
            </p>
          )}
        </Form>
        <Link href="/login">
          <a className="text-white mt-4">
            <span>Back to sign in</span>
          </a>
        </Link>
      </LayoutAuth>
    </LoginContainer>
  )
}

export default PageForgotPassword
