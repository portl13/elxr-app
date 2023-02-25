import React from "react";
import { useAlert } from "react-alert";
import Alert from "@material-ui/lab/Alert";
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { TIMEOUT } from "../../../../utils/constant";
import {
  AccountCircleOutlined,
  Close,
  NavigateNext,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  setAuthInfoPassword,
  setPasswordConfirm,
  setOldPassword,
  setShowPassword,
  setShowOldPassword,
  setShowPasswordConfirm,
  resetShowPasswords,
} from "../../../../store/features/auth-info/auth-info-slice";
// import {Auth} from "aws-amplify";
import {
  doesPasswordContainLowercase,
  doesPasswordContainSymbols,
  doesPasswordContainUppercase,
  isPasswordInvalid,
  isPasswordMinimum8Characters,
} from "../../signup/Signup";

export const lowerCaseLetters = /[a-z]/g;
export const upperCaseLetters = /[A-Z]/g;
export const numbers = /[0-9]/g;
export const symbols = /[^a-zA-Z\d]/g;

export const ChangePersonalInfo = () => {
  const alert = useAlert();
  const oldPassword = useAppSelector((state) => state.authInfo.oldPassword);
  const newPassword = useAppSelector((state) => state.authInfo.password);
  const newPasswordConfirm = useAppSelector(
    (state) => state.authInfo.passwordConfirm
  );
  const showPassword = useAppSelector((state) => state.authInfo.showPassword);
  const showPasswordConfirm = useAppSelector(
    (state) => state.authInfo.showPasswordConfirm
  );
  const showOldPassword = useAppSelector(
    (state) => state.authInfo.showOldPassword
  );

  const [changePersonalInfoOpen, setChangePersonalInfoOpen] =
    React.useState(false);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(resetShowPasswords());
    setChangePersonalInfoOpen(false);
  };

  const handleOpen = () => {
    setChangePersonalInfoOpen(true);
  };

  const isChangePasswordButtonDisabled = () => {
    return (
      !oldPassword ||
      oldPassword === "" ||
      !newPassword ||
      newPassword === "" ||
      newPassword != newPasswordConfirm ||
      isPasswordInvalid(newPassword)
    );
  };

  const handleSubmit = async () => {
    try {
      const user = await new Promise((resolve, reject) => {
        resolve("");
      });
      // await Auth.currentUserPoolUser();
      if (user) {
        const result = await new Promise((resolve, reject) => {
          resolve("");
        });
        // await Auth.changePassword(user, oldPassword, newPassword)
        if (result === "SUCCESS") {
          dispatch(setOldPassword(""));
          dispatch(setAuthInfoPassword(""));
          dispatch(setPasswordConfirm(""));
          alert.success("Password was successfully changed!", TIMEOUT);
          dispatch(resetShowPasswords());
        }
      }
    } catch (e) {
      alert.error("An error occurred while changing password...", TIMEOUT);
    }
  };

  return (
    <div className="ChangePersonalInfo">
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        color={"secondary"}
        startIcon={<AccountCircleOutlined />}
        endIcon={<NavigateNext />}
        onClick={handleOpen}
      >
        <Typography>Personal Info</Typography>
      </Button>
      <Dialog
        fullScreen
        open={changePersonalInfoOpen}
        onClose={handleClose}
        sx={{ justifyContent: "center" }}
      >
        <AppBar
          sx={{ position: "relative", marginBottom: 2 }}
          color="transparent"
        >
          <Toolbar>
            <Button
              variant="text"
              sx={{ width: "100%" }}
              color="error"
              startIcon={<Close />}
              onClick={handleClose}
            >
              <Typography alignSelf={"center"}>Cancel</Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <Typography variant="h5" gutterBottom textAlign="center">
          Personal Info
        </Typography>
        {/*Name*/}
        {/*<TextField*/}
        {/*    fullWidth*/}
        {/*    id="name-input"*/}
        {/*    name="name"*/}
        {/*    label="Name"*/}
        {/*    type="text"*/}
        {/*    color="secondary"*/}
        {/*    // value={formValues.name}*/}
        {/*    // onChange={handleInputChange}*/}
        {/*/>*/}
        {/*Email pinned*/}
        {/*<TextField*/}
        {/*    fullWidth*/}
        {/*    id="email-input"*/}
        {/*    name="email"*/}
        {/*    label="Email"*/}
        {/*    type="text"*/}
        {/*    color="secondary"*/}
        {/*    value={userProfile.email}*/}
        {/*    disabled={true}*/}
        {/*    // onChange={handleInputChange}*/}
        {/*/>*/}
        {/*Old password*/}
        <TextField
          fullWidth
          id="old-password-input"
          name="old-password"
          label="Old Password"
          type={showOldPassword ? "text" : "password"}
          color="secondary"
          value={oldPassword}
          onChange={(e) => dispatch(setOldPassword(e.target.value))}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle old password visibility"
                  onClick={() => dispatch(setShowOldPassword(!showOldPassword))}
                >
                  {showOldPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/*New password*/}
        <TextField
          fullWidth
          id="new-password-input"
          name="new-password"
          label="New Password"
          type={showPassword ? "text" : "password"}
          color="secondary"
          value={newPassword}
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
        {/*Confirm new password*/}
        <TextField
          fullWidth
          id="confirm-new-password-input"
          name="confirm-new-password"
          label="Confirm New Password"
          type={showPasswordConfirm ? "text" : "password"}
          color="secondary"
          value={newPasswordConfirm}
          onChange={(e) => dispatch(setPasswordConfirm(e.target.value))}
          error={newPassword != newPasswordConfirm && newPasswordConfirm != ""}
          helperText={
            newPassword != newPasswordConfirm && newPasswordConfirm != ""
              ? "Passwords must match"
              : ""
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle new password confirm visibility"
                  onClick={() =>
                    dispatch(setShowPasswordConfirm(!showPasswordConfirm))
                  }
                >
                  {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          disabled={isChangePasswordButtonDisabled()}
          color="secondary"
          variant="contained"
          onClick={handleSubmit}
        >
          Change Password
        </Button>
        {newPassword.length > 0 && (
          <Stack
            spacing={1}
            direction="column"
            alignSelf={"center"}
            alignItems="center"
            justifyContent="center"
            sx={{ width: "80%" }}
          >
            <Typography>New password must contain the following:</Typography>
            <Alert
              sx={{
                width: "100%",
                justifyContent: "center",
                alignContent: "center",
              }}
              severity={
                doesPasswordContainLowercase(newPassword) ? "success" : "error"
              }
            >
              A lowercase letter
            </Alert>
            <Alert
              sx={{
                width: "100%",
                justifyContent: "center",
                alignContent: "center",
              }}
              severity={
                doesPasswordContainUppercase(newPassword) ? "success" : "error"
              }
            >
              An uppercase letter
            </Alert>
            <Alert
              sx={{
                width: "100%",
                justifyContent: "center",
                alignContent: "center",
              }}
              severity={
                doesPasswordContainSymbols(newPassword) ? "success" : "error"
              }
            >
              A symbol (e.g. &%$#@)
            </Alert>
            <Alert
              sx={{
                width: "100%",
                justifyContent: "center",
                alignContent: "center",
              }}
              severity={
                isPasswordMinimum8Characters(newPassword) ? "success" : "error"
              }
            >
              A minimum of 8 characters
            </Alert>
          </Stack>
        )}
      </Dialog>
    </div>
  );
};
