import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Colors = {
  primary: string;
  secondary: string;
  dark: string;
  light: string;
  isDark: boolean;
};

export type ThemeState = {
  mode: 'dark' | 'light';
  colors: Colors;
};

const LIGHT_THEME: Colors = {
  primary: 'white',
  secondary: 'black',
  light: '#F7F7F7',
  dark: 'black',
  isDark: false,
};

const DARK_THEME: Colors = {
  primary: '#293064',
  secondary: '#AFCADE',
  light: '#505DAC',
  dark: 'black',
  isDark: true,
};

const initialState: ThemeState = {
  mode: 'light',
  colors: LIGHT_THEME,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.mode = action.payload;
      state.colors = action.payload === 'dark' ? DARK_THEME : LIGHT_THEME;
    },
  },
});

export default themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;
