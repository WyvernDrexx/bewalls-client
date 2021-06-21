import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserInfo } from '../../generated/graphql';

export type UserState = {
  info: User | null;
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
    userSignIn(state, action: PayloadAction<UserInfo>) {
      if (action.payload) {
        state.info = action.payload.info || null;
        state.token = action.payload.token || '';
        state.isVerified = action.payload.isVerified;
      } else return state;
    },
    setUserToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { userSignIn, setUserToken } = userSlice.actions;

export default userSlice.reducer;
