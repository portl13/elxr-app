import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
};

const userDetailslice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { setUserDetails } = userDetailslice.actions;
export default userDetailslice.reducer;
