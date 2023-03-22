import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Router from "next/router";
import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import { Alert, Modal, ModalBody, ModalHeader } from "reactstrap";
import Logo from "@components/layout/Logo";
import { modalColor } from "@components/livefeed/livefeed.style";
import BlockUi from "@components/ui/blockui/BlockUi";
import Terms from "@components/register/terms";
import Policy from "@components/register/policy";
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
  EyeIconPassword,
  AgreeText,
  inputCSS,
  Button,
  ImageTitle,
  ImageTextPink,
  ImageFluid,
} from "@components/signup/SingUpStyle";
import { signIn } from "next-auth/react";
import {Turnstile} from "@marsidev/react-turnstile";



const keyTurnstile = process.env.TurnstileSiteKey;

export default function CreatorSignUp() {
  const isMounted = useRef(true);

  const [blocking, setBlocking] = useState(false);
  const [pass, setPass] = React.useState(false);

  const [fail, setFail] = useState({
    status: false,
    message: "",
  });

  const [showTermsModal, setTermsShowModal] = useState(false);
  const handleTermsClose = () => setTermsShowModal(false);
  const handleTermsShow = () => setTermsShowModal(true);
  const [showPolicyModal, setPolicyShowModal] = useState(false);
  const handlePolicyClose = () => setPolicyShowModal(false);
  const handlePolicyShow = () => setPolicyShowModal(true);

  const source = Axios.CancelToken.source();

  const register = async ({ username, email, password, token }) => {
    setBlocking(true);
    setFail({
      status: false,
      message: "",
    });
    try {
      if (isMounted) {
        await Axios.post(
            `/api/register`,
            {
              username,
              email,
              password,
              token,
            },
            {
              cancelToken: source.token,
            }
        );

        const { error, ok } = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (!ok) {
          setFail({
            status: true,
            message: error,
          });
          return;
        }

        await Router.replace(`member-profile`);
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

  const registerForm = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      token: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is Required"),
      username: Yup.string()
        .min(4, "Username is too short! - should be 4 chars minimum.")
        .required("Username is Required"),
      password: Yup.string()
        .required("Password is Required")
        .min(6, "Password is too short - should be 6 chars minimum."),
      token: Yup.string().required("Not Verified"),
    }),
    onSubmit: (values) => register(values),
  });

  const setTokenVerify = (token) => {
    registerForm.setFieldValue("token", token);
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
      source.cancel();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Elxr | Creator Sign Up</title>
      </Head>
      <PageContainer>
        <FormContainer onSubmit={registerForm.handleSubmit}>
          <Logo logo="/img/brand/logo.png" alt="PORTL" />

          <Title>Create account</Title>

          <InputContainer>
            <div>
              {blocking && <BlockUi color="var(--primary)" />}

              {fail.message && <Alert color="warning">{fail.message}</Alert>}

              <InputDashForm
                customStyle={inputCSS}
                name={"username"}
                label={"Username"}
                type={"text"}
                onChange={registerForm.handleChange}
                value={registerForm.values.username}
                error={registerForm.errors.username}
                touched={registerForm.touched.username}
                autocomplete={"off"}
              />
            </div>
            <div>
              <InputDashForm
                customStyle={inputCSS}
                name={"email"}
                label={"Email"}
                type={"text"}
                value={registerForm.values.email}
                error={registerForm.errors.email}
                touched={registerForm.touched.email}
                onChange={registerForm.handleChange}
                autocomplete={"off"}
              />
            </div>
            <PasswordWrapper>
              <InputDashForm
                customStyle={inputCSS}
                name={"password"}
                label={"Password"}
                value={registerForm.values.password}
                error={registerForm.errors.password}
                touched={registerForm.touched.password}
                type={!pass ? "password" : "text"}
                onChange={registerForm.handleChange}
                autocomplete={"off"}
              />
              <EyeIconPassword
                onClick={() => setPass(!pass)}
                isVisible={pass}
              />
            </PasswordWrapper>
          </InputContainer>
          <div className="mt-3">
            <Turnstile siteKey={keyTurnstile} onSuccess={setTokenVerify} />
          </div>
          <AgreeText>
            By signing up, you agree to Elxr{" "}
            <span onClick={handleTermsShow}>Terms of Service</span> and{" "}
            <span onClick={handlePolicyShow}>Privacy Policy</span>.
          </AgreeText>

          <Button type="submit">Create my account</Button>

          <TermsText>
            Already have an Elxr account? <Link href="/login">Sign In</Link>
          </TermsText>

          <Copyright>
            Copyright © 2017-2023 PORTL All rights reserved.
          </Copyright>
        </FormContainer>

        <ImageContainer className="d-lg-flex d-none">
          <ImageFluid src="/img/sign-up/elxr-people.png" width={750} mb={0} />
          <ImageTitle>Welcome</ImageTitle>
          <ImageTextPink fs={"18px"}>Elxr is the only dedicated healthy lifestyle platform owned by its users, where everyone earns.</ImageTextPink>
        </ImageContainer>
      </PageContainer>

      <Modal
        className="modal-dialog-centered"
        isOpen={showTermsModal}
        toggle={handleTermsClose}
        css={modalColor}
      >
        <ModalHeader toggle={handleTermsClose}></ModalHeader>
        <ModalBody>
          <Terms />
        </ModalBody>
      </Modal>

      <Modal
        className="modal-dialog-centered"
        isOpen={showPolicyModal}
        toggel={handlePolicyClose}
        css={modalColor}
      >
        <ModalHeader toggle={handlePolicyClose}></ModalHeader>
        <ModalBody>
          <Policy />
        </ModalBody>
      </Modal>
    </>
  );
}
