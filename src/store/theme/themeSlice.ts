import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = {
  primary: string;
  secondary: string;
  dark: string;
  light: string;
};

type ThemeState = {
  mode: 'dark' | 'light';
  theme: Theme;
};

const LIGHT_THEME: Theme = {
  primary: 'white',
  secondary: 'black',
  light: '#F7F7F7',
  dark: 'black',
};

const DARK_THEME: Theme = {
  primary: '#293064',
  secondary: '#AFCADE',
  light: '#505DAC',
  dark: 'black',
};

const initialState: ThemeState = {
  mode: 'light',
  theme: LIGHT_THEME,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.mode = action.payload;
      state.theme = action.payload === 'dark' ? DARK_THEME : LIGHT_THEME;
    },
  },
});

export default themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;
