import React, { useState, useEffect } from "react";
import LayoutAuth from "@components/layout/LayoutAuth";
import { LoginContainer, topInputStyle } from "@components/ui/auth/auth.style";
import Head from "next/head";
import { Alert, Form, FormGroup, Input } from "reactstrap";
import BlockUi, { containerBlockUi } from "@components/ui/blockui/BlockUi";
import { useRouter } from "next/router";
import { resetPassword } from "@request/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputDashForm from "@components/shared/form/InputDashForm";
import {
  PasswordWrapper,
  EyeIconPassword as EyeIcon,
} from "@components/signup/SingUpStyle";

const EyeIconPassword = ({ isVisible, onClick }) => {
  if (isVisible) {
    return (
      <span className="icon-eye" onClick={onClick}>
        <FontAwesomeIcon icon={faEye} />
      </span>
    );
  }

  return (
    <span className="icon-eye" onClick={onClick}>
      <FontAwesomeIcon icon={faEyeSlash} />
    </span>
  );
};

function PageResetPassword() {
  const msg = "";
  const router = useRouter();
  const { query } = router;
  const { key = null, login = null } = query;

  const [pass1, setPass1] = useState(false);
  const [pass2, setPass2] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const [error, setError] = useState("");

  const formResetForm = useFormik({
    initialValues: {
      pass1: "",
      pass2: "",
    },
    onSubmit: (values) => handlerOnSubmit(values),
    validationSchema: Yup.object({
      pass1: Yup.string().required("new password is a required field"),
      pass2: Yup.string().required("re new password is a required field"),
    }),
  });

  const handlerOnSubmit = ({ pass1, pass2 }) => {
    if (!key || !login) {
      setError("Invalid Key");
      return;
    }

    setBlocking(true);

    const data = {
      pass1,
      pass2,
      reset_key: key,
      user_login: login,
    };

    resetPassword(data)
      .then(() => {
        setBlocking(false);
        router.push("/login?changePasswordSuccess");
      })
      .catch(({ response }) => {
        let msg = response.data?.message && null;
        setBlocking(false);
        if (msg) {
          setError(msg);
        } else {
          setError("Invalid Key");
        }
      });
  };

  useEffect(() => {
    const cleanError = setTimeout(() => {
      setError("");
    }, 5000);

    return () => clearInterval(cleanError);
  }, [error]);

  return (
    <LoginContainer>
      <LayoutAuth>
        <Head>
          <title>Elxr | Reset Password</title>
        </Head>

        <Form css={containerBlockUi} onSubmit={formResetForm.handleSubmit}>
          {blocking && <BlockUi color="#eb1e79" />}
          <h5 className="mb-4">Please enter a new password.</h5>
          {error && <Alert color="danger">{error}</Alert>}

          <PasswordWrapper className={"mb-4"}>
            <InputDashForm
              placeholder={"New password"}
              type={!pass1 ? "password" : "text"}
              name={"pass1"}
              value={formResetForm.values.pass1}
              onChange={formResetForm.handleChange}
              touched={formResetForm.touched.pass1}
              label={"New password"}
              required={true}
            />
            <EyeIcon onClick={() => setPass2(!pass2)} isVisible={pass2} />
          </PasswordWrapper>

          <PasswordWrapper>
            <InputDashForm
              placeholder={"Re-enter your new password"}
              type={!pass2 ? "password" : "text"}
              name={"pass2"}
              value={formResetForm.values.pass2}
              onChange={formResetForm.handleChange}
              touched={formResetForm.touched.pass2}
              label={"Re-enter your new password"}
              required={true}
            />
            <EyeIcon onClick={() => setPass2(!pass2)} isVisible={pass2} />
          </PasswordWrapper>

          <input
            className="btn btn-block btn-primary mt-4"
            value="Save"
            type="submit"
          />
        </Form>
      </LayoutAuth>
    </LoginContainer>
  );
}

export default PageResetPassword;
