import React, { useState, useEffect } from "react";
import {
  getAdressUser,
  getCountriesWoocommerce,
  getStateWoocommerce,
} from "@request/checkout";
import { Form } from "reactstrap";
import CheckoutInput from "@components/checkout/CheckoutInput";
import InputDashForm from "@components/shared/form/InputDashForm";

function CheckOutAddressForm({ user, addressForm }) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cc, setCc] = useState("");

  useEffect(() => {
    if (user) {
      getAdressUser(user)
        .then(({ data }) => {
          let dataAddress = data.data;
          addressForm.setValues({ ...dataAddress });
        })
        .catch(({ response }) => {});
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getCountriesWoocommerce(user)
        .then(({ data }) => {
          let countries = getCountriesAndStatesFilter(data.data);
          setCountries(countries);
        })
        .catch((error) => {});
    }
  }, [user]);

  useEffect(() => {
    if (cc) {
      getStateWoocommerce(user, cc)
        .then(({ data }) => {
          let states = getCountriesAndStatesFilter(data.data);
          setStates(states);
        })
        .catch((error) => console.log(error));
    }
  }, [cc]);

  const getCountriesAndStatesFilter = (data) => {
    return Object.entries(data).map((item) => ({
      value: item[0],
      label: item[1],
    }));
  };

  const handlerOptionCountry = ({ value }) => {
    setCc(value);
    addressForm.setFieldValue("country", value);
    addressForm.setFieldValue("state", "");
  };

  const handlerOptionState = ({ value }) => {
    addressForm.setFieldValue("state", value);
  };

  const defaultCountry = (countries) => {
    if (!countries) {
      return "";
    }
    let country = countries.filter(
      (item) => item.value === addressForm?.values?.country
    );
    return country[0];
  };

  const defaultState = (states) => {
    if (!states) {
      return "";
    }
    let state = states.filter(
      (item) => item.value === addressForm?.values?.state
    );
    return state[0];
  };

  return (
    <Form>
      <div className="row">
        <h3 className="title-page col-12">Billing details</h3>
        <div className="col-12 mb-4">
          <InputDashForm
            label="First name"
            name="first_name"
            type={"text"}
            required={true}
            value={addressForm.values.first_name}
            onChange={addressForm.handleChange}
            touched={addressForm.touched.first_name}
            error={addressForm.errors.first_name}
          />
        </div>

        <div className="col-12 mb-4">
          <InputDashForm
            label="Last name"
            required={true}
            type={"text"}
            value={addressForm.values.last_name}
            onChange={addressForm.handleChange}
            touched={addressForm.touched.last_name}
            error={addressForm.errors.last_name}
            name="last_name"
          />
        </div>

        <div className="col-12 mb-4">
          <InputDashForm
            label="Company name (optional)"
            required={false}
            value={addressForm.values.company}
            onChange={addressForm.handleChange}
            name="company"
            type={"text"}
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            label="Country / Region"
            required={true}
            value={countries && defaultCountry(countries)}
            onChange={handlerOptionCountry}
            options={countries}
            touched={addressForm.touched.country}
            error={addressForm.errors.country}
            type="select"
          />
        </div>

        <div className="col-12 mb-2">
          <InputDashForm
            label="Street address"
            required={true}
            value={addressForm.values.address_1}
            onChange={addressForm.handleChange}
            touched={addressForm.touched.address_1}
            error={addressForm.errors.address_1}
            name="address_1"
            type={"text"}
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            required={false}
            value={addressForm.values.address_2}
            onChange={addressForm.handleChange}
            name="address_2"
            type={"text"}
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            label="Town / City"
            required={true}
            value={addressForm.values.city}
            onChange={addressForm.handleChange}
            touched={addressForm.touched.city}
            error={addressForm.errors.city}
            name="city"
          />
        </div>

        <div className="col-12 mb-4">
          <InputDashForm
            label="State"
            required={true}
            value={states && defaultState(states)}
            onChange={handlerOptionState}
            options={states}
            touched={addressForm.touched.state}
            error={addressForm.errors.state}
            name="state"
            type="select"
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            label="ZIP Code"
            required={true}
            value={addressForm.values.postcode}
            onChange={addressForm.handleChange}
            touched={addressForm.touched.postcode}
            error={addressForm.errors.postcode}
            name="postcode"
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            label="Phone"
            required={true}
            value={addressForm.values.phone}
            onChange={addressForm.handleChange}
            touched={addressForm.touched.phone}
            error={addressForm.errors.phone}
            name="phone"
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            label="Email address"
            required={true}
            value={addressForm.values.email}
            onChange={addressForm.handleChange}
            touched={addressForm.touched.email}
            error={addressForm.errors.email}
            name="email"
            type="email"
          />
        </div>
      </div>
    </Form>
  );
}

export default CheckOutAddressForm;
