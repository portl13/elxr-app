import Meta from "@components/layout/Meta";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React from "react";

function Veriffication() {
  return (
    <div>
      <Meta />
      <Head>
        <title>VERIFFICATION</title>
      </Head>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 m-auto pt-5">
              <div className="">
                <div className="text-center">
                  <span>
                    {" "}
                    <FontAwesomeIcon
                      className="icon-email text-primary"
                      icon={faEnvelope}
                    />{" "}
                  </span>
                </div>
                <div className="d-flex flex-column align-items-center pb-3">
                  <h1 className="font-size-34 mb-0 mt-3">VERIFY EMAIL</h1>
                  <p className="text-center">
                    Enter the 4-digit code sent to your registered email address
                    alansmith0296@yahoo.com to reset your password.
                  </p>
                  <a href="#">Change email</a>
                </div>
                <form action="">
                  <div className="input-default mr-0 border-radius-35  px-2 pb-0">
                    <input
                      className="bg-transparent border-0 text-white w-100 mr-0"
                      name="code"
                      type="number"
                      id=""
                      cols="30"
                      rows="5"
                    />
                  </div>
                </form>
                <div className="mt-3 w-100 px-0 ">
                  <button className="btn btn-create w-100  py-3">
                    Proceed
                  </button>
                </div>

                <div className="mt-3 d-flex justify-content-center">
                  <span>
                    Trouble receiving code? <a href="#">Send again</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Veriffication;
