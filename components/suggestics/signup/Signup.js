import React from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

// Stack

import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  setAuthInfoFirstName,
  setAuthInfoLastName,
  setAuthInfoNickName,
  setAuthInfoActivationCode,
  setAuthInfoEmail,
  setAuthInfoPassword,
  setPasswordConfirm,
  setAuthInfoIsLoading,
  setAuthInfoRegisterError,
  resetShowPasswords,
  setShowPassword,
  setShowPasswordConfirm,
} from "../../../store/features/auth-info/auth-info-slice";
import {
  lowerCaseLetters,
  symbols,
  upperCaseLetters,
} from "../settings/change-personal-info/ChangePersonalInfo";

const DUPLICATE_ACCOUNT =
  "An account already exists with this email. Please try again or login to existing account.";
const INVALID_PASSWORD = "The password provided is invalid.";
const INVALID_ACTIVATION_CODE = "The activation code provided is invalid.";
const GENERIC_ERROR =
  "There is an error creating your account please try again.";

export const doesPasswordContainSymbols = (password) => {
  return !!password.match(symbols);
};

export const doesPasswordContainNumbers = (password) => {
  return !!password.match(upperCaseLetters);
};

export const doesPasswordContainUppercase = (password) => {
  return !!password.match(upperCaseLetters);
};

export const doesPasswordContainLowercase = (password) => {
  return !!password.match(lowerCaseLetters);
};

export const isPasswordMinimum8Characters = (password) => {
  return password.length >= 8;
};

export const isPasswordInvalid = (password) => {
  return (
    !isPasswordMinimum8Characters(password) ||
    !doesPasswordContainNumbers(password) ||
    !doesPasswordContainUppercase(password) ||
    !doesPasswordContainLowercase(password) ||
    !doesPasswordContainSymbols(password)
  );
};

export const Signup = () => {
  const firstName = useAppSelector((state) => state.authInfo.firstName);
  const lastName = useAppSelector((state) => state.authInfo.lastName);
  const nickName = useAppSelector((state) => state.authInfo.nickName);
  const email = useAppSelector((state) => state.authInfo.email);
  const password = useAppSelector((state) => state.authInfo.password);
  const passwordConfirm = useAppSelector(
    (state) => state.authInfo.passwordConfirm
  );
  const showPassword = useAppSelector((state) => state.authInfo.showPassword);
  const showPasswordConfirm = useAppSelector(
    (state) => state.authInfo.showPasswordConfirm
  );
  const activationCode = useAppSelector(
    (state) => state.authInfo.activationCode
  );
  const isLoading = useAppSelector((state) => state.authInfo.isLoading);
  const registerError = useAppSelector((state) => state.authInfo.registerError);

  const dispatch = useAppDispatch();

  const isNewPasswordInvalid = () => {
    return (
      !password ||
      password === "" ||
      password != passwordConfirm ||
      isPasswordInvalid(password)
    );
  };

  async function registerUser(regInfo) {
    const apiKey = "yiPqMLclb34zsg1tbp4ap2oIjVFBqEDb5XbqDXED";

    const hdrs = new Headers();
    hdrs.append("x-api-key", apiKey);

    const body = new Blob([JSON.stringify(regInfo, null, 2)], {
      type: "application/json",
    });

    const init = {
      method: "POST",
      headers: hdrs,
      body: body,
    };
    const resp = await fetch(
      "https://xxy7wgfop2.execute-api.us-west-2.amazonaws.com/stage/register",
      init
    );

    if (!resp.ok) {
      if (resp.status == 400) {
        // get details
        const details = await resp.json();
        throw Error("cannot register: " + details.status);
      } else {
        throw Error("cannot register user: status " + resp.status);
      }
    }

    const data = await resp.json(); // TODO: type json response with interface

    console.log("Data", data);
  }

  async function tryCreateUser() {
    dispatch(setAuthInfoIsLoading(true));

    try {
      await registerUser({
        email,
        firstName,
        lastName,
        nickName,
        userPassword: password,
        activationCode,
      });

      dispatch(resetShowPasswords());
      dispatch(setAuthInfoIsLoading(false));
      dispatch(setAuthInfoRegisterError(""));
      // navigate(RoutePath.Verify);
    } catch (e) {
      if (e instanceof Error) {
        console.log("Error occurred in user registration:", e.message);
        if (e.message.includes("duplicate"))
          dispatch(setAuthInfoRegisterError(DUPLICATE_ACCOUNT));
        else if (e.message.includes("invalid password"))
          dispatch(setAuthInfoRegisterError(INVALID_PASSWORD));
        else if (e.message.includes("invalid activation code"))
          dispatch(setAuthInfoRegisterError(INVALID_ACTIVATION_CODE));
        else dispatch(setAuthInfoRegisterError(GENERIC_ERROR));
      }
      dispatch(setAuthInfoIsLoading(false));
      userHasAuthenticated(false);
    }
  }

  function validateForm() {
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      nickName.length > 0 &&
      email.length > 0 &&
      activationCode.length > 0 &&
      !isNewPasswordInvalid()
    );
  }

  return (
    <div className="Signup">
      Suggestic Signup
      {/* <Stack m={2} spacing={2} direction="column"
                   alignSelf={"center"} alignItems="center" justifyContent="center"
            >
                <TextField
                    autoFocus
                    fullWidth
                    id="first-name-input"
                    name="first-name"
                    label="First Name"
                    type="text"
                    color="secondary"
                    value={firstName}
                    onChange={(e) => dispatch(setAuthInfoFirstName(e.target.value))}
                />
                <TextField
                    fullWidth
                    id="last-name-input"
                    name="last-name"
                    label="Last Name"
                    type="text"
                    color="secondary"
                    value={lastName}
                    onChange={(e) => dispatch(setAuthInfoLastName(e.target.value))}
                />
                <TextField
                    fullWidth
                    id="preferred-name-input"
                    name="preferred-name"
                    label="Preferred Name"
                    type="text"
                    color="secondary"
                    value={nickName}
                    onChange={(e) => dispatch(setAuthInfoNickName(e.target.value))}
                />
                <TextField
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
                                    aria-label="toggle password visibility"
                                    onClick={() => dispatch(setShowPassword(!showPassword))}
                                >
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    fullWidth
                    id="confirm-password-input"
                    name="confirm-password"
                    label="Confirm Password"
                    type={showPasswordConfirm ? "text" : "password"}
                    color="secondary"
                    value={passwordConfirm}
                    onChange={(e) => dispatch(setPasswordConfirm(e.target.value))}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password confirm visibility"
                                    onClick={() => dispatch(setShowPasswordConfirm(!showPasswordConfirm))}
                                >
                                    {showPasswordConfirm ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    error={password != passwordConfirm && passwordConfirm != ""}
                    helperText={password != passwordConfirm && passwordConfirm != "" ? "Passwords must match" : ""}
                />
                <TextField
                    fullWidth
                    id="activation-code-input"
                    name="activation-code"
                    label="Activation Code"
                    type="text"
                    color="secondary"
                    value={activationCode}
                    onChange={(e) => dispatch(setAuthInfoActivationCode(e.target.value))}
                />
                {
                    registerError.length > 0
                    &&
                    <Alert severity="error" sx={{justifyContent: "center", alignContent: "center"}}>
                        {registerError}
                    </Alert>
                }
                <LoaderButton size="large" type="submit" variant="contained"
                              isLoading={isLoading} fullWidth
                              disabled={!validateForm()}
                              onClick={tryCreateUser}
                >
                    Sign Up
                </LoaderButton>
            </Stack>
            {
                // TODO: Factor out this code as something like <PasswordRequirementsChecklist>
                password.length > 0
                    ?
                    <Stack m={2} spacing={1} direction="column"
                           alignSelf={"center"} alignItems="center" justifyContent="center"
                    >
                        <Typography>
                            Password must contain the following:
                        </Typography>
                        <Alert sx={{width: "100%", justifyContent: "center", alignContent: "center"}}
                               severity={doesPasswordContainLowercase(password) ? "success" : "error"}
                        >
                            A lowercase letter
                        </Alert>
                        <Alert sx={{width: "100%", justifyContent: "center", alignContent: "center"}}
                               severity={doesPasswordContainUppercase(password) ? "success" : "error"}
                        >
                            An uppercase letter
                        </Alert>
                        <Alert sx={{width: "100%", justifyContent: "center", alignContent: "center"}}
                               severity={doesPasswordContainSymbols(password) ? "success" : "error"}
                        >
                            A symbol (e.g. &%$#@)
                        </Alert>
                        <Alert sx={{width: "100%", justifyContent: "center", alignContent: "center"}}
                               severity={isPasswordMinimum8Characters(password) ? "success" : "error"}
                        >
                            A minimum of 8 characters
                        </Alert>
                    </Stack>
                    :
                    null
            } */}
    </div>
  );
};
