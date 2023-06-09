import React, {useState, useEffect, useContext, useRef} from "react";
import { Alert } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn as loginING } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import Axios from "axios";

import { UserContext } from "@context/UserContext";
import Logo from "@components/layout/Logo";
import BlockUi from "@components/ui/blockui/BlockUi";
import InputDashForm from "@components/shared/form/InputDashForm";
import {
  PageContainer,
  FormContainer,
  ImageContainer,
  Title,
  InputContainer,
  TermsText,
  Copyright,
  PasswordWrapper,
  inputCSS,
  Button,
  EyeIconPassword,
  ImageFluid, ImageTitle, ImageTextPink,
} from "@components/signup/SingUpStyle";

import { Turnstile } from "@marsidev/react-turnstile";
import axios from "axios";
const keyTurnstile = process.env.TurnstileSiteKey;

export default function Login() {
  const refTurnstile = useRef(null);
  const { deleteCookie } = useContext(UserContext);
  const [newUser, setNewUser] = useState(null);
  const [showMsg, setShowMsg] = useState(false);
  const [pass, setPass] = useState(false);

  const router = useRouter();

  const { changePasswordSuccess = null } = router.query;

  const [blocking, setBlocking] = useState(false);
  const [error, setError] = useState("");

  const signInLog = async ({ email, password, token }) => {
    // try {
    //   const { data } = await axios.post(`/api/login`, { token });
    //   if (!data?.success) {
    //     setError(
    //         `The email or password you entered is incorrect. Lost your password?`
    //     );
    //     return;
    //   }
    // } catch (e) {
    //   refTurnstile.current?.reset();
    // } finally {
    //   setBlocking(false);
    // }

    deleteCookie();
    setNewUser({ email, password });
    setError("");
    setBlocking(true);
    const { next = null } = router.query;
    try {
      const { error, ok } = await loginING("credentials", {
        redirect: false,
        email,
        password,
      });
      if (!ok) {
        setError(error);
        return;
      }
      await router.replace(next || "/");
    } catch (error) {
    } finally {
      setBlocking(false);
    }
  };

  const resendEmailVerification = async (e) => {
    e.preventDefault();
    setBlocking(true);
    try {
      const { data } = await Axios.post(
        `${process.env.baseUrl}/wp-json/portl/v1/auth/sent-email-verify/`,
        { user_email: newUser.email }
      );

      setError(data.message);
      setBlocking(false);
    } catch (error) {
      setBlocking(false);
    }
  };

  useEffect(() => {
    setBlocking(false);
  }, []);

  useEffect(() => {
    if (changePasswordSuccess === "") {
      setShowMsg(true);
    }
  }, [changePasswordSuccess]);

  const login = useFormik({
    initialValues: {
      email: "",
      password: "",
      token: "",
    },
    onSubmit: (values) => signInLog(values),
    validationSchema: Yup.object({
      email: Yup.string().required("Email or Username is Required"),
      password: Yup.string()
        .required("Password is Required")
        .min(6, "Password is too short - should be 6 chars minimum.")
    }),
  });

  const setTokenVerify = (token) => {
    login.setFieldValue("token", token);
  };

  return (
    <>
      <Head>
        <title>Elxr | Login</title>
      </Head>

      {blocking && <BlockUi color="var(--primary)" />}

      {showMsg && (
        <Alert color="success">
          Your password has been successfully reset.
        </Alert>
      )}

      {error === "bp_account_not_activated" ? (
        <Alert color="warning">
          "ERROR: Your account has not been activated. Check your email for the
          activation link. If you have not received an email yet, click{" "}
          <a href="#" onClick={(e) => resendEmailVerification(e)}>
            here
          </a>{" "}
          to resend it."
        </Alert>
      ) : null}

      {error && error !== "bp_account_not_activated" ? (
        <Alert color="warning">{error}</Alert>
      ) : null}

      <PageContainer>
        <FormContainer onSubmit={login.handleSubmit}>
          <Logo logo="/img/brand/logo.png" alt="PORTL" />

          <Title>Sign in</Title>

          <TermsText>
            Enter your details below
          </TermsText>

          <InputContainer>
            <div>
              <InputDashForm
                required={true}
                customStyle={inputCSS}
                name={"email"}
                label={"Email or Username"}
                type={"text"}
                value={login.values.email}
                error={login.errors.email}
                touched={login.touched.email}
                onChange={login.handleChange}
                autocomplete={"off"}
              />
            </div>
            <PasswordWrapper>
              <InputDashForm
                required={true}
                customStyle={inputCSS}
                name={"password"}
                label={"Password"}
                value={login.values.password}
                error={login.errors.password}
                touched={login.touched.password}
                type={!pass ? "password" : "text"}
                onChange={login.handleChange}
                autocomplete={"off"}
              />
              <EyeIconPassword
                onClick={() => setPass(!pass)}
                isVisible={pass}
              />
            </PasswordWrapper>
            <Link href="/forgot-password">Forget password?</Link>
          </InputContainer>
          {/*<div className="mt-3">*/}
          {/*  <Turnstile*/}
          {/*      ref={refTurnstile}*/}
          {/*      siteKey={keyTurnstile}*/}
          {/*      onSuccess={setTokenVerify}*/}
          {/*  />*/}
          {/*</div>*/}
          <Button type="submit">Sign In</Button>

          <TermsText>
            Don’t have an account? <Link href="/signup">Sign Up</Link>
          </TermsText>

          <Copyright>
            Copyright © 2017-2023 ELXR All rights reserved.
          </Copyright>
        </FormContainer>

        <ImageContainer className="d-lg-flex d-none">
          <ImageFluid src="/img/sign-up/elxr-people.png" width={750} mb={0} />
          <ImageTitle>Welcome</ImageTitle>
          <ImageTextPink fs={"18px"}>Elxr is your one platform to grow your business, monetize content, manage clients, and generate recurring revenue for life.</ImageTextPink>
        </ImageContainer>
      </PageContainer>
    </>
  );
}

export const getServerSideProps = async ({ req }) => {
  const session = await getToken({ req });

  if (session && session?.user?.rol === "vendor") {
    return {
      redirect: {
        destination: "/studio",
        permanent: false,
      },
    };
  }

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
