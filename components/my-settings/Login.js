import React, { useState, useEffect } from "react";
import {
    faEye,
    faEyeSlash, faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";
import Loader from "@components/loader";

export default function Login({ handleUpdateSetting, tabData, setLoad }) {
  const [emailVal, setEmailVal] = useState();
  const [password, setPassword] = useState();
  const [resetPassword, setResetPassword] = useState();

  const [passwordIcon, setPasswordIcon] = useState(false);
  const [conPassIocn, setConPassIocn] = useState(false);

  useEffect(() => {
    if (tabData.length) {
      tabData.forEach((e) => {
        if (e.name === "account_email") setEmailVal(e.value);
        if (e.name === "pass1") setPassword(e.value);
        if (e.name === "pass2") setResetPassword(e.value);
      });
    }
  }, [tabData]);

  const loginFormData = () => {
    let str = "";
    tabData.forEach((e) => {
      if (e.name) {
        if (e.name === "account_email") str += `fields[${e.name}]=${emailVal}&`;
        if (e.name === "pass1") str += `fields[${e.name}]=${password}&`;
        if (e.name === "pass2") str += `fields[${e.name}]=${resetPassword}&`;
      }
    });
  };

  return (
    <div className="container-80 container">
      <div className="right-panel mainLoginDiv account-detail ">
        <label style={{ marginTop: "20px" }}>Account Email</label>
        <input
          type="text"
          className="accountEmailInput"
          value={emailVal}
          defaultValue={emailVal}
          onChange={(e) => setEmailVal(e.target.value)}
        ></input>
        <div className="accountInformation">
          <div className="accountInfoIcon position-relative">
            <FontAwesomeIcon icon={faExclamationCircle} />
          </div>
          <h6 style={{ marginLeft: "10px" }}>
            Leave password fields blank for no change
          </h6>
        </div>
        <label style={{ marginTop: "20px" }}>Add Your New Password</label>
        <div className="passwordPanel">
          <input
            type={passwordIcon ? "text" : "password"}
            className="newPasswordInput"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
          <FontAwesomeIcon
            icon={passwordIcon ? faEyeSlash : faEye}
            onClick={() => setPasswordIcon(!passwordIcon)}
          />
        </div>
        <label style={{ marginTop: "20px" }}>Repeat Your New Password</label>
        <div className="passwordPanel">
          <input
            type={conPassIocn ? "text" : "password"}
            className="newPasswordInput"
            onChange={(e) => setResetPassword(e.target.value)}
            value={resetPassword}
          ></input>
          <FontAwesomeIcon
            icon={conPassIocn ? faEyeSlash : faEye}
            onClick={() => setConPassIocn(!conPassIocn)}
          />
        </div>
        <button className="saveChangesButton" onClick={loginFormData}>
          Save Changes {setLoad ? <Loader /> : ""}
        </button>
      </div>
    </div>
  );
}
