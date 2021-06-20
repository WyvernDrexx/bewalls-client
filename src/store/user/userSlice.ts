import { User } from '@react-native-google-signin/google-signin';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  info: User | null;
  signedIn: boolean;
};

const initialState: UserState = {
  info: null,
  signedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSignIn(state, action: PayloadAction<User>) {
      state.info = action.payload;
      state.signedIn = true;
    },
  },
});

export const { userSignIn } = userSlice.actions;

export default userSlice.reducer;
