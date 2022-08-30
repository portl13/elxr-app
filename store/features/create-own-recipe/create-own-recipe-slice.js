import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    recipeName: "",
    totalTime: "",
    numberOfServings: 0,
    mealTime: "",
    ingredientSearchTerm: "",
    ingredientSearchResults: [],
    recipeIngredients: [],
    ingredientLines: [""],
    instructions: [""],
};

const createOwnRecipeSlice = createSlice({
    name: "create-own-recipe",
    initialState,
    reducers: {
        setRecipeName(state, action) {
            state.recipeName = action.payload;
        },
        setTotalTime(state, action) {
            state.totalTime = action.payload;
        },
        setNumberOfServings(state, action) {
            state.numberOfServings = action.payload;
        },
        setMealTime(state, action) {
            state.mealTime = action.payload;
        },
        setIngredientSearchTerm(state, action) {
            state.ingredientSearchTerm = action.payload;
        },
        setIngredientSearchResults(state, action) {
            state.ingredientSearchResults = action.payload;
        },
        setRecipeIngredients(state, action) {
            state.recipeIngredients = action.payload;
        },
        setIngredientLines(state, action) {
            state.ingredientLines = action.payload;
        },
        setInstructions(state, action) {
            state.instructions = action.payload;
        },
    },
});

export const {
    setRecipeName,
    setTotalTime,
    setMealTime,
    setNumberOfServings,
    setIngredientSearchTerm,
    setIngredientSearchResults,
    setRecipeIngredients,
    setIngredientLines,
    setInstructions,
} = createOwnRecipeSlice.actions;
export default createOwnRecipeSlice.reducer;
