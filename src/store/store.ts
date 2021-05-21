import { combineReducers, configureStore } from '@reduxjs/toolkit';

import themeReducer from './theme';

const reducer = combineReducers({
  theme: themeReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
