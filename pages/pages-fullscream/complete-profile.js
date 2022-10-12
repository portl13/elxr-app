import Meta from "@components/layout/Meta";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React from "react";

function CompleteProfile() {
  return (
    <div>
      <Meta />
      <Head>
        <title>COMPLETE PROFILE</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-auto pt-5">
            <div>
              <div className="imagen-circular-65 m-auto"></div>
              <div className="d-flex flex-column align-items-center pb-3">
                <h1 className="font-size-34 mb-0 mt-3">Hi Elaine!</h1>
                <p className="m-0">
                 Thank you for subscribing.
                </p>
                <p className="">
                Now, a few more details to complete your PORTL profile!
                </p>
              </div>
              <form action="">
                <div className="container">
                  <div className="row">
                    <div className="col-12 mb-3  px-0 px-md-2">
                      <div className="input-default mr-0 border-radius-35 pb-0">
                        <label
                          className="w-100 upload-info mb-0"
                          htmlFor="gender "
                        >
                          Gender
                          <select
                            name="gender"
                            id=""
                            className="bg-transparent text-white border-0 w-100 mr-0"
                          >
                            <option className="bg-black" value="1">
                              No-Binary
                            </option>
                            <option className="bg-black" value="2">
                              Concierto
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
                    <div className="col-12 px-0 px-md-2">
                      <div className="input-default mr-0 border-radius-35 pb-0">
                        <label
                          className="w-100 upload-info mb-0 position-relative"
                          htmlFor="birth "
                        >
                          Date of Birth <span className="icon-date-input"> <FontAwesomeIcon className="icon-setting" icon={faCalendar} /> </span>
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
                    <div className="col-12 mt-3 px-0 px-md-2">
                      <div className="input-default mr-0 border-radius-35 pb-0">
                        <label
                          className="w-100 upload-info mb-0"
                          htmlFor="username"
                        >
                          Set Username
                          <input
                            className="bg-transparent border-0 text-white w-100 mr-0"
                            name="username"
                            type="name"
                            id=""
                            cols="30"
                            rows="5"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="col-12 mt-3 px-0 px-md-2">
                      <div className="input-default mr-0 border-radius-35 pb-0">
                        <label
                          className="w-100 upload-info mb-0"
                          htmlFor="phone"
                        >
                          Phone Number (Optional)
                          <input
                            className="bg-transparent border-0 text-white w-100 mr-0"
                            name="phone"
                            type="number"
                            id=""
                            cols="30"
                            rows="5"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="mt-3 w-100 px-0 px-md-2">
                      <button className="btn btn-create w-100  py-3">
                        Save & Proceed
                      </button>
                    </div>
                  </div>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompleteProfile;
