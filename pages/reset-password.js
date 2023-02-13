import React, { useState, useEffect } from 'react'
import LayoutAuth from '@components/layout/LayoutAuth'
import { LoginContainer, topInputStyle } from '@components/ui/auth/auth.style'
import Head from 'next/head'
import { Alert, Form, FormGroup, Input } from 'reactstrap'
import BlockUi, { containerBlockUi } from '@components/ui/blockui/BlockUi'
import { useRouter } from 'next/router'
import { resetPassword } from '@request/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const EyeIconPassword = ({ isVisible, onClick }) => {
  if (isVisible) {
    return (
      <span className="icon-eye" onClick={onClick}>
        <FontAwesomeIcon icon={faEye} />
      </span>
    )
  }

  return (
    <span className="icon-eye" onClick={onClick}>
      <FontAwesomeIcon icon={faEyeSlash} />
    </span>
  )
}

function PageResetPassword() {
  const msg = ''
  const router = useRouter()
  const { query } = router
  const { key = null, login = null } = query

  const [pass1, setPass1] = useState(false)
  const [pass2, setPass2] = useState(false)
  const [blocking, setBlocking] = useState(false)
  const [error, setError] = useState('')

  const formResetForm = useFormik({
    initialValues: {
      pass1: '',
      pass2: '',
    },
    onSubmit: (values) => handlerOnSubmit(values),
    validationSchema: Yup.object({
      pass1: Yup.string().required('new password is a required field'),
      pass2: Yup.string().required('re new password is a required field'),
    }),
  })

  const handlerOnSubmit = ({ pass1, pass2 }) => {
    if (!key || !login) {
      setError('Invalid Key')
      return
    }

    setBlocking(true)

    const data = {
      pass1,
      pass2,
      reset_key: key,
      user_login: login,
    }

    resetPassword(data)
      .then(() => {
        setBlocking(false)
        router.push("/login?changePasswordSuccess")
      })
      .catch(({ response }) => {
        let msg = response.data?.message && null
        setBlocking(false)
        if (msg) {
          setError(msg)
        } else {
          setError('Invalid Key')
        }
      })
  }

  useEffect(() => {
    const cleanError = setTimeout(() => {
      setError('')
    }, 5000)

    return () => clearInterval(cleanError)
  }, [error])

  return (
    <LoginContainer>
      <LayoutAuth>
        <Head>
          <title>elxr | Reset Password</title>
        </Head>

        <Form css={containerBlockUi} onSubmit={formResetForm.handleSubmit}>
          {blocking && <BlockUi color="#eb1e79" />}
          <h5 className="mb-4">Please enter a new password.</h5>
          {error && <Alert color="danger">{error}</Alert>}
          <FormGroup className="password-reset-input mb-3">
            <Input
              css={topInputStyle}
              id="pass1"
              placeholder="New password"
              type={!pass1 ? 'password' : 'text'}
              name="pass1"
              value={formResetForm.values.pass1}
              onChange={formResetForm.handleChange}
              className="mb-0"
            />
            <EyeIconPassword
              onClick={() => setPass1(!pass1)}
              isVisible={pass1}
            />
            {formResetForm.errors.pass1 && (
              <div className="invalid-feedback d-block text-left">
                {formResetForm.errors.pass1}
              </div>
            )}
          </FormGroup>
          <FormGroup className="password-reset-input">
            <Input
              css={topInputStyle}
              id="pass2"
              placeholder="Re-enter your new password"
              type={!pass2 ? 'password' : 'text'}
              name="pass2"
              value={formResetForm.values.pass2}
              onChange={formResetForm.handleChange}
              className="mb-0"
            />
            <EyeIconPassword
              onClick={() => setPass2(!pass2)}
              isVisible={pass2}
            />
            {formResetForm.errors.pass2 && (
              <div className="invalid-feedback d-block text-left">
                {formResetForm.errors.pass2}
              </div>
            )}
          </FormGroup>
          <input
            className="btn btn-block btn-primary mt-4"
            value="Save"
            type="submit"
          />
        </Form>
      </LayoutAuth>
    </LoginContainer>
  )
}

export default PageResetPassword
