import {useState, useEffect, useContext} from "react";
import { Form, FormGroup, Alert } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import LayoutAuth from "@components/layout/LayoutAuth";
import {
  AnchorCaption,
  DivCaption,
  LoginContainer,
} from "@components/ui/auth/auth.style";
import BlockUi, { containerBlockUi } from "@components/ui/blockui/BlockUi";
import Axios from "axios";

import InputDashForm from "@components/shared/form/InputDashForm";
import { signIn as loginING } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import {UserContext} from "@context/UserContext";

export default function Login() {
  const {deleteCookie} = useContext(UserContext)
  const [newUser, setNewUser] = useState(null);
  const [showMsg, setShowMsg] = useState(false);

  const router = useRouter();

  const { changePasswordSuccess = null } = router.query;

  const [blocking, setBlocking] = useState(false);
  const [error, setError] = useState("");

  const signIn = async ({ email, password }) => {
    deleteCookie()
    setNewUser({ email, password })
    setError("");
    setBlocking(true);
    const { next = null } = router.query
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
      if (next){
        await router.replace(next)
        return;
      }
      await router.reload();
    } catch (error) {
    } finally {
      setBlocking(false);
    }

    // setNewUser({ email, password })
    // setError(false)
    // setBlocking(true)
    // try {
    //   const url = process.env.baseUrl + '/wp-json/jwt-auth/v1/token'
    //   const profile = process.env.bossApi + '/members/'
    //   const { data } = await Axios.post(url, { username: email, password })
    //   const respuesta = await Axios.get(profile + data.data.id, {
    //     headers: {
    //       Authorization: `Bearer ${data.data.token}`,
    //     },
    //   })
    //   const getColorRequest = await Axios.get(
    //     `${process.env.baseUrl}/wp-json/portl/v1/user/color/`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${data.data.token}`,
    //       },
    //     }
    //   )
    //   if (data.success && data.code === 'jwt_auth_valid_credential') {
    //     const userData = Object.assign(data.data, respuesta.data, {
    //       color: getColorRequest.data.data,
    //     })

    //     setUser(userData)
    //     setNewUser(null)
    //     if (query?.next) {
    //       Router.push(`/${query?.next}`)
    //       return
    //     }

    //     if (userData?.roles.includes('wcfm_vendor')) {
    //       Router.push('/studio')
    //       return
    //     }

    //     Router.push('/')
    //   } else if (!data.success && data.code === 'invalid_email') {
    //     setError(data.message)
    //     setBlocking(false)
    //   } else if (!data.success && data.code === 'incorrect_password') {
    //     setError(
    //       `The email or password you entered is incorrect. Lost your password?`
    //     )
    //     setBlocking(false)
    //   } else {
    //     setError('we have technical problems, reload your browser')
    //     setBlocking(false)
    //   }
    // } catch (e) {
    //   if (e.response) {
    //     const { data } = e.response

    //     if (data?.code === 'bp_account_not_activated') {
    //       setError('bp_account_not_activated')
    //       setBlocking(false)
    //       return
    //     }

    //     if (!data.success && data.code === 'incorrect_password') {
    //       setError(
    //         `The email or password you entered is incorrect. Lost your password?`
    //       )
    //       setBlocking(false)
    //       return
    //     }
    //     if (!data.success && data.code === 'invalid_email') {
    //       setError(
    //         `The email or password you entered is incorrect. Lost your password?`
    //       )
    //       setBlocking(false)
    //       return
    //     }

    //     if (data?.code === 'jwt_auth_obsolete_token') {
    //       signIn(newUser)
    //       return
    //     }
    //   }
    //   setError(
    //     'The email or password you entered is incorrect. Lost your password?'
    //   )
    //   setBlocking(false)
    // }
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
    },
    onSubmit: (values) => signIn(values),
    validationSchema: Yup.object({
      email: Yup.string().required("Email or Username is Required"),
      password: Yup.string()
        .required("Password is Required")
        .min(6, "Password is too short - should be 6 chars minimum."),
    }),
  });

  return (
    <LoginContainer>
      <LayoutAuth>
        <Head>
          <title>elxr | Login</title>
        </Head>
        <Form css={containerBlockUi} onSubmit={login.handleSubmit}>
          {blocking && <BlockUi color="var(--primary)" />}
          {showMsg && (
            <Alert color="success">
              Your password has been successfully reset.
            </Alert>
          )}

          {error === "bp_account_not_activated" ? (
            <Alert color="warning">
              "ERROR: Your account has not been activated. Check your email for
              the activation link. If you have not received an email yet, click{" "}
              <a href="#" onClick={(e) => resendEmailVerification(e)}>
                here
              </a>
              to resend it."
            </Alert>
          ) : null}

          {error && error !== "bp_account_not_activated" ? (
            <Alert color="warning">{error}</Alert>
          ) : null}

          <FormGroup>
            <div className="mb-3">
              <InputDashForm
                required={true}
                name="email"
                type="text"
                label="Email or Username"
                value={login.values.email}
                error={login.errors.email}
                touched={login.touched.email}
                onChange={login.handleChange}
              />
            </div>
            <div className="mb-3">
              <InputDashForm
                required={true}
                name="password"
                type="password"
                label="Password"
                value={login.values.password}
                error={login.errors.password}
                touched={login.touched.password}
                onChange={login.handleChange}
              />
            </div>
          </FormGroup>
          <input
            className="btn btn-block btn-primary"
            value="Sign In"
            type="submit"
          />
          <FormGroup className="d-flex justify-content-between mt-2">
            <a className="link-login" href="/forgot-password">
              Forgot Password
            </a>
            <Link href="/">
              <a className="link-login">Continue as Guest</a>
            </Link>
          </FormGroup>
        </Form>
        <DivCaption className="mt-4">
          <span>Not a Member Yet?</span>
        </DivCaption>
        <AnchorCaption>
          <Link href="/signup">
            <a>Sign Up Now</a>
          </Link>
        </AnchorCaption>
      </LayoutAuth>
    </LoginContainer>
  );
}

export const getServerSideProps = async ({req}) => {

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
