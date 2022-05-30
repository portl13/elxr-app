import { useEffect, useState, useContext, useRef } from 'react'
import {
  Alert,
  FormGroup, 
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Router from 'next/router'
import Head from 'next/head'
import Header from '../components/layout/Header'
import LayoutAuth from '../components/layout/LayoutAuth'
import { inputLabelStyle, BackLink } from '../components/ui/auth/auth.style'
import { modalColor } from '../components/livefeed/livefeed.style'
import BlockUi, { containerBlockUi } from '../components/ui/blockui/BlockUi'
import Terms from '../components/register/terms'
import Policy from '../components/register/policy'
import { UserContext } from '../context/UserContext'
import Axios from 'axios'
import { Base64 } from '../helpers/base64'

const registerUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/auth/v1/register`

export default function SingUpPage() {
  const user = useContext(UserContext)
  const isMounted = useRef(true)
  if (user.user !== null) {
    Router.push('/profile-edit?tab=profile-update')
    //Router.push('/signupmsg');
    return false
  }
  const [blocking, setBlocking] = useState(false)

  const [fail, setFail] = useState({
    status: false,
    message: '',
  })

  const [agree, setAgree] = useState(false)
  const [showTermsModal, setTermsShowModal] = useState(false)
  const handleTermsClose = () => setTermsShowModal(false)
  const handleTermsShow = () => setTermsShowModal(true)
  const [showPolicyModal, setPolicyShowModal] = useState(false)
  const handlePolicyClose = () => setPolicyShowModal(false)
  const handlePolicyShow = () => setPolicyShowModal(true)
  const checkboxHandler = () => setAgree(!agree)

  const source = Axios.CancelToken.source()
  const register = async ({ username, email, password }) => {
    setBlocking(true)
    setFail({
      status: false,
      message: '',
    })
    try {
      if (isMounted) {
        const { data } = await Axios.post(
          registerUrl,
          {
            username,
            email,
            password,
          },
          {
            cancelToken: source.token,
          }
        )

        const key = Base64.encode(
          JSON.stringify({
            code: '',
            email,
          })
        )

        Router.push(`verify-code?key=${key}`)
      }
    } catch (e) {
      if (isMounted) {
        if (Axios.isCancel(e)) {
          setBlocking(false)
        } else {
          if (e.response) {
            const { data } = e.response
            setFail({
              status: true,
              message: data.message,
            })
            setBlocking(false)
          }
          setBlocking(false)
        }
      }
    }
  }

  const registerForm = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is Required'),
      username: Yup.string()
        .min(4, 'Username is too short! - should be 4 chars minimum.')
        .required('Username is Required'),
      password: Yup.string()
        .required('Password is Required')
        .min(6, 'Password is too short - should be 6 chars minimum.'),
    }),
    onSubmit: (values) => register(values),
  })

  useEffect(() => {
    return () => {
      isMounted.current = false
      source.cancel()
    }
  }, [])
  return (
    <LayoutAuth image={true}>
      <Head>
        <title>Create an account - WeShare</title>
      </Head>
      <Header actionButton={true} />
      <div className="form-section">
        <BackLink>
          <a href="/" className="back">
            {' '}
            Back{' '}
          </a>
        </BackLink>
        <form css={containerBlockUi} onSubmit={registerForm.handleSubmit}>
          {blocking && <BlockUi color="#eb1e79" />}
          {fail.status && <Alert color="danger"> {fail.message} </Alert>}
          <div className="inner-form">
            {/* <BackLink>
              or <a href="/login">Sign in</a>
            </BackLink> */}
            <h1>Sign Up</h1>
            <FormGroup>
              <Label for="username" css={inputLabelStyle}>
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                onChange={registerForm.handleChange}
                value={registerForm.values.username}
              />
              {registerForm.errors.username && registerForm.touched.username ? (
                <Alert color="danger">{registerForm.errors.username}</Alert>
              ) : null}
            </FormGroup>
            <FormGroup>
              <Label for="email" css={inputLabelStyle}>
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={registerForm.handleChange}
                value={registerForm.values.email}
              />
              {registerForm.errors.email && registerForm.touched.email ? (
                <Alert color="danger">{registerForm.errors.email}</Alert>
              ) : null}
            </FormGroup>
            <FormGroup>
              <Label for="password" css={inputLabelStyle}>
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={registerForm.handleChange}
                value={registerForm.values.password}
              />
              {registerForm.errors.password && registerForm.touched.password ? (
                <Alert color="danger">{registerForm.errors.password}</Alert>
              ) : null}
            </FormGroup>
            <div className="App">
              <div>
                <FormGroup className="mt-2 text-center">
                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      id="agree"
                      onChange={checkboxHandler}
                      className="custom-control-input"
                    />
                    <label
                      htmlFor="agree"
                      className="custom-control-label text-primary bottom-text"
                    >
                      By signing up, you agree to WeShare
                      <br /> <a onClick={handleTermsShow}>
                        Terms of Service
                      </a>{' '}
                      and <a onClick={handlePolicyShow}>Privacy Policy</a>.
                    </label>
                  </div>
                </FormGroup>
              </div>
              <input
                className="btn btn-primary mb-4 submit-button"
                value="Sign Up"
                disabled={!agree}
                type="submit"
              />
            </div>
            <Modal
              className="modal-dialog-centered"
              isOpen={showTermsModal}
              toggle={handleTermsClose}
              css={modalColor}
            >
              <ModalHeader toggle={handleTermsClose}></ModalHeader>
              <ModalBody>
                <Terms />
              </ModalBody>
            </Modal>
            <Modal
              className="modal-dialog-centered"
              isOpen={showPolicyModal}
              toggel={handlePolicyClose}
              css={modalColor}
            >
              <ModalHeader toggle={handlePolicyClose}></ModalHeader>
              <ModalBody>
                <Policy />
              </ModalBody>
            </Modal>
          </div>
        </form>
      </div>
    </LayoutAuth>
  )
}
