import Meta from "@components/layout/Meta";
import {
  faArrowLeft,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React from "react";

function MyAccount() {
  return (
    <div>
      <Meta />
      <Head>
        <title>MY ACCOUNT</title>
      </Head>
      <div className="container">
        <div className="contain-icon-back d-flex align-items-center">
          <span className="contain-icon">
            <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
          </span>
          <span className="back">Back</span>
        </div>
        <div className="contain-title">
          <h1 className="create-communities-title">MY ACCOUNT</h1>
        </div>
        <div className="row py-5">
          <div className="col-3">
            <div className="border-white rounded d-flex justify-content-center ">
              <div className="d-flex flex-column">
                <div className="contain-btn">
                  <span className="contain-icons">
                    {" "}
                    <FontAwesomeIcon
                      className="icon-setting"
                      icon={faUser}
                    />{" "}
                  </span>
                  <button className="btn btn-transparent border-small px-5 py-3">
                    Edit Profile
                  </button>
                </div>
                <div className="contain-btn">
                  <span className="contain-icons">
                    {" "}
                    <FontAwesomeIcon
                      className="icon-setting"
                      icon={faWallet}
                    />{" "}
                  </span>
                  <button className="btn btn-transparent border-small px-5 py-3">
                    My Wallet
                  </button>
                </div>
                <div className="contain-btn">
                  <span className="contain-icons">
                    {/* {" "}
                    <FontAwesomeIcon
                      className="icon-setting"
                      icon={faWallet}
                    />{" "} */}
                  </span>
                  <button className="btn btn-transparent border-small px-5 py-3">
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div>
              <div className="contain-profile-img">
                {/* <img src="" alt="" /> */}
              </div>
              <a href="#">Edit Profile Image</a>
            </div>
            <form action="">
              <div className="row py-4">
                <div className="col-12 col-md-6">
                  <div className="input-search mr-0 border-radius-35 pb-0">
                    <label className="w-100 upload-info mb-0" htmlFor="name ">
                      First Name<span className="text-red">*</span>
                      <input
                        className="bg-transparent border-0 text-white w-100 mr-0"
                        name="name"
                        id=""
                        cols="30"
                        rows="5"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="input-search mr-0 border-radius-35 pb-0">
                    <label className="w-100 upload-info mb-0" htmlFor="name ">
                      Last Name<span className="text-red">*</span>
                      <input
                        className="bg-transparent border-0 text-white w-100 mr-0"
                        name="name"
                        id=""
                        cols="30"
                        rows="5"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-6 mt-3">
                  <div className="input-search mr-0 border-radius-35 pb-0">
                    <label className="w-100 upload-info mb-0" htmlFor="name ">
                      User Name<span className="text-red">*</span>
                      <input
                        className="bg-transparent border-0 text-white w-100 mr-0"
                        name="name"
                        id=""
                        cols="30"
                        rows="5"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-6 mt-3">
                  <div className="input-search mr-0 border-radius-35 pb-0">
                    <label className="w-100 upload-info mb-0" htmlFor="email ">
                      Email Address<span className="text-red">*</span>
                      <input
                        className="bg-transparent border-0 text-white w-100 mr-0"
                        name="email"
                        type="email"
                        id=""
                        cols="30"
                        rows="5"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-6 mt-3">
                  <div className="input-search mr-0 border-radius-35 pb-0">
                    <label
                      className="w-100 py-0 mb-0 w-md-50 upload-info"
                      htmlFor="gender"
                    >
                      Gender
                      <select
                        className="bg-transparent text-white border-0 w-100 mr-0 "
                        name="gender"
                        id=""
                      >
                        <option className="bg-black" value="1">
                          Non-binary
                        </option>
                        <option className="bg-black" value="2">
                          Binary
                        </option>
                        <option className="bg-black" value="3">
                          Evento
                        </option>
                        <option className="bg-black" value="4">
                          Reunion
                        </option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-6 mt-3">
                  <div className="input-search mr-0 border-radius-35 pb-0">
                    <label className="w-100 upload-info mb-0" htmlFor="birth ">
                      Date of Birth<span className="text-red">*</span>
                      <input
                        className="bg-transparent border-0 text-white w-100 mr-0"
                        name="birth"
                        type="date"
                        id=""
                        cols="30"
                        rows="5"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-6 mt-3">
                  <div className="input-search mr-0 border-radius-35 pb-0">
                    <label className="w-100 upload-info mb-0" htmlFor="phone ">
                      Phone Number (Optional)<span className="text-red">*</span>
                      <input
                        className="bg-transparent border-0 text-white w-100 mr-0"
                        name="phone"
                        type="Number"
                        id=""
                        cols="30"
                        rows="5"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <div className="input-search mr-0 border-radius-35 pb-0">
                    <label
                      className="w-100 upload-info "
                      htmlFor="description "
                    >
                      Bio<span className="text-red">*</span>
                      <textarea
                        className="bg-transparent border-0 text-white w-100 mr-0"
                        name="description"
                        id=""
                        cols="30"
                        rows="5"
                      />
                    </label>
                  </div>
                </div>

                <div className=" w-100 mr-3 d-flex justify-content-center justify-content-md-end mt-4">
                  <div>
                    <button className="btn btn-create px-5">Update</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
