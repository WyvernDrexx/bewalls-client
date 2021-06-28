import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Colors = {
  primary: string;
  secondary: string;
  dark: string;
  light: string;
};

export type ThemeState = {
  mode: 'dark' | 'light';
  colors: Colors;
  isDark: boolean;
};

const LIGHT_THEME: Colors = {
  primary: 'white',
  secondary: 'black',
  light: '#F7F7F7',
  dark: '#f5f5f5',
};

const DARK_THEME: Colors = {
  primary: '#293064',
  secondary: '#AFCADE',
  light: '#505DAC',
  dark: '#212652',
};

const initialState: ThemeState = {
  mode: 'light',
  colors: LIGHT_THEME,
  isDark: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.mode = action.payload;
      state.colors = action.payload === 'dark' ? DARK_THEME : LIGHT_THEME;
      state.isDark = action.payload === 'dark';
    },
  },
});

export default themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;
