import React from "react";

import "./PasscodeVerification.scss";

import { useAppDispatch, useAppSelector } from "../../../store/store";
import { Typography } from "@material-ui/core";
import Alert from "@material-ui/lab";
import { OneTimePasscode } from "../one-time-passcode/OneTimePasscode";
// import {Auth} from "aws-amplify";
import {
  setAuthInfoVerifyError,
  setAuthInfoIsLoading,
  setAuthInfoLoginError,
} from "../../../store/features/auth-info/auth-info-slice";
// import {useNavigate} from "react-router-dom";
// import {useAppContext} from "../../lib/contextLib";
import { LoaderButton } from "../../../components/buttons/loader-button/LoaderButton";
// import {RoutePath} from "../../RouteList";

export const PasscodeVerification = () => {
  const otp = useAppSelector((state) => state.authInfo.otp);
  const email = useAppSelector((state) => state.authInfo.email);
  const password = useAppSelector((state) => state.authInfo.password);
  const isLoading = useAppSelector((state) => state.authInfo.isLoading);
  const verifyError = useAppSelector((state) => state.authInfo.verifyError);

  const dispatch = useAppDispatch();
  // let navigate = useNavigate();
  // const {userHasAuthenticated} = useAppContext();

  function validateOtp() {
    return otp.length === 6;
  }

  async function confirmAccount() {
    dispatch(setAuthInfoIsLoading(true));
    try {
      const resp = await new Promise((resolve, reject) => {
        resolve("");
      });
      // await Auth.confirmSignUp(email, otp);
      console.log("Confirm account result:", resp);
      dispatch(setAuthInfoIsLoading(false));
      dispatch(setAuthInfoVerifyError(""));
      await tryLoginSimple();
    } catch (ex) {
      dispatch(setAuthInfoIsLoading(false));
      if (ex.name === "ExpiredCodeException") {
        dispatch(
          setAuthInfoVerifyError(
            "One-time passcode has expired. New code sent. Please check email."
          )
        );
        requestNewCode(email);
      } else if (ex.name === "CodeMismatchException") {
        dispatch(setAuthInfoVerifyError("Code submitted is not correct."));
      } else {
        dispatch(
          setAuthInfoVerifyError(
            "An error occurred during verification. Please try again"
          )
        );
      }
    }
  }

  async function requestNewCode(userName) {
    return await new Promise((resolve, reject) => {
      resolve("");
    });
    // Auth.resendSignUp(userName)
  }

  async function tryLoginSimple() {
    dispatch(setAuthInfoIsLoading(true));

    try {
      dispatch(setAuthInfoLoginError(""));
      // let user = await Auth.signIn(email, password);
      dispatch(setAuthInfoIsLoading(false));
      userHasAuthenticated(true);
      // navigate(RoutePath.Dashboard);
    } catch (ex) {
      console.log("Failed login", ex);
      userHasAuthenticated(false);
      // navigate(RoutePath.Login);
    }
  }

  return (
    <div className="PasscodeVerification">
      <Typography variant="h4" gutterBottom component="div">
        Verification
      </Typography>
      <Typography variant="body2" color="text.secondary">
        A One Time Passcode has been sent to your email for verification
        purposes. Please enter it below:
      </Typography>
      <OneTimePasscode />
      <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <LoaderButton
          size="large"
          type="submit"
          variant="contained"
          isLoading={isLoading}
          fullWidth
          disabled={!validateOtp()}
          onClick={async (e) => {
            e.preventDefault();
            await confirmAccount();
          }}
        >
          Verify
        </LoaderButton>
        {/*TODO: Add "send new passcode" button*/}
      </div>
      {verifyError.length > 0 && (
        <Alert
          severity="error"
          sx={{ justifyContent: "center", alignContent: "center" }}
        >
          {verifyError}
        </Alert>
      )}
    </div>
  );
};
