import React from "react";
import { Button } from "reactstrap";
import Router from "next/router";
import Head from "next/head";
import { BackLink } from "../components/ui/auth/auth.style";
import LayoutAuth from "../components/layout/LayoutAuth";
export default function SignupMsg() {
  return (
    <>
      <LayoutAuth image={true}>
        <Head>
          <title>Signup Msg - WeShare</title>
        </Head>
        <div className="form-section">
          <BackLink>
            <a onClick={() => Router.push("/signup")} className="back">
              {" "}
              Back{" "}
            </a>
          </BackLink>
          <div className="inner-form">
            <h1>
              <span>Create</span>Member Account
            </h1>
            <div className="verification-text">
              We have just sent you a verification email. Please check your
              inbox.
            </div>
            <div className="resend-text">RESEND VERIFICATION EMAIL</div>
            <Button
              className="btn btn-primary mb-4 signin-button"
              onClick={() => Router.push("/login")}
            >
              Signin
            </Button>
          </div>
          <div></div>
        </div>
      </LayoutAuth>
    </>
  );
}
