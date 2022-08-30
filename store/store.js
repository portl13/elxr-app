import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { createLogger } from 'redux-logger';

// import authInfoReducer from './features/auth-info/auth-info-slice';
// import dashInfoReducer from './features/dash-info/dash-info-slice';
// import onboardingPrefsReducer from './features/onboarding-prefs/onboarding-prefs-slice';
// import mealplanReducer from './features/mealplan/mealplan-slice';
// import recipesReducer from './features/recipes/recipes-slice';
// import journalReducer from './features/journal/journal-slice';
// import shoppingListReducer from './features/shopping-list/shopping-list-slice';
// import userProfileReducer from './features/user-profile/user-profile-slice';
// import libraryReducer from './features/library/library-slice';
// import dialogReducer from './features/dialog/dialog-slice';
// import loaderReducer from './features/loader/loader-slice';
// import createOwnRecipeReducer from './features/create-own-recipe/create-own-recipe-slice';
// import channelReducer from './features/channel/channel-slice';
import messageReducer from './features/messages/message-slice';

export const createStore = (preloadedState) => {
  const middlewares = [];
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  middlewares.push(logger);
  return configureStore({
    reducer: {
      // loader: loaderReducer,
      // authInfo: authInfoReducer,
      // dashInfo: dashInfoReducer,
      // onboardingPrefs: onboardingPrefsReducer,
      // mealplan: mealplanReducer,
      // recipes: recipesReducer,
      // journal: journalReducer,
      // shoppingList: shoppingListReducer,
      // userProfile: userProfileReducer,
      // library: libraryReducer,
      // dialog: dialogReducer,
      // createOwnRecipe: createOwnRecipeReducer,
      // channelState: channelReducer,
      messageState: messageReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
    devTools: true,
  });
};

let store;
const initializeStore = (preloadedState) => {
  let _store = store || createStore(preloadedState);

  if (preloadedState && store) {
    _store = createStore({ ...store.getState(), ...preloadedState });
    store = null;
  }

  if (typeof window === 'undefined') {
    return _store;
  }

  if (!store) {
    store = _store;
  }

  return store;
};

export const useStore = (preloadedState) => initializeStore(preloadedState);

export const useAppDispatch = () => useDispatch();

export const useAppSelector = useSelector;
