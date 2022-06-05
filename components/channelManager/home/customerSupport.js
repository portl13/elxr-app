import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { Country, State, City } from "country-state-city";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Input, Alert } from "reactstrap";
import {
  updateCustSupport,
  getCustomerSupport,
} from "../../../pages/api/channel-store.api";
import Loader from "../../loader";
import { TIMEOUT } from "../../../utils/constant";
const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "#1b1b1b !important",
    color: "white !important",
    border: "1px solid white",
    fontColor: "white !important",
    boxShadow: "none",
    width: "100%",
    borderColor: state.isFocused ? "white" : "",
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "white" : "",
    },
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  input: (base) => ({
    ...base,
    color: "white !important",
  }),
  menu: (base) => ({
    ...base,
    background: "black !important",
    border: "none",
    color: "white !important",
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    background: "black !important",
    border: "none",
    color: "white !important",
    // kill the white space on first and last option
    padding: 0,
  }),
  option: (base) => ({
    ...base,
    background: "black !important",
    color: "white !important",
    "&:hover": {
      // Overwrittes the different states of border
      background: "grey !important",
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "white !important",
  }),
};
function CustomerSupport({ user }) {
  const alert = useAlert();
  const [loader, setLoader] = useState(true);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [emailValid, setEmailValid] = useState();
  const countryList = Country.getAllCountries().map((e) => {
    return { value: e.name, label: e.name, code: e.isoCode };
  });

  const updateState = (data) => {
    setAddress1(data.address1);
    setAddress2(data.address2);
    setCity(data.city);
    setCountry(data.country);
    setEmail(data.email);
    setPhone(data.phone);
    setZip(data.zip);
    setState(data.state);
  };
  useEffect(() => {
    if (user.id) {
      getCustomerSupport(user)
        .then((res) => {
          updateState(res.data);
          setLoader(false);
        })
        .catch(() => setLoader(false));
    }
  }, [user]);
  const updateStorePolicies = () => {
    const formData = {
      data: {
        customer_support: {
          address1,
          address2,
          city,
          email,
          phone,
          zip,
          state: state ? state : "",
          country: country ? country : "",
        },
      },
      user_id: user.id,
    };
    updateCustSupport(user, formData)
      .then(() => {
        alert.success("Customer Support updated successfully.", TIMEOUT);
      })
      .catch(() => {});
  };
  if (loader) {
    return (
      <div style={{ textAlign: "center" }}>
        <Loader color="primary" />
      </div>
    );
  }
  function phoneNumber(e) {
    const exp = /^[0-9]*$/;
    if (e.target.value === "" || exp.test(e.target.value)) {
      setPhone(e.target.value);
    }
  }
  function zipCode(e) {
    const exp = /^[0-9]*$/;
    if (e.target.value === "" || exp.test(e.target.value)) {
      setZip(e.target.value);
    }
  }
  function validateEmail() {
    var regex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(email)) {
      setEmailValid(true);
      setTimeout(()=>setEmailValid(""),[2000])
      return true;
    } else {
      setEmailValid(false);
      return false;
    }
  }
  return (
    <>
      <h2>Policies Setting</h2>
      <div className="store-panel justify-content-between">
        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => phoneNumber(e)}
          maxLength="15"
        />
      </div>
      <div className="store-panel justify-content-between">
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailValid("");
          }}
          onBlur={() => email !== "" && validateEmail()}
          maxLength="50"
        />
        <div className="email-icon-tag">
          {emailValid === true && <FontAwesomeIcon icon={faCheck} />}
          <div className="tooltip-panel">
            Valid Email Id
            <em></em>
          </div>
        </div>
        <div className="email-cross-tag">
          {emailValid === false && <FontAwesomeIcon icon={faTimesCircle} />}
          <div className="tooltip-panel">
            Invalid Email Id
            <em></em>
          </div>
        </div>
      </div>
      <div className="store-panel justify-content-between">
        <label>Address 1</label>
        <input
          type="text"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          maxLength="100"
        />
      </div>
      <div className="store-panel justify-content-between">
        <label>Address 2</label>
        <input
          type="text"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          maxLength="100"
        />
      </div>
      <div className="store-panel justify-content-between">
        <label>Country</label>
        <Input
          type="select"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setState("");
          }}
        >
          <option value={""}>Select Country</option>
          {countryList.map((e) => (
            <option key={e.code} value={e.code}>{e.value}</option>
          ))}
        </Input>
      </div>
      <div className="store-panel justify-content-between">
        <label>State</label>
        <select defaultValue={state} onChange={(e) => setState(e.target.value)}>
          <option value={""}>Select State</option>
          {country &&
            State.getStatesOfCountry(country).map((e) => (
              <option key={e.isoCode} value={e.isoCode}>{e.name}</option>
            ))}
        </select>
      </div>
      <div className="store-panel justify-content-between">
        <label>City/Town</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      {/* <button onClick={()=>console.log("city:",City.getCitiesOfState(country,state))}>value</button> */}
      <div className="store-panel justify-content-between">
        <label>Postcode/Zip</label>
        <input
          type="text"
          value={zip}
          onChange={(e) => zipCode(e)}
          maxLength="6"
        />
      </div>
      <div className="button-tab">
        {emailValid !== false && (
          <button onClick={() => updateStorePolicies()}>SAVE</button>
        )}
      </div>
    </>
  );
}
export default CustomerSupport;
