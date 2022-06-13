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
  const msg = 'Your password has been successfully reset.'
  const router = useRouter()
  const { query } = router

  const [formData, setFormData] = useState({
    pass1: '',
    pass2: '',
  })
  const [pass1, setPass1] = useState(false)
  const [pass2, setPass2] = useState(false)
  const [blocking, setBlocking] = useState(false)
  const [error, setError] = useState('')

  const handlerOnSubmit = (e) => {
    e.preventDefault()

    if (!query?.key || !query?.login) {
      setError('Invalid Key')
      return
    }

    setBlocking(true)

    const data = {
      pass1: formData.pass1,
      pass2: formData.pass2,
      //reset_key: query?.key,
      //user_login: query?.login,
    }

    resetPassword(data)
      .then(() => {
        setBlocking(false)
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

  const handlerOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
          <title>WeShare | Reset Password</title>
        </Head>

        <Form css={containerBlockUi} onSubmit={handlerOnSubmit}>
          {blocking && <BlockUi color="#eb1e79" />}
          <h5 className="mb-4">Please enter a new password.</h5>
          {error && <Alert color="danger">{error}</Alert>}
          <FormGroup className="password-reset-input">
            <Input
              css={topInputStyle}
              id="pass1"
              placeholder="New password"
              type={!pass1 ? 'password' : 'text'}
              name="pass1"
              value={formData.pass1}
              onChange={handlerOnChange}
              required
            />
            <EyeIconPassword
              onClick={() => setPass1(!pass1)}
              isVisible={pass1}
            />
          </FormGroup>
          <FormGroup className="password-reset-input">
            <Input
              css={topInputStyle}
              id="pass2"
              placeholder="Re-enter your new password"
              type={!pass2 ? 'password' : 'text'}
              name="pass2"
              value={formData.pass2}
              onChange={handlerOnChange}
              required
            />
            <EyeIconPassword
              onClick={() => setPass2(!pass2)}
              isVisible={pass2}
            />
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
