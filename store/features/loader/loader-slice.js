import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
};

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setLoaderStatus(state, action) {
            state.isLoading = action.payload;
        }
    },
});

export const { setLoaderStatus } = loaderSlice.actions;
export default loaderSlice.reducer;
