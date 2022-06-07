import React, { useEffect, useState, useContext } from 'react'
import { getAccountDetails } from '@api/account.api'
import { TIMEOUT } from '@utils/constant'
import { UserContext } from '@context/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import { useAlert } from 'react-alert'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  faCheck,
  faTimesCircle,
  faEye,
} from '@fortawesome/free-solid-svg-icons'
import { addAccountDetails, updatePassword } from '@api/account.api'
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import Loader from '@components/loader'
import { woocommerceFieldsStyle } from '@components/my-account/WoocommerceFiels.style'

function AccountDetail() {
  const { user } = useContext(UserContext)
  const alert = useAlert()
  const [first_name, setFirstName] = useState()
  const [last_name, setLastName] = useState()
  const [email, setEmailAddress] = useState()
  const [display_name, setDispalyName] = useState()
  const [emailValid, setEmailValid] = useState()
  const [showLoaders, setShowLoaders] = useState(false)
  const [password_current, setCurrentPassword] = useState()
  const [password_1, setNewPassword] = useState()
  const [password_2, setConfirmPassword] = useState()
  const [visible, setVisibility] = useState(false)
  const [newPassword, showNewpassword] = useState(false)
  const [confirmPassword, showConfirmpassword] = useState(false)

  const updateValue = (data) => {
    setFirstName(data.first_name)
    setLastName(data.last_name)
    setDispalyName(data.display_name)
    setEmailAddress(data.email)
  }

  function AccountDetails() {
    getAccountDetails(user).then((res) => {
      updateValue(res.data.data)
    })
  }

  useEffect(() => {
    AccountDetails()
  }, [])
  const formSchema = Yup.object().shape({
    password_1: Yup.string(),
    //.required("Password is Required")
    //.min(6, "Password is too short - should be 6 chars minimum."),

    password_2: Yup.string()
      // .required("Confirm Password is required")
      .oneOf([Yup.ref('password_1')], 'Passwords do not match'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
  })

  const setUpdateValue = (checkValue) => {
    if (checkError(checkValue)) {
      const formData = {
        first_name,
        last_name,
        display_name,
        email,
      }
      setShowLoaders(true)
      addAccountDetails(user, formData).then((res) => {
        alert.success('Account details changed successfully.', TIMEOUT)
        Router.push('/my-account?tab=dashboard')
        setShowLoaders(false)
      })
    }
  }
  const checkError = () => {
    let checkValue = true
    if (checkValue && !first_name) {
      alert.error('Please add First Name before submit.', TIMEOUT)
      checkValue = false
    }
    if (checkValue && !last_name) {
      alert.error('Please add Last Name before submit.', TIMEOUT)
      checkValue = false
    }

    if (checkValue && !display_name) {
      alert.error('Please add Display Name before submit.', TIMEOUT)
      checkValue = false
    }

    if (checkValue && !email) {
      alert.error('Please add City before submit.', TIMEOUT)
      checkValue = false
    }

    return checkValue
  }

  function validateEmail() {
    var regex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if (regex.test(email)) {
      setEmailValid(true)
      setTimeout(() => setEmailValid(''), [2000])
      return true
    } else {
      setEmailValid(false)
      return false
    }
  }

  const onSubmit = async (data) => {
    const formData = {
      password_current: data.password_current,
      password_1: data.password_1,
      password_2: data.password_2,
    }
    updatePassword(user, formData)
      .then((res) => {
        alert.success('Password changed successfully.', TIMEOUT)
        Router.push('/my-account?tab=dashboard')
      })
      .catch((err) => {
        alert.error(err.response.data.message, TIMEOUT)
      })
  }
  return (
    <section css={woocommerceFieldsStyle}>
      <h3>Account Detail</h3>
      <div className="woocommerce-account-fields">
        <div className="col-md-div-12">
          <div className="col-div-6">
            <label>
              First name <span className="required">*</span>
            </label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="col-div-6">
            <label>
              Last name <span className="required">*</span>
            </label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-div-12">
          <label>
            Display name<span className="required">*</span>
          </label>
          <input
            type="text"
            value={display_name}
            onChange={(e) => setDispalyName(e.target.value)}
          />
          <span className="text-tag">
            This will be how your name will be displayed in the account section
            and in reviews
          </span>
        </div>
        <div className="col-div-12">
          <label>
            Email address<span className="required">*</span>
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmailAddress(e.target.value)
              setEmailValid('')
            }}
            onBlur={() => email !== '' && validateEmail()}
            maxLength="50"
          />
          <div className="email-icon-tag">
            {emailValid === true && <FontAwesomeIcon icon={faCheck} />}
          </div>
          <div className="email-cross-tag">
            {emailValid === false && <FontAwesomeIcon icon={faTimesCircle} />}
          </div>
        </div>
        {emailValid !== false && (
          <button onClick={() => setUpdateValue()}>
            {showLoaders && <Loader />} Save changes
          </button>
        )}

        <div className="password-change-ui">Password change</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-div-12">
            <label>Current password (leave blank to leave unchanged)</label>
            <span className="position-relative">
              <input
                type={visible ? 'text' : 'password'}
                name="password_current"
                value={password_current}
                placeholder="Enter current password"
                onChange={(e) => setCurrentPassword(e.target.value)}
                {...register('password_current')}
              />
              <span
                className="eye-icon"
                onClick={() => setVisibility((prevState) => !prevState)}
              >
                <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} />
              </span>
            </span>
          </div>

          <div className="col-div-12">
            <label>New password (leave blank to leave unchanged)</label>
            <span className="position-relative">
              <input
                type={newPassword ? 'text' : 'password'}
                name="password_1"
                placeholder="Enter new password"
                value={password_1}
                onChange={(e) => setNewPassword(e.target.value)}
                {...register('password_1')}
              />
              <span
                className="eye-icon"
                onClick={() => showNewpassword((prevState) => !prevState)}
              >
                <FontAwesomeIcon icon={newPassword ? faEyeSlash : faEye} />
              </span>
            </span>
            <p className="alerts">{errors.password_1?.message}</p>
          </div>
          <div className="col-div-12">
            <label>Confirm new password</label>
            <span className="position-relative">
              <input
                type={confirmPassword ? 'text' : 'password'}
                name="password_2"
                placeholder="Enter confirm new password"
                value={password_2}
                onChange={(e) => setConfirmPassword(e.target.value)}
                {...register('password_2')}
              />
              <span
                className="eye-icon"
                onClick={() => showConfirmpassword((prevState) => !prevState)}
              >
                <FontAwesomeIcon icon={confirmPassword ? faEyeSlash : faEye} />
              </span>
            </span>
            <p className="alerts">{errors.password_2?.message}</p>
          </div>
          <div className="change-password">
            <button type="submit">Change Password</button>
          </div>
        </form>
      </div>
    </section>
  )
}
export default AccountDetail
