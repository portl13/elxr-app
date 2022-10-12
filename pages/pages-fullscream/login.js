import Logo from "@components/layout/Logo";
import Meta from "@components/layout/Meta";
import Head from "next/head";
import React from "react";

function LoginPage() {
  return (
    <div>
      <Meta />
      <Head>
        <title>LOGIN</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-auto pt-5">
            <div >
              <div>
                <Logo logo="/img/brand/logo.png" alt="PORTL" />
              </div>
              <div className="d-flex flex-column align-items-center pb-3">
                <h1 className="font-size-34 m-0">CREATE A NEW ACCOUNT</h1>
                <p className="">
                  Please fill the required detail to create an ELXR account.
                </p>
              </div>
              <form action="">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-md-6 mb-3 mb-md-0 px-0 px-md-2">
                      <div className="input-default mr-0 border-radius-35 pb-0">
                        <label
                          className="w-100 upload-info mb-0"
                          htmlFor="name "
                        >
                          First Name
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
                    <div className="col-12 col-md-6 px-0 px-md-2">
                      <div className="input-default mr-0 border-radius-35 pb-0">
                        <label
                          className="w-100 upload-info mb-0"
                          htmlFor="name "
                        >
                          Last Name
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
                      <div className="input-default mr-0 border-radius-35 pb-0">
                        <label
                          className="w-100 upload-info mb-0"
                          htmlFor="password"
                        >
                          Password (8+ char)
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
                    <div className="mt-3 w-100 px-0 px-md-2">
                    <button className="btn btn-create w-100  py-3">Sing UP</button>
                    </div>
                  </div>
                    <div className="d-flex flex-column align-items-center justify-content-center pt-3">
                      <p className="font-size-14">By continuing, you agree to ELXR's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></p>

                      <span>Already have an account? <a href="#">Sing in</a></span>
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

export default LoginPage;
