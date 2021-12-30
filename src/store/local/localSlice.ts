import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppVersion } from '../../generated/graphql';

type InitialState = {
  profileImageUri: string | null;
  appVersion: AppVersion | null
};

const initialState: InitialState = {
  profileImageUri: null,
  appVersion: null
};

const localSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {
    updateProfileImageUri(state, action: PayloadAction<string | null>) {
      if (action.payload) {
        if (!action.payload.includes('file://')) {
          state.profileImageUri = 'file://' + action.payload;
        } else {
          state.profileImageUri = action.payload;
        }
      } else {
        state.profileImageUri = null;
      }
    },
    updateAppVersion(state, action: PayloadAction<AppVersion | null>) {
      state.appVersion = action.payload
    }
  },
});

export const { updateProfileImageUri, updateAppVersion } = localSlice.actions;
export default localSlice.reducer;
