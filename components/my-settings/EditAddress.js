import React, { useEffect, useState, useContext } from "react";
import * as Yup from "yup";

import { setAddress, getAddressData } from "@api/my-account/address.api";

import { TIMEOUT } from "@utils/constant";
import { UserContext } from "@context/UserContext";

import { useAlert } from "react-alert";
import { Country, State } from "country-state-city";
import Router from "next/router";
import { useFormik } from "formik";
import InputDashForm from "@components/shared/form/InputDashForm";
import BlockUi from "@components/ui/blockui/BlockUi";

function EditAddress() {
  const alert = useAlert();
  const { user } = useContext(UserContext);
  const [showLoaders, setShowLoaders] = useState(true);
  const [countryNew, setCountryNew] = useState({});
  const [countryListNew, setCountryListNew] = useState([]);
  const [stateNew, setStateNew] = useState({});
  const [stateListNew, setStateListNew] = useState([]);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      postcode: "",
      country: "",
      state: "",
      email: "",
      phone: "",
    },
    onSubmit: (values) => updateAddress(values),
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name required"),
      last_name: Yup.string().required("Last name required"),
      company: Yup.string(),
      address_1: Yup.string().required("Street address required"),
      address_2: Yup.string(),
      city: Yup.string().required("Town / City required"),
      postcode: Yup.string().required("Postcode / ZIP required"),
      country: Yup.string().required("Country required"),
      state: Yup.string().required("State required"),
      email: Yup.string().email().required("Email required"),
      phone: Yup.string().required("Phone required"),
    }),
  });

  const handlerCountry = (select) => {
    setCountryNew(select);
    formik.setFieldValue("country", select.value);
  };

  const handlerState = (select) => {
    setStateNew(select);
    formik.setFieldValue("state", select.value);
  };

  useEffect(() => {
    const listCountryNew = Country.getAllCountries().map((e) => {
      return { label: e.name, value: e.isoCode };
    });
    setCountryListNew(listCountryNew);
  }, []);

  useEffect(() => {
    if (countryNew) {
      const stateListNew = State.getStatesOfCountry(countryNew.value).map(
        (e) => {
          return { label: e.name, value: e.isoCode };
        }
      );
      setStateListNew(stateListNew);
    }
  }, [countryNew]);

  async function getAddressValue() {
    const { data } = await getAddressData(user);
    const address = data.data;
    setShowLoaders(false);
    await formik.setValues(address);
    const listCountryNew = Country.getAllCountries().filter(
      (e) => e.isoCode === address.country
    );
    setCountryNew({
      value: listCountryNew[0].isoCode,
      label: listCountryNew[0].name,
    });
    if (!listCountryNew) return;
    const stateListNew = State.getStatesOfCountry(
      listCountryNew[0].isoCode
    ).filter((e) => e.isoCode === address.state);
    if (!stateListNew) return;
    setStateNew({
      value: stateListNew[0].isoCode,
      label: stateListNew[0].name,
    });
  }

  useEffect(() => {
    getAddressValue().then();
  }, []);

  const updateAddress = (formData) => {
    setShowLoaders(true);
    setAddress(user, formData)
      .then((res) => {
        Router.push("/settings/address/");
        alert.success("Address updated successfully.", TIMEOUT);
      })
      .finally(() => {
        setShowLoaders(false);
      });
  };

  return (
    <div className="container container-80">
      {showLoaders && <BlockUi color={"var(--primary-color)"} />}
      <form onSubmit={formik.handleSubmit} className="row">
        <div className="col-12">
          <h3 className={"mb-4"}>Billing Address</h3>
        </div>
        <div className="col-12 col-md-6">
          <InputDashForm
            value={formik.values.first_name}
            name={"first_name"}
            onChange={formik.handleChange}
            label={"First name"}
            type={"text"}
            error={formik.errors.first_name}
            touched={formik.touched.first_name}
            required={true}
          />
        </div>
        <div className="col-12 col-md-6">
          <InputDashForm
            value={formik.values.last_name}
            name={"last_name"}
            onChange={formik.handleChange}
            label={"Last name"}
            type={"text"}
            error={formik.errors.last_name}
            touched={formik.touched.last_name}
            required={true}
          />
        </div>
        <div className="col-12 my-4">
          <InputDashForm
            value={formik.values.company}
            name={"company"}
            onChange={formik.handleChange}
            label={"Company name (optional)"}
            type={"text"}
            error={formik.errors.company}
            touched={formik.touched.company}
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            name={"country"}
            label={"Country / Region"}
            type={"select"}
            value={countryNew}
            onChange={handlerCountry}
            error={formik.errors.country}
            touched={formik.touched.country}
            required={true}
            options={countryListNew}
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            value={formik.values.address_1}
            name={"address_1"}
            onChange={formik.handleChange}
            label={"Street address"}
            type={"text"}
            error={formik.errors.address_1}
            touched={formik.touched.address_1}
            required={true}
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            value={formik.values.address_2}
            name={"address_2"}
            onChange={formik.handleChange}
            type={"text"}
            error={formik.errors.address_2}
            touched={formik.touched.address_2}
            placeholder={"Apartment, suite, unit, etc. (optional)"}
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            value={formik.values.city}
            name={"city"}
            label={"Town / City"}
            onChange={formik.handleChange}
            type={"text"}
            error={formik.errors.city}
            touched={formik.touched.city}
            required={true}
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            name={"state"}
            label={"State / County"}
            type={"select"}
            value={stateNew}
            onChange={handlerState}
            error={formik.errors.state}
            touched={formik.touched.state}
            required={true}
            options={stateListNew}
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            value={formik.values.postcode}
            name={"postcode"}
            label={"Postcode / ZIP"}
            onChange={formik.handleChange}
            type={"text"}
            error={formik.errors.postcode}
            touched={formik.touched.postcode}
            required={true}
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            value={formik.values.phone}
            name={"phone"}
            label={"Phone"}
            onChange={formik.handleChange}
            type={"text"}
            error={formik.errors.phone}
            touched={formik.touched.phone}
            required={true}
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            value={formik.values.email}
            name={"email"}
            label={"Email"}
            onChange={formik.handleChange}
            type={"text"}
            error={formik.errors.email}
            touched={formik.touched.email}
            required={true}
          />
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button type={"submit"} className={"btn btn-create"}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
export default EditAddress;
