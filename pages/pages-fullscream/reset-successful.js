import Logo from "@components/layout/Logo";
import Meta from "@components/layout/Meta";
import { faCheckCircle, faCircleNotch, faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React from "react";

function ResetSuccessful() {
  return (
    <div>
      <Meta />
      <Head>
        <title>RESET SUCCESSFUL</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-auto pt-5">
            <div>
              <div className="bg-success text-dark p-3 mb-3 border-big text-center mx-2">
                <span> <FontAwesomeIcon className="icon-check" icon={faCheckCircle} /> </span>
                <span>Your password has been reset successfully</span>
              </div>
              <div className="text-center mt-5">
                <Logo logo="/img/brand/logo.png" alt="weshare" />
              </div>
              <div className="d-flex flex-column align-items-center py-3">
                <p className="">Sing In with your registered email.</p>
              </div>
              <form action="">
                <div className="container">
                  <div className="row">
                    <div className="col-12 mt-3 px-0 px-md-2">
                      <div className="input-default mr-0 border-radius-35 pb-0">
                        <label
                          className="w-100 upload-info mb-0"
                          htmlFor="email"
                        >
                          Email Address
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
                    <div className="col-12 mt-3 px-0 px-md-2">
                      <div className="input-default d-flex justify-content-around mr-0 border-radius-35 pb-0">
                        <label
                          className="w-100 upload-info mb-0 position-relative"
                          htmlFor="password"
                        >
                          Password
                          <a className="icon-date-input" href="#">
                            Show
                          </a>
                          <input
                            className="bg-transparent border-0 text-white w-100 mr-0"
                            name="password"
                            type="password"
                            id=""
                            cols="30"
                            rows="5"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="text-right w-100 my-2">
                      <a href="#">Forgot Password? </a>
                    </div>
                    <div className="mt-3 w-100 px-0 px-md-2">
                      <button className="btn btn-create w-100  py-3">
                        Sing Up
                      </button>
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-center pt-5">
                    <span>
                      Don't have an account? <a href="#">Sing Up</a>
                    </span>
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

export default ResetSuccessful;
