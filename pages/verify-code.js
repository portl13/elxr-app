import React, { useRef, useState, useEffect } from "react";
import LayoutAuth from "../components/layout/LayoutAuth";
import Router from "next/router";
import Head from "next/head";
import Header from "../components/layout/Header";
import { BackLink } from "@components/ui/auth/auth.style";
import BlockUi, { containerBlockUi } from "../components/ui/blockui/BlockUi";
import { Alert } from "reactstrap";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import * as Yup from "yup";
import Axios from "axios";
import { Base64 } from "@helpers/base64";
import {useAlert} from "react-alert";
import {TIMEOUT} from "@utils/constant";
const urlVerify = `${process.env.baseUrl}/wp-json/buddyboss-app/auth/v1/verify`;

export default function VerifyCodePage() {
  const alert = useAlert()
  const isMounted = useRef(true);

  const { query } = useRouter();

  const [blocking, setBlocking] = useState(false);

  const [codeData, setCodeData] = useState(null);

  const [email, setEmail] = useState("");

  const [fail, setFail] = useState({
    status: false,
    message: "",
  });

  const source = Axios.CancelToken.source();
  const verifyCode = async ({ code }) => {
    setBlocking(true);
    setFail({
      status: false,
      message: "",
    });
    try {
      if (isMounted) {
        await Axios.post(urlVerify, {
          code,
          email: codeData?.email,
        });

        Router.push("/login?next=accounttype");
      }
    } catch (e) {
      if (isMounted) {
        if (Axios.isCancel(e)) {
          setBlocking(false);
        } else {
          if (e.response) {
            const { data } = e.response;
            setFail({
              status: true,
              message: data.message,
            });
            setBlocking(false);
          }
          setBlocking(false);
        }
      }
    }
  };

  const verifyCodeForm = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.number()
        .typeError("The code is a numerical type.")
        .required("Please enter the required 6-digit code."),
    }),
    onSubmit: (values) => verifyCode(values),
  });

  const resendEmailVerification = async (email) => {
    setBlocking(true);
    try {
      const { data } = await Axios.post(
        `${process.env.baseUrl}/wp-json/portl/v1/auth/sent-email-verify/`,
        { user_email: email }
      );
      alert.success('Please check your inbox', TIMEOUT)
    } catch (error) {
      console.log(error)
    }finally {
      setBlocking(false)
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
      source.cancel();
    };
  }, []);

  useEffect(() => {
    if (!query?.key) return;
    const dataDecode = JSON.parse(Base64.decode(query?.key));
    console.log({ dataDecode });
    if (dataDecode?.email) {
      setEmail(dataDecode.email);
    }
    if (dataDecode?.code) {
      verifyCodeForm.setFieldValue("code", dataDecode?.code);
    }
    setCodeData(dataDecode);
  }, [query]);

  return (
    <LayoutAuth image={true}>
      <Head>
        <title>Verify code - elxr</title>
      </Head>
      <Header actionButton={true} />
      <div
        css={{
          minHeight: "30% !important",
          margin: "auto",
        }}
        className="form-section"
      >
        <BackLink>
          <a href="/signup" className="back">
            {" "}
            Back{" "}
          </a>
        </BackLink>
        <form css={containerBlockUi} onSubmit={verifyCodeForm.handleSubmit}>
          {blocking && <BlockUi color="#eb1e79" />}
          {fail.status && <Alert color="danger"> {fail.message} </Alert>}
          <div className="inner-form">
            <h1 className="mb-4">
              <span>
                We have just sent you a verification email. Please check your
                inbox. If you have not received an email yet, click{" "}
                <button type={"button"} style={{
                  border: 'none',
                  borderRadius: 'none',
                  color: 'var(--primary)',
                  background: 'none',
                }} onClick={() => resendEmailVerification(email)}>
                  here
                </button>
                to resend it.
              </span>
              Enter Code
            </h1>
            <div className="mb-4">
              <input
                id="code"
                name="code"
                type="text"
                onChange={verifyCodeForm.handleChange}
                value={verifyCodeForm.values.code}
                css={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: "35px !important",
                  textAlign: "center",
                  borderRadius: "37px",
                }}
                className="input-search"
              />
              {verifyCodeForm.errors.code && verifyCodeForm.touched.code ? (
                <Alert color="danger">{verifyCodeForm.errors.code}</Alert>
              ) : null}
            </div>
            <input
              className="btn btn-primary mb-4 submit-button w-100"
              value="Verify"
              type="submit"
            />
          </div>
        </form>
      </div>
    </LayoutAuth>
  );
}
