import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserInfo } from '../../generated/graphql';

export type UserState = {
  info: User | null;
  token: string;
  isVerified?: boolean;
};

const initialState: UserState = {
  info: null,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6ImRzZHNkc2QiLCJpZCI6ImY1OGE2ZDA2LTZkOGQtNDBkYy05YzE2LTQxY2JlYmY3YzQ0NyIsImlhdCI6MTYyNDI0OTg0OH0.5SI4-0ksyhDxyqih-9Cxg2BX5GIfFjPKbARO34jJ-FA',
  isVerified: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSignIn(state, action: PayloadAction<UserInfo>) {
      state.info = action.payload.info || null;
      state.token = action.payload.token || '';
      state.isVerified = action.payload.isVerified;
    },
  },
});

export const { userSignIn } = userSlice.actions;

export default userSlice.reducer;
