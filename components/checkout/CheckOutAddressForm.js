import React, { useState, useEffect } from 'react'
import {
  getAdressUser,
  getCountriesWoocommerce,
  getStateWoocommerce,
} from '@request/checkout'
import { Form } from 'reactstrap'
import CheckoutInput from '@components/checkout/CheckoutInput'

function CheckOutAddressForm({ address, setAddress, user, addressForm }) {
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cc, setCc] = useState('')

  const handlerChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (user) {
      getAdressUser(user)
        .then(({ data }) => {
          let dataAddress = data.data
          setAddress({ ...address, ...dataAddress })
          addressForm.setValues({ ...dataAddress })
        })
        .catch(({ response }) => {})
    }
  }, [user])

  useEffect(() => {
    if (user) {
      getCountriesWoocommerce(user)
        .then(({ data }) => {
          let countries = getCountriesAndStatesFilter(data.data)
          setCountries(countries)
        })
        .catch((error) => {
          console.log(
            '🚀 ~ file: CheckOutAddressForm.js ~ line 42 ~ useEffect ~ response',
            error
          )
        })
    }
  }, [user])

  useEffect(() => {
    if (address?.country) {
      setCc(address?.country)
    }
  }, [address])

  useEffect(() => {
    if (cc) {
      getStateWoocommerce(user, cc)
        .then(({ data }) => {
          let states = getCountriesAndStatesFilter(data.data)
          setStates(states)
        })
        .catch((error) => console.log(error))
    }
  }, [cc])

  const getCountriesAndStatesFilter = (data) => {
    return Object.entries(data).map((item) => ({
      value: item[0],
      label: item[1],
    }))
  }

  const handlerOptionCountry = ({ value }) => {
    setCc(value)
    addressForm.setFieldValue('country', value)
    addressForm.setFieldValue('state', '')
    setAddress({ ...address, country: value })
  }

  const handlerOptionState = ({ value }) => {
    addressForm.setFieldValue('state', value)
    setAddress({ ...address, state: value })
  }

  const defaultCountry = (countries) => {
    if (!countries) {
      return ''
    }
    let country = countries.filter((item) => item.value === address.country)

    return country[0]
  }

  const defaultState = (states) => {
    if (!states) {
      return ''
    }
    let state = states.filter((item) => item.value === address.state)

    return state[0]
  }

  return (
    <Form>
      <div className="row">
        <h3 className="title-page col-12">Billing details</h3>
        <CheckoutInput
          label="First name"
          isRequired={true}
          className="col-12 col-md-6 mb-3"
          value={addressForm.values.first_name}
          handlerChange={addressForm.handleChange}
          isValid={!addressForm.errors.first_name}
          messageError={addressForm.errors.first_name}
          name="first_name"
        />

        <CheckoutInput
          label="Last name"
          isRequired={true}
          className="col-12 col-md-6 mb-3"
          value={addressForm.values.last_name}
          handlerChange={addressForm.handleChange}
          isValid={!addressForm.errors.last_name}
          messageError={addressForm.errors.last_name}
          name="last_name"
        />

        <CheckoutInput
          label="Company name (optional)"
          isRequired={false}
          className="col-12 mb-3"
          value={addressForm.values.company}
          handlerChange={addressForm.handleChange}
          name="company"
        />

        <CheckoutInput
          label="Country / Region"
          isRequired={true}
          className="col-12 mb-3"
          value={countries && address.country && defaultCountry(countries)}
          handlerChange={handlerOptionCountry}
          options={countries}
          isValid={!addressForm.errors.country}
          messageError={addressForm.errors.country}
          type="select"
        />

        <CheckoutInput
          label="Street address"
          isRequired={true}
          className="col-12 mb-3"
          value={addressForm.values.address_1}
          handlerChange={addressForm.handleChange}
          isValid={!addressForm.errors.address_1}
          messageError={addressForm.errors.address_1}
          name="address_1"
        />

        <CheckoutInput
          isLabel={false}
          isRequired={false}
          className="col-12 mb-3"
          value={addressForm.values.address_2}
          handlerChange={addressForm.handleChange}
          name="address_2"
        />

        <CheckoutInput
          label="Town / City"
          isRequired={true}
          className="col-12 mb-3"
          value={addressForm.values.city}
          handlerChange={addressForm.handleChange}
          isValid={!addressForm.errors.city}
          messageError={addressForm.errors.city}
          name="city"
        />

        <CheckoutInput
          label="State"
          isRequired={true}
          className="col-12 mb-3"
          value={states && address.state && defaultState(states)}
          handlerChange={handlerOptionState}
          options={states}
          isValid={!addressForm.errors.state}
          messageError={addressForm.errors.state}
          name="state"
          type="select"
        />

        <CheckoutInput
          label="ZIP Code"
          isRequired={true}
          className="col-12 mb-3"
          value={addressForm.values.postcode}
          handlerChange={addressForm.handleChange}
          isValid={!addressForm.errors.postcode}
          messageError={addressForm.errors.postcode}
          name="postcode"
        />

        <CheckoutInput
          label="Phone"
          isRequired={true}
          className="col-12 mb-3"
          value={addressForm.values.phone}
          handlerChange={addressForm.handleChange}
          isValid={!addressForm.errors.phone}
          messageError={addressForm.errors.phone}
          name="phone"
        />

        <CheckoutInput
          label="Email address"
          isRequired={true}
          className="col-12 mb-3"
          value={addressForm.values.email}
          handlerChange={addressForm.handleChange}
          isValid={!addressForm.errors.email}
          messageError={addressForm.errors.email}
          name="email"
          type="email"
        />
      </div>
    </Form>
  )
}

export default CheckOutAddressForm
