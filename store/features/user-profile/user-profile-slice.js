import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: {},
    myprofile: {}
};

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {
        setUserProfile(state, action) {
            state.profile = action.payload;
        },
        resetUserProfile(state) {
            state = initialState;
        },
        setMyProfile(state, action) {
            state.myprofile = action.payload
        }
    },
});

export const { setUserProfile, resetUserProfile, setMyProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
