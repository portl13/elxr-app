import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  daysAgoIndex: 0,
  trackedMealPlanDay: {},
  mealTracker: [],
  weeklyMealTracker: [],
  waterIntake: 0,
  weeklyWaterIntake: [],
  waterChartData: [],
  dailyRecapQuestions: {},
  currentWeight: '',
  weightData: [],
  weeklyWeightData: [],
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setDaysAgoIndex(state, action) {
      state.daysAgoIndex = action.payload;
    },
    setTrackedMealPlanDay(state, action) {
      state.trackedMealPlanDay = action.payload;
    },
    setMealTracker(state, action) {
      state.mealTracker = action.payload;
    },
    setWeeklyMealTracker(state, action) {
      state.weeklyMealTracker = action.payload;
    },
    setWaterIntake(state, action) {
      state.waterIntake = action.payload;
    },
    setWeeklyWaterIntake(state, action) {
      state.weeklyWaterIntake = action.payload;
    },
    setWaterChartData(state, action) {
      state.waterChartData = action.payload;
    },
    setDailyRecapQuestions(state, action) {
      state.dailyRecapQuestions = action.payload;
    },
    setCurrentWeight(state, action) {
      state.currentWeight = action.payload;
    },
    setWeightData(state, action) {
      state.weightData = action.payload;
    },
    setWeeklyWeightData(state, action) {
      state.weeklyWeightData = action.payload;
    },
    resetFoodLogData(state) {
      state = initialState;
    },
  },
});

export const {
  setDaysAgoIndex,
  setTrackedMealPlanDay,
  setMealTracker,
  setWeeklyMealTracker,
  setWaterIntake,
  setWeeklyWaterIntake,
  setWaterChartData,
  setDailyRecapQuestions,
  setCurrentWeight,
  setWeightData,
  setWeeklyWeightData,
  resetFoodLogData,
} = journalSlice.actions;
export default journalSlice.reducer;
