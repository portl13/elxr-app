import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const Motivation = {
    NotSpecified: "Not Specified",
    EatBetter: "Eat Better",
    ImproveHealthCondition: "Improve Health Condition",
    LoseWeight: "Lose Weight",
}

export const FocusArea = {
    NotSpecified: "Not Specified",
    IncreaseEnergy: "Increase Energy",
    BoostImmunity: "Boost Immunity",
    IncreaseMentalClarity: "Increase Mental Clarity",
    LowerInflammation: "Lower Inflammation",
    ImprovePerformance: "Improve Performance",
    NoneOfTheAbove: "None Of The Above",
}

const initialState = {
    slideIndex: 0,
    allPrograms: {},
    chosenProgramId: "",
    allRestrictions: {},
    chosenRestrictions: [],
    mainMotivation: Motivation.NotSpecified,
    focusArea: FocusArea.NotSpecified,
};

const onboardingPrefsSlice = createSlice({
    name: "onboarding",
    initialState,
    reducers: {
        setSlideIndex(state, action) {
            state.slideIndex = action.payload;
        },
        setAllPrograms(state, action) {
            state.allPrograms = action.payload;
        },
        setChosenProgramId(state, action) {
            state.chosenProgramId = action.payload;
        },
        setAllRestrictions(state, action) {
            state.allRestrictions = action.payload;
        },
        setChosenRestrictions(state, action) {
            state.chosenRestrictions = action.payload;
        },
        setMainMotivation(state, action) {
            state.mainMotivation = action.payload;
        },
        setFocusArea(state, action) {
            state.focusArea = action.payload;
        },
    },
});

export const { setSlideIndex, setAllPrograms, setChosenProgramId, setAllRestrictions, setChosenRestrictions, setMainMotivation, setFocusArea } = onboardingPrefsSlice.actions;
export default onboardingPrefsSlice.reducer;
