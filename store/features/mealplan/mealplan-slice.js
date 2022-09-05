import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  currentMealplan: [],
  mealToSwap: {},
  recommendedSwaps: [],
  favoriteSwaps: [],
  addToShoppingListMode: false,
  addToMealPlanMode: false,
  refetchMealPlan: false,
  mealplanModal: false,
  swapMealData: {},
};

const mealplanSlice = createSlice({
  name: 'mealplan',
  initialState,
  reducers: {
    setCurrentMealplan(state, action) {
      state.currentMealplan = action.payload;
    },
    setMealToSwap(state, action) {
      state.mealToSwap = action.payload;
    },
    setRecommendedSwaps(state, action) {
      state.recommendedSwaps = action.payload;
    },
    setFavoriteSwaps(state, action) {
      state.favoriteSwaps = action.payload;
    },
    setAddToShoppingListMode(state, action) {
      state.addToShoppingListMode = action.payload;
    },
    setAddToMealPlanMode(state, action) {
      state.addToMealPlanMode = action.payload;
    },
    setRefetchMealPlan(state, action) {
      state.refetchMealPlan = action.payload;
    },
    resetMealplanData(state) {
      state = initialState;
    },
    setMealPlanModal(state, action) {
      state.mealplanModal = action.payload;
    },
    setSwapMealData(state, action) {
      state.swapMealData = action.payload;
    },
  },
});

export const {
  setCurrentMealplan,
  setMealToSwap,
  setRecommendedSwaps,
  setFavoriteSwaps,
  setAddToShoppingListMode,
  setAddToMealPlanMode,
  setRefetchMealPlan,
  resetMealplanData,
  setMealPlanModal,
  setSwapMealData,
} = mealplanSlice.actions;
export default mealplanSlice.reducer;
