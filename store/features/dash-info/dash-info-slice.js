import { createSlice } from '@reduxjs/toolkit';

export const dashSlideTitles = [
  'Meal Plan',
  'Recipes',
  'Journal',
  'Shopping List',
  'Restaurants',
  'Library',
  'Settings',
];

const initialState = {
  slideIndex: 'default',
  notifications: [],
};

const dashInfoSlice = createSlice({
  name: 'dashInfo',
  initialState,
  reducers: {
    setSlideIndex(state, action) {
      state.slideIndex = action.payload;
    },
    resetDashInfo(state) {
      state = initialState;
    },
    setNotifications(state,action) {
      state.notifications = action.payload;
    },
  },
});

export const { setSlideIndex, resetDashInfo, setNotifications } = dashInfoSlice.actions;
export default dashInfoSlice.reducer;
