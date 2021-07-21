import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import alertsReducer from './alerts';
import themeReducer from './theme';
import userReducer from './user';
import localReducer from './local';

const reducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  alerts: alertsReducer,
  local: localReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
