import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  communityUserId: "",
  newMessageCount: 0
};

const messageSlice = createSlice({
  name: "messageState",
  initialState,
  reducers: {
    setCommunityUserId(state, action) {
      state.communityUserId = action.payload;
    },
    setNewMessageCount(state, action) {
      state.newMessageCount = action.payload
    }
  },
});

export const { setCommunityUserId, setNewMessageCount } = messageSlice.actions;
export default messageSlice.reducer;
