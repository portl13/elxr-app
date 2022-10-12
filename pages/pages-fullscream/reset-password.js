import Logo from "@components/layout/Logo";
import Meta from "@components/layout/Meta";
import Head from "next/head";
import React from "react";

function ResetPassword() {
  return (
    <div>
      <Meta />
      <Head>
        <title>RESET PASSWORD</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-auto pt-5">
            <div>
              <div className="text-center">
                <Logo logo="/img/brand/logo.png" alt="PORTL" />
              </div>
              <div className="d-flex flex-column align-items-center pb-3">
                <h1 className="mt-4 mb-0 font-size-34">RESET YOUR PASSWORD</h1>
              </div>
              <form action="">
                <div className="col-12  px-0 px-md-2">
                  <div className="input-default d-flex justify-content-around mr-0 border-radius-35 pb-0">
                    <label
                      className="w-100 upload-info mb-0 position-relative"
                      htmlFor="password"
                    >
                      Password (8+ char)
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
              </form>
              <div className="mt-3 w-100 px-0 ">
                <button className="btn btn-create w-100 py-3">
                  Reset Password
                </button>
                <div className="pt-5 text-center">
                  <a href="#">Cancel</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
