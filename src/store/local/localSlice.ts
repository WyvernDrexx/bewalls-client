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
      state.profileImageUri = 'file://' + action.payload;
    },
  },
});

export const { updateProfileImageUri } = localSlice.actions;
export default localSlice.reducer;
