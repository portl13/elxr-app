import React, { useEffect, useState, useContext } from "react"
import { Input } from "reactstrap"
import { setAddress, getAddressData, getCountry, getState } from "../api/my-account/address.api";
import { TIMEOUT } from "../../utils/constant";
import { useAlert } from "react-alert";
import { UserContext } from "../../context/UserContext";
import { Country, State } from "country-state-city";
import Loader from "../../components/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Router from 'next/router';


function EditAddress() {
  const alert = useAlert();
  const { user } = useContext(UserContext);
  const [result, setResult] = useState();
  const [showLoaders, setShowLoaders] = useState(false);
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [company, setCompanyName] = useState();
  const [address_1, setAddress1] = useState();
  const [address_2, setAddress2] = useState();
  const [city, setCityname] = useState();
  const [postcode, setPostalCode] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [email, setEmailAddress] = useState();
  const [phone, setPhoneNumber] = useState();
  const [countryName, SelectCountryName] = useState([])
  const [emailValid, setEmailValid] = useState();
  const countryList = Country.getAllCountries().map((e) => {
    return { value: e.name, code: e.isoCode };
  });
  const updateValue = (data) => {
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setCompanyName(data.company);
    setAddress1(data.address_1);
    setAddress2(data.address_2);
    setCityname(data.city);
    setCountry(data.country);
    setEmailAddress(data.email);
    setPhoneNumber(data.phone);
    setPostalCode(data.postcode);
    setState(data.state);
  };
  function getAddressValue() {
    getAddressData(user).then((res) => {
      updateValue(res.data.data);
    })
  }

  useEffect(() => {
    getAddressValue()
  }, []);

  function getCountryName() {
    getCountry(user).then((res) => {
      SelectCountryName(res.data.data)

    }

    )
  }
  useEffect(() => getCountryName(), []);

  // function getStateName() {
  //   getState(user)
  //     .then((res) => setStateName(res.data.data))
  //     .catch((error) => console.log(error));
  // }
  // useEffect(() => getStateName(), []);


  const updateAddress = (checkValue) => {
    if (checkError(checkValue)) {
      const formData = {
        first_name,
        last_name,
        company,
        address_1,
        address_2,
        city,
        postcode,
        country,
        state,
        email,
        phone

      }
      setShowLoaders(true);
      setAddress(user, formData).then((res) => {
        Router.push('/my-account?tab=address')
        alert.success("Address updated successfully.", TIMEOUT);
        setShowLoaders(false);
      })
    }
  }
  const checkError = () => {
    let checkValue = true;
    if (checkValue && !first_name) {
      alert.error("Please add first name before submit.", TIMEOUT);
      checkValue = false;
    }
    if (checkValue && !last_name) {
      alert.error("Please add last name before submit.", TIMEOUT);
      checkValue = false;
    }

    if (checkValue && !address_1) {
      alert.error("Please add street address before submit.", TIMEOUT);
      checkValue = false;
    }

    if (checkValue && !city) {
      alert.error("Please add city before submit.", TIMEOUT);
      checkValue = false;
    }
    if (checkValue && !postcode) {
      alert.error("Please add postcode before submit.", TIMEOUT);
      checkValue = false;
    }
    if (checkValue && !state) {
      alert.error("Please add state before submit.", TIMEOUT);
      checkValue = false;
    }
    if (checkValue && !email) {
      alert.error("Please add email address before submit.", TIMEOUT);
      checkValue = false;
    }
    if (checkValue && !phone) {
      alert.error("Please add phone number before submit.", TIMEOUT);
      checkValue = false;
    }

    return checkValue;
  };
  function phoneNumber(e) {
    const exp = /^[0-9]*$/;
    if (e.target.value === "" || exp.test(e.target.value)) {
      setPhoneNumber(e.target.value);
    }
  }
  function PostalCode(e) {
    const exp = /^[0-9]*$/;
    if (e.target.value === "" || exp.test(e.target.value)) {
      setPostalCode(e.target.value);
    }
  }
  // function FNameValidators(e) {
  //   const exp = /^[a-zA-Z]+$/g;
  //   if (e.target.value === "" || exp.test(e.target.value)) {
  //     setFirstName(e.target.value);
  //   }
  // }

  // function LNameValidators(e) {
  //   const exp = /^[a-zA-Z]+$/g;
  //   if (e.target.value === "" || exp.test(e.target.value)) {
  //     setLastName(e.target.value);
  //   }
  // }

  function validateEmail() {
    var regex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(email)) {
      setEmailValid(true);
      setTimeout(() => setEmailValid(""), [2000])
      return true;
    } else {
      setEmailValid(false);
      return false;
    }
  }

let stateName=State.getStatesOfCountry(country).filter(st=>st.isoCode===state)

let billingAddress={first_name,
        last_name,
        company,
        address_1,
        address_2,
        city,
        postcode,
        country:countryName[country],
        state:stateName[0]?.name,
        email,
        phone}
        



// localStorage.setItem('billingAddress',JSON.stringify(billingAddress))


  return (
    <>
      <h3>Billing address</h3>
      <div className="woocommerce-account-fields">
        <div className="col-md-div-12">
          <div className="col-div-6">
            <label>First name <span className="required">*</span></label>
            <input
              type="text"
              maxLength={100}
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}

            />
          </div>
          <div className="col-div-6">
            <label>Last name <span className="required">*</span></label>
            <input type="text"
              value={last_name}
              maxLength={100}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-div-12">
          <label>Company name (optional)</label>
          <input type="text"
            value={company}
            maxLength={50}
            onChange={(e) => setCompanyName(e.target.value)}
          />

        </div>
        <div className="col-div-12">
          <label>Country / Region<span className="required">*</span></label>
          <Input
            type="select"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}>
            <option value={""} disabled="disabled">Select Country</option>
            {countryList.map((e) => (
              <option value={e.code}>{e.value}</option>
            ))}
          </Input>

        </div>
        <div className="col-div-12">
          <label>Street address <span className="required">*</span></label>
          <input type="text"
            value={address_1}
            maxLength={250}
            onChange={(e) => setAddress1(e.target.value)} />

        </div>
        <div className="col-div-12">
          <input type="text"
            value={address_2}
            maxLength={250}
            placeholder="Apartment, suite, unit, etc.(optional)"
            onChange={(e) => setAddress2(e.target.value)}
          />
        </div>
        <div className="col-div-12">
          <label>Town / City <span className="required">*</span></label>
          <input type="text"
            value={city}
            onChange={(e) => setCityname(e.target.value)}
          />

        </div>
        <div className="col-div-12">
          <label>State / County<span className="required">*</span></label>
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value={""} disabled="disabled">Select State</option>
            {country &&
              State.getStatesOfCountry(country).map((e) => (
                <option value={e.name}>{e.name}</option>
              ))}
          </select>

        </div>
        <div className="col-div-12">
          <label>Postcode / ZIP <span className="required">*</span></label>
          <input type="text"
            value={postcode}
            onChange={(e) => PostalCode(e)}
            maxLength="7"
          />

        </div>
        <div className="col-div-12">
          <label>Phone  <span className="required">*</span></label>
          <input type="text"
            value={phone}
            onChange={(e) => phoneNumber(e)}
            maxLength="12"
          />

        </div>
        <div className="col-div-12">
          <label>Email address<span className="required">*</span></label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmailAddress(e.target.value);
              setEmailValid("");
            }}
            onBlur={() => email !== "" && validateEmail()}
            maxLength="50"
          />
          <div className="email-icon-tag">
            {emailValid === true && <FontAwesomeIcon icon={faCheck} />}
            <div className="tooltip-panel">Valid Email<em></em></div>
          </div>
          <div className="email-cross-tag">
            {emailValid === false && <FontAwesomeIcon icon={faTimesCircle} />}
            <div className="tooltip-panel">Invalid Error<em></em></div>
          </div>
        </div>

        <div className="col-checkbox-ui">
          <input
            type="checkbox"

          />
          <span>Update the Billing Address used for all of my active subscriptions (optional)</span>
        </div>
        {emailValid !== false && (
          <button onClick={() => updateAddress()}>{showLoaders && <Loader />} Save changes</button>
        )}
      </div>
    </>
  )
}
export default EditAddress