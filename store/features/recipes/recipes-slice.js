import { createSlice } from '@reduxjs/toolkit';

export const INITIAL_RECIPE_COUNT = 10;
export const RECIPE_COUNT_INCREMENT = 10;

const BLANK_RECIPE = {
    name: "",
    mainImage: "",
};

const BLANK_RECIPE_LIST = [
    BLANK_RECIPE,
    BLANK_RECIPE,
    BLANK_RECIPE,
    BLANK_RECIPE,
    BLANK_RECIPE,
];

const initialState = {
    currentSearchTerm: "",
    onPlanSearchResults: [],
    otherSearchResults: [],

    favoriteRecipes: [],
    popularRecipes: BLANK_RECIPE_LIST,
    breakfastRecipes: BLANK_RECIPE_LIST,
    lunchRecipes: BLANK_RECIPE_LIST,
    dinnerRecipes: BLANK_RECIPE_LIST,
    snackRecipes: BLANK_RECIPE_LIST,
    dessertRecipes: BLANK_RECIPE_LIST,
    userRecipes: [],

    favoriteRecipesCount: INITIAL_RECIPE_COUNT,
    popularRecipesCount: INITIAL_RECIPE_COUNT,
    breakfastRecipesCount: INITIAL_RECIPE_COUNT,
    lunchRecipesCount: INITIAL_RECIPE_COUNT,
    dinnerRecipesCount: INITIAL_RECIPE_COUNT,
    snackRecipesCount: INITIAL_RECIPE_COUNT,
    dessertRecipesCount: INITIAL_RECIPE_COUNT,
    userRecipesCount: INITIAL_RECIPE_COUNT,

    favoriteRecipesLoading: false,
    popularRecipesLoading: false,
    breakfastRecipesLoading: false,
    lunchRecipesLoading: false,
    dinnerRecipesLoading: false,
    snackRecipesLoading: false,
    dessertRecipesLoading: false,
    userRecipesLoading: false,

    selectedRecipe: {},

    paginationloader: ""
};

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        setCurrentSearchTerm(state, action) {
            state.currentSearchTerm = action.payload;
        },
        setOnPlanSearchResults(state, action) {
            state.onPlanSearchResults = action.payload;
        },
        setOtherSearchResults(state, action) {
            state.otherSearchResults = action.payload;
        },

        setFavoriteRecipes(state, action) {
            state.favoriteRecipes = action.payload;
        },
        setPopularRecipes(state, action) {
            state.popularRecipes = action.payload;
        },
        setBreakfastRecipes(state, action) {
            state.breakfastRecipes = action.payload;
        },
        setLunchRecipes(state, action) {
            state.lunchRecipes = action.payload;
        },
        setDinnerRecipes(state, action) {
            state.dinnerRecipes = action.payload;
        },
        setSnackRecipes(state, action) {
            state.snackRecipes = action.payload;
        },
        setDessertRecipes(state, action) {
            state.dessertRecipes = action.payload;
        },
        setUserRecipes(state, action) {
            state.userRecipes = action.payload;
        },

        setFavoriteRecipesCount(state, action) {
            state.favoriteRecipesCount = action.payload;
        },
        setPopularRecipesCount(state, action) {
            state.popularRecipesCount = action.payload;
        },
        setBreakfastRecipesCount(state, action) {
            state.breakfastRecipesCount = action.payload;
        },
        setLunchRecipesCount(state, action) {
            state.lunchRecipesCount = action.payload;
        },
        setDinnerRecipesCount(state, action) {
            state.dinnerRecipesCount = action.payload;
        },
        setSnackRecipesCount(state, action) {
            state.snackRecipesCount = action.payload;
        },
        setDessertRecipesCount(state, action) {
            state.dessertRecipesCount = action.payload;
        },
        setUserRecipesCount(state, action) {
            state.userRecipesCount = action.payload;
        },

        setSelectedRecipe(state, action) {
            state.selectedRecipe = action.payload;
        },

        setFavoriteRecipesLoading(state, action) {
            state.favoriteRecipesLoading = action.payload;
        },
        setPopularRecipesLoading(state, action) {
            state.popularRecipesLoading = action.payload;
        },
        setBreakfastRecipesLoading(state, action) {
            state.breakfastRecipesLoading = action.payload;
        },
        setLunchRecipesLoading(state, action) {
            state.lunchRecipesLoading = action.payload;
        },
        setDinnerRecipesLoading(state, action) {
            state.dinnerRecipesLoading = action.payload;
        },
        setSnackRecipesLoading(state, action) {
            state.snackRecipesLoading = action.payload;
        },
        setDessertRecipesLoading(state, action) {
            state.dessertRecipesLoading = action.payload;
        },
        setUserRecipesLoading(state, action) {
            state.userRecipesLoading = action.payload;
        },

        resetRecipeSearch(state) {
            state = initialState;
        },
        setPaginationLoader(state, action) {
            state.paginationloader = action.payload;
        },
    },
});

export const {
    setCurrentSearchTerm,
    setOnPlanSearchResults,
    setOtherSearchResults,
    setFavoriteRecipes,
    setPopularRecipes,
    setBreakfastRecipes,
    setLunchRecipes,
    setDinnerRecipes,
    setSnackRecipes,
    setDessertRecipes,
    setUserRecipes,
    setFavoriteRecipesCount,
    setPopularRecipesCount,
    setBreakfastRecipesCount,
    setLunchRecipesCount,
    setDinnerRecipesCount,
    setSnackRecipesCount,
    setDessertRecipesCount,
    setUserRecipesCount,
    setFavoriteRecipesLoading,
    setPopularRecipesLoading,
    setBreakfastRecipesLoading,
    setLunchRecipesLoading,
    setDinnerRecipesLoading,
    setSnackRecipesLoading,
    setDessertRecipesLoading,
    setUserRecipesLoading,
    setSelectedRecipe,
    resetRecipeSearch,
    setPaginationLoader
} = recipesSlice.actions;
export default recipesSlice.reducer;
