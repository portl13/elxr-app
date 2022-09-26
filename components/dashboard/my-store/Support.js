import React, { useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import useSWRImmutable from 'swr/immutable'
import InputDashForm from '@components/shared/form/InputDashForm'
import { useAlert } from 'react-alert'
import { UserContext } from '@context/UserContext'
import { getCountries, getStates, getStoreSupport } from '@request/dashboard'
import { updateCustSupport } from '@api/channel-store.api'
import { TIMEOUT } from '@utils/constant'
const baseUrl = process.env.apiURl
const wcfmApiURl1 = process.env.baseUrl + '/wp-json/portl/v1/'
const url = `${wcfmApiURl1}channel/customer-support?user_id=`
const urlCountry = `${baseUrl}/woocommerce/countries`
const urlState = `${baseUrl}/woocommerce/states?cc=`

function Support() {
  const alert = useAlert()
  const { user } = useContext(UserContext)
  const [cc, setCc] = useState(null)
  const [loading, setLoading] = useState(false)
  const token = user?.token
  const id = user?.id

  const { data: storeSupport } = useSWRImmutable(
    token && id ? [`${url}${id}`, token] : null,
    getStoreSupport
  )

  const { data: countriesData } = useSWRImmutable(
    token && id ? [`${urlCountry}`, token] : null,
    getCountries
  )

  const { data: statesData } = useSWRImmutable(
    token && id && cc ? [`${urlState}${cc}`, token] : null,
    getStates
  )

  const form = useFormik({
    initialValues: {
      phone: '',
      email: '',
      address1: '',
      address2: '',
      country: '',
      state: '',
      city: '',
      zip: '',
    },
    onSubmit: (values) => updateCustomerSupport(values),
    validationSchema: Yup.object({
      address1: Yup.string().required('street address is a required field'),
      city: Yup.string().required('city is a required'),
      zip: Yup.string().required('ZIP code is a required field'),
      country: Yup.string().required(),
      state: Yup.string().required(),
      email: Yup.string().required('email address is a required field'),
      phone: Yup.string().required('phone number is a required field'),
    }),
  })

  const updateCustomerSupport = (values) => {
    setLoading(true)
    const { address1, address2, city, email, phone, zip, state, country } =
      values
    const formData = {
      data: {
        customer_support: {
          address1,
          address2,
          city,
          email,
          phone,
          zip,
          state,
          country,
        },
      },
      user_id: user.id,
    }
    updateCustSupport(user, formData)
      .then(() => {
        alert.success('Customer Support updated successfully.', TIMEOUT)
      })
      .catch(() => {})
      .finally(()=> setLoading(false))
  }

  useEffect(() => {
    if (!storeSupport) return
    setCc(storeSupport?.country)
    form.setValues(storeSupport)
  }, [storeSupport])

  const getCountriesAndStatesFilter = (data) => {
    return Object.entries(data).map((item) => ({
      value: item[0],
      label: item[1],
    }))
  }

  const defaultSelect = (values, value) => {
    if (!values) {
      return ''
    }
    let result = values.filter((item) => item.value === value)

    return result[0]
  }

  const handlerOptionCountry = ({ value }) => {
    setCc(value)
    form.setFieldValue('country', value)
    form.setFieldValue('state', '')
  }

  const handlerOptionState = ({ value }) => {
    form.setFieldValue('state', value)
  }

  return (
    <div className="support">
        <form className="" onSubmit={form.handleSubmit}>
          <div className="px-0 px-md-1 col-12 col-md-6 mb-3">
            <InputDashForm
              type={'text'}
              name={'phone'}
              label={'Phone'}
              value={form.values.phone}
              onChange={form.handleChange}
              touched={form.touched.phone}
              error={form.errors.phone}
              required={true}
            />
          </div>
          <div className="px-0 px-md-1 col-12 col-md-6 mb-3">
            <InputDashForm
              type={'email'}
              name={'email'}
              label={'Email'}
              value={form.values.email}
              onChange={form.handleChange}
              touched={form.touched.email}
              error={form.errors.email}
              required={true}
            />
          </div>
          <div className="px-0 px-md-1 col-12 col-md-6 mb-3">
            <InputDashForm
              type={'text'}
              name={'address1'}
              label={'Address 1'}
              value={form.values.address1}
              onChange={form.handleChange}
              touched={form.touched.address1}
              error={form.errors.address1}
              required={true}
            />
          </div>
          <div className="px-0 px-md-1 col-12 col-md-6 mb-3">
            <InputDashForm
              type={'text'}
              name={'address2'}
              label={'Address 2'}
              value={form.values.address2}
              onChange={form.handleChange}
              touched={form.touched.address2}
              error={form.errors.address2}
            />
          </div>
          <div className="px-0 px-md-1 col-12 col-md-6 mb-3">
            <InputDashForm
              type={'select'}
              name={'country'}
              label={'Country'}
              required={true}
              touched={form.touched.country}
              error={form.errors.country}
              value={
                countriesData &&
                defaultSelect(
                  getCountriesAndStatesFilter(countriesData),
                  form.values.country
                )
              }
              options={
                countriesData && getCountriesAndStatesFilter(countriesData)
              }
              onChange={handlerOptionCountry}
            />
          </div>
          <div className="px-0 px-md-1 col-12 col-md-6 mb-3">
            <InputDashForm
              type={'select'}
              name={'state'}
              label={'State'}
              required={true}
              touched={form.touched.state}
              error={form.errors.state}
              value={
                statesData &&
                defaultSelect(
                  getCountriesAndStatesFilter(statesData),
                  form.values.state
                )
              }
              options={statesData && getCountriesAndStatesFilter(statesData)}
              onChange={handlerOptionState}
            />
          </div>
          <div className="px-0 px-md-1 col-12 col-md-6 mb-3">
            <InputDashForm
              type={'text'}
              name={'city'}
              label={'City/Town'}
              value={form.values.city}
              onChange={form.handleChange}
              touched={form.touched.city}
              error={form.errors.city}
              required={true}
            />
          </div>
          <div className="px-0 px-md-1 col-12 col-md-6 mb-3">
            <InputDashForm
              type={'text'}
              name={'zip'}
              label={'City/Town'}
              value={form.values.zip}
              onChange={form.handleChange}
              touched={form.touched.zip}
              error={form.errors.zip}
              required={true}
            />
          </div>
          <div className="d-flex justify-content-center justify-content-md-end mt-4 w-100">
            <button type="submit" className="btn btn-create px-5">
              {!loading ? 'Save' : 'Saving...'}
            </button>
          </div>
        </form>
    </div>
  )
}

export default Support
