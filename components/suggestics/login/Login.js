// import { Auth } from 'aws-amplify';
// import {useAppContext} from "../../lib/contextLib";
// import { useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  setAuthInfoEmail,
  setAuthInfoPassword,
  setAuthInfoIsLoading,
  setAuthInfoLoginError,
  setShowPassword,
  resetShowPasswords,
} from "../../../store/features/auth-info/auth-info-slice";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { LoaderButton } from "../../components/buttons/loader-button/LoaderButton";
import { RoutePath } from "../../RouteList";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export const Login = () => {
  const email = useAppSelector((state) => state.authInfo.email);
  const password = useAppSelector((state) => state.authInfo.password);
  const showPassword = useAppSelector((state) => state.authInfo.showPassword);
  const isLoading = useAppSelector((state) => state.authInfo.isLoading);
  const loginError = useAppSelector((state) => state.authInfo.loginError);

  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(RoutePath.Dashboard);
    }
  }, []);

  async function setNewPassword(user) {
    // TODO: what do we actually want to do here?
    const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
    dispatch(setAuthInfoPassword("ElxrLife$1m"));
    // return await Auth.completeNewPassword(
    //     user,               // the Cognito User Object
    //     password,       // the new password
    //     // OPTIONAL, the required attributes
    //     /*{
    //         email: 'xxxx@example.com',
    //         phone_number: '1234567890'
    //     }*/
    // )
  }

  async function tryLogin() {
    dispatch(setAuthInfoLoginError(""));
    dispatch(setAuthInfoIsLoading(true));

    try {
      // let user = await Auth.signIn(email, password);
      // if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
      //     user = await setNewPassword(user)
      // }/* else {
      //     // other situations
      //     console.log("User:", user);
      // }*/

      dispatch(resetShowPasswords());
      dispatch(setAuthInfoIsLoading(false));
      dispatch(setAuthInfoLoginError(""));
      userHasAuthenticated(true);
      // navigate(RoutePath.Dashboard);
    } catch (ex) {
      dispatch(setAuthInfoIsLoading(false));
      if (ex.name === "UserNotConfirmedException") {
        navigate(RoutePath.Verify);
      } else {
        dispatch(
          setAuthInfoLoginError(
            "Unable to login. Please check details and try again."
          )
        );
        console.log("Failed login", ex);
        userHasAuthenticated(false);
      }
    }
  }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  return (
    <div className="Login">
      {/*TODO: add onSubmit and form infrastructure so that you can hit enter key instead of clicking button*/}
      {/*TODO: add forgot password functionality*/}

      <TextField
        autoFocus
        fullWidth
        id="email-input"
        name="email"
        label="Email"
        type="text"
        color="secondary"
        value={email}
        onChange={(e) => dispatch(setAuthInfoEmail(e.target.value))}
      />
      <TextField
        fullWidth
        id="password-input"
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        color="secondary"
        value={password}
        onChange={(e) => dispatch(setAuthInfoPassword(e.target.value))}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle new password visibility"
                onClick={() => dispatch(setShowPassword(!showPassword))}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {loginError.length > 0 ? (
        <Alert
          severity="error"
          sx={{ justifyContent: "center", alignContent: "center" }}
        >
          {loginError}
        </Alert>
      ) : null}
      <LoaderButton
        size="large"
        type="submit"
        variant="contained"
        isLoading={isLoading}
        fullWidth
        disabled={!validateForm()}
        onClick={tryLogin}
      >
        Login
      </LoaderButton>
      {/*<LoaderButton size="large" type="submit" variant="contained"*/}
      {/*              isLoading={isLoading} fullWidth*/}
      {/*              disabled={!validateForm()}*/}
      {/*              onClick={tryLogin}*/}
      {/*>*/}
      {/*    Login*/}
      {/*</LoaderButton>*/}
    </div>
  );
};
