import { createSlice } from "@reduxjs/toolkit";

export const OutcomeStatus = {
    Success: "SUCCESS",
    Failure: "FAILURE",
    Unspecified: "UNSPECIFIED",
}

const initialState = {
    actionOutcome: {
        outcomeStatus: OutcomeStatus.Unspecified,
        outcomeMessage: "",
    },
};

const dialogSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        setActionOutcome(state, action) {
            state.actionOutcome = action.payload;
        },
        setSuccessDialog(state, action) {
            state.actionOutcome = {
                outcomeStatus: OutcomeStatus.Success,
                outcomeMessage: action.payload,
            };
        },
        setFailureDialog(state, action) {
            state.actionOutcome = {
                outcomeStatus: OutcomeStatus.Failure,
                outcomeMessage: action.payload,
            };
        },
        resetDialogState(state) {
            state.actionOutcome = {
                outcomeStatus: OutcomeStatus.Unspecified,
                outcomeMessage: "",
            };
        },
    },
});

export const { setActionOutcome, setSuccessDialog, setFailureDialog, resetDialogState } = dialogSlice.actions;
export default dialogSlice.reducer;
