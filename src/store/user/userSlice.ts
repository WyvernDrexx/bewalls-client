import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../generated/graphql';

export type UserState = {
  info?: User | null;
  token: string;
  isVerified: boolean;
};

const initialState: UserState = {
  info: null,
  token: '',
  isVerified: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSignIn(state, action: PayloadAction<User | null | undefined>) {
      if (action.payload) {
        state.info = action.payload;
        state.token = state.token;
        state.isVerified = true;
      } else return state;
    },
    setUserToken(state, action: PayloadAction<string | null>) {
      if (action.payload !== null) state.token = action.payload;
    },
    userLogOut() {
      return initialState;
    },
  },
});

export const { userSignIn, setUserToken, userLogOut } = userSlice.actions;

export default userSlice.reducer;
