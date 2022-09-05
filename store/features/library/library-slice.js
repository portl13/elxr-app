import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedLibraryItem: {},
};

const librarySlice = createSlice({
    name: "library",
    initialState,
    reducers: {
        setLibraryItem(state, action) {
            state.selectedLibraryItem = action.payload;
        },
        resetLibraryState(state) {
            state = initialState;
        },
    },
});

export const { setLibraryItem, resetLibraryState } = librarySlice.actions;
export default librarySlice.reducer;
