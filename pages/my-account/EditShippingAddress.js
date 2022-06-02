import React, { useEffect, useState, useContext } from "react"
import { getShippingAddress, getCountry, setShippingAddress } from "../api/my-account/address.api";
import { UserContext } from "../../context/UserContext";
import Loader from "../../components/loader";
import { Input } from "reactstrap"
import { Country, State, City } from "country-state-city";
import { TIMEOUT } from "../../utils/constant";
import { useAlert } from "react-alert";
import Router from 'next/router';
import { woocommerceFieldsStyle } from "../../components/layout/WoocommerceFiels.style";


function EditShippingAddress() {
    const alert = useAlert();
    const { user } = useContext(UserContext);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [company, setCompanyName] = useState("");
    const [address_1, setAddress1] = useState("");
    const [address_2, setAddress2] = useState("");
    const [city, setCityname] = useState("");
    const [postcode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [phone, setPhoneNumber] = useState("");
    const [countryName, SelectCountryName] = useState([])
    const [showLoaders, setShowLoaders] = useState(false);
    const [countryList, setCountryList] = useState([])
    const [states, setStates] = useState([])


    useEffect(() => {
        const listCountry = Country.getAllCountries().map((e) => {
            return { value: e.name, code: e.isoCode };
        });
        setCountryList(listCountry)
    }, [])
    
    useEffect(() => {
        if (country) {
          const stateList = State.getStatesOfCountry(country).map((e) => {
            return { value: e.name, code: e.isoCode }
          })
          setStates(stateList)
        }
    }, [country])

    const updateValue = (data) => {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setCompanyName(data.company);
        setAddress1(data.address_1);
        setAddress2(data.address_2);
        setCityname(data.city);
        setCountry(data.country);
        setPhoneNumber(data.phone);
        setPostalCode(data.postcode);
        setState(data.state);
    };

    function getShippingAddressData() {
        getShippingAddress(user).then((res) => {
            updateValue(res.data.data);
        })
    }
    useEffect(() => {
        getShippingAddressData()
    }, []);


    const updateShippingAddress = (checkValue) => {
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
                phone

            }
            setShowLoaders(true);
            setShippingAddress(user, formData).then((res) => {
                Router.push('/my-account?tab=address')
                alert.success("Shipping address updated successfully.", TIMEOUT);
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
    return (
        <section css={woocommerceFieldsStyle}>
            <h3> Shipping address</h3>
            <div className="woocommerce-account-fields row">
                
                <div className="col-12 col-lg-6">
                    <label>First name <span className="required">*</span></label>
                    <input
                        type="text"
                        maxLength={100}
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}

                    />
                </div>
                <div className="col-12 col-lg-6">
                    <label>Last name <span className="required">*</span></label>
                    <input type="text"
                        value={last_name}
                        maxLength={100}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="col-12">
                    <label>Company name (optional)</label>
                    <input type="text"
                        value={company}
                        maxLength={50}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />

                </div>
                <div className="col-12">
                    <label>Country / Region<span className="required">*</span></label>
                    <Input
                        type="select"
                        value={country}
                        onChange={(e) => {
                            setCountry(e.target.value);
                        }}>
                        <option key={"unique"} disabled="disabled">Select Country</option>
                        {countryList.map((e) => (
                            <option key={e.code} value={e.code}>{e.value}</option>
                        ))}
                    </Input>

                </div>
                <div className="col-12">
                    <label>Street address <span className="required">*</span></label>
                    <input type="text"
                        value={address_1}
                        maxLength={250}
                        onChange={(e) => setAddress1(e.target.value)} />

                </div>
                <div className="col-12">
                    <input type="text"
                        value={address_2}
                        maxLength={250}
                        onChange={(e) => setAddress2(e.target.value)}
                    />
                </div>
                <div className="col-12">
                    <label>Town / City <span className="required">*</span></label>
                    <input type="text"
                        value={city}
                        onChange={(e) => setCityname(e.target.value)}
                    />

                </div>
                <div className="col-12">
                    <label>State / County<span className="required">*</span></label>
                    <select value={state} onChange={(e) => setState(e.target.value)}>
                        <option key={"unique-2"} disabled="disabled">Select State</option>
                        {country &&
                            states.map((e) => (
                                <option key={e.code} value={e.code}>{e.value}</option>
                            ))}
                    </select>

                </div>
                <div className="col-12">
                    <label>Postcode / ZIP <span className="required">*</span></label>
                    <input type="text"
                        value={postcode}
                        onChange={(e) => PostalCode(e)}
                        maxLength="7"
                    />

                </div>
                <div className="col-12">
                    <label>Phone  <span className="required">*</span></label>
                    <input type="text"
                        value={phone}
                        onChange={(e) => phoneNumber(e)}
                        maxLength="12"
                    />

                </div>

                <div className="col-checkbox-ui mb-3">
                    <input
                        type="checkbox"

                    />
                    <span>Update the Shipping Address used for all of my active subscriptions (optional)</span>
                </div>
                <button onClick={() => updateShippingAddress()}>{showLoaders && <Loader />}Save changes</button>
            </div>
        </section>
    )

}
export default EditShippingAddress;