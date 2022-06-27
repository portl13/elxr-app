import Meta from "@components/layout/Meta";
import Head from "next/head";
import React from "react";

function ChangeEmail() {
  return (
    <div>
      <Meta />
      <Head>
        <title>CHANGE EMAILS</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-auto pt-5">
            <div>
              <form action="">
                <div className="container">
                  <div className="row">
                    <div className="col-12 mt-3 px-0 px-md-2">
                      <div className="d-flex flex-column align-items-center pb-3">
                        <h1 className="mt-4 mb-0 font-size-34">CHANGE</h1>
                      </div>
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
                    <div className="mt-3 w-100 px-0 px-md-2">
                      <button className="btn btn-create w-100  py-3">
                        Done
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

export default ChangeEmail;
