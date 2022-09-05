import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentList: [],
    shoppingListByRecipe: [],
    shoppingRecipeIdList: [],
    toAddList: [],
    isDoneList: [],
    byAisleMode: true,
};

const shoppingListSlice = createSlice({
    name: "shoppingList",
    initialState,
    reducers: {
        setCurrentShoppingList(state, action) {
            state.currentList = action.payload;
        },
        setShoppingListByRecipe(state, action) {
            state.shoppingListByRecipe = action.payload;
        },
        setShoppingRecipeIdList(state, action) {
            state.shoppingRecipeIdList = action.payload;
        },
        setToAddList(state, action) {
            state.toAddList = action.payload;
        },
        setIsDoneList(state, action) {
            state.isDoneList = action.payload;
        },
        setByAisleMode(state, action) {
            state.byAisleMode = action.payload;
        },
        resetShoppingList(state) {
            state = initialState;
        },
    },
});

export const {
    setCurrentShoppingList,
    setShoppingListByRecipe,
    setShoppingRecipeIdList,
    setToAddList,
    setIsDoneList,
    setByAisleMode,
    resetShoppingList,
} = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
