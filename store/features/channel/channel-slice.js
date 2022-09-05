import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channelSideBar: false,
};

const channelSlice = createSlice({
  name: "channelState",
  initialState,
  reducers: {
    setChannelSideBar(state, action) {
      state.channelSideBar = action.payload;
    },
  },
});

export const { setChannelSideBar } = channelSlice.actions;
export default channelSlice.reducer;
