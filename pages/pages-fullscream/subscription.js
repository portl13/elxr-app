import Logo from "@components/layout/Logo";
import Meta from "@components/layout/Meta";
import Head from "next/head";
import React from "react";

function Subscription() {
  return (
    <div>
      <Meta />
      <Head>
        <title>SUBSCRIPTION</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-auto pt-5">
            <div>
              <div className="text-center">
                <Logo logo="/img/brand/logo.png" alt="weshare" />
              </div>
              <div className="d-flex flex-column align-items-center pb-3">
                <p className="mt-4 mb-0">
                  Select a plan you would like to continue with.
                </p>
              </div>
              <form action="">
                <div className="my-3 d-flex justify-content-center">
                  <div className=" form-check d-flex justify-content-around border-primary-hover form-check-inline pr-3">
                    <label
                      className=" form-check-label pr-3"
                      for="subscription"
                    >
                      $4.99/month
                    </label>
                    <input
                      className=" form-check-input"
                      type="checkbox"
                      name="subscription"
                      id="subscription"
                      value="option1"
                      checked
                    />
                  </div>
                  <div className="form-check d-flex justify-content-around border-primary-hover   form-check-inline ">
                    <label className="form-check-label pr-3" for="subscription">
                      $49.99/year
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="subscription"
                      id="subscription"
                      value="option2"
                    />
                  </div>
                </div>
              </form>
              <div className="mt-3 w-100 px-0 ">
                <button className="btn btn-create w-100 py-3">
                  Select & Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
