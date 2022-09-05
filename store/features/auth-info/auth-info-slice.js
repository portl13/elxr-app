import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    firstName: "",
    lastName: "",
    nickName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    oldPassword: "",
    showPassword: false,
    showPasswordConfirm: false,
    showOldPassword: false,
    activationCode: "",
    isLoading: false,
    elxrToken: "",
    suggesticToken: "",
    otp: "",
    loginError: "",
    registerError: "",
    verifyError: "",
};

const authInfoSlice = createSlice({
    name: "authInfo",
    initialState,
    reducers: {
        setAuthInfo(state, action) {
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                nickName: action.payload.nickName,
                email: action.payload.email,
                password: action.payload.password,
                isLoading: action.payload.isLoading,
            }
        },
        setAuthInfoFirstName(state, action) {
            state.firstName = action.payload;
        },
        setAuthInfoLastName(state, action) {
            state.lastName = action.payload;
        },
        setAuthInfoNickName(state, action) {
            state.nickName = action.payload;
        },
        setAuthInfoEmail(state, action) {
            state.email = action.payload;
        },
        setAuthInfoPassword(state, action) {
            state.password = action.payload;
        },
        setShowPassword(state, action) {
            state.showPassword = action.payload;
        },
        setShowPasswordConfirm(state, action) {
            state.showPasswordConfirm = action.payload;
        },
        setShowOldPassword(state, action) {
            state.showOldPassword = action.payload;
        },
        resetShowPasswords(state) {
            return {
                ...state,
                showPassword: false,
                showOldPassword: false,
                showPasswordConfirm: false,
            }
        },
        setPasswordConfirm(state, action) {
            state.passwordConfirm = action.payload;
        },
        setOldPassword(state, action) {
            state.oldPassword = action.payload;
        },
        setAuthInfoActivationCode(state, action) {
            state.activationCode = action.payload;
        },
        setAuthInfoIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        setAuthInfoElxrToken(state, action) {
            state.elxrToken = action.payload;
        },
        setAuthInfoSuggesticToken(state, action) {
            state.suggesticToken = action.payload;
        },
        setAuthInfoOtp(state, action) {
            state.otp = action.payload;
        },
        setAuthInfoLoginError(state, action) {
            state.loginError = action.payload;
        },
        setAuthInfoRegisterError(state, action) {
            state.registerError = action.payload;
        },
        setAuthInfoVerifyError(state, action) {
            state.verifyError = action.payload;
        },
        resetAuthInfo(state) {
            state = initialState;
        },
    },
});

export const {
    setAuthInfo,
    setAuthInfoFirstName,
    setAuthInfoLastName,
    setAuthInfoNickName,
    setAuthInfoEmail,
    setAuthInfoPassword,
    setPasswordConfirm,
    setOldPassword,
    setShowPassword,
    setShowPasswordConfirm,
    setShowOldPassword,
    resetShowPasswords,
    setAuthInfoActivationCode,
    setAuthInfoIsLoading,
    setAuthInfoElxrToken,
    setAuthInfoSuggesticToken,
    setAuthInfoOtp,
    setAuthInfoLoginError,
    setAuthInfoRegisterError,
    setAuthInfoVerifyError,
    resetAuthInfo,
} = authInfoSlice.actions;
export default authInfoSlice.reducer;
