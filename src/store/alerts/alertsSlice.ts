import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Alert = {
  message: string;
  type: 'error' | 'warning' | 'normal' | 'success';
};

const initialState: Alert[] = [];

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<Alert>) => {
      const match = state.find(item => item.message === action.payload.message);
      if (match) return;
      state.push(action.payload);
    },
    removeAlert: state => {
      state.shift();
    },
  },
});

export const { showAlert, removeAlert } = alertsSlice.actions;

export default alertsSlice.reducer;
