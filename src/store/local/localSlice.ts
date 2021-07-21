import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  profileImageUri: string | null;
};

const initialState: InitialState = {
  profileImageUri: null,
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
  },
});

export const { updateProfileImageUri } = localSlice.actions;
export default localSlice.reducer;
