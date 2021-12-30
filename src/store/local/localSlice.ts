import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppVersion } from '../../generated/graphql'

export type RevisionsHistory = {
  meta: {
    lastShown: number | null
  }
  versions: AppVersion | null
}

type InitialState = {
  profileImageUri: string | null
  appRevisionsHistory: RevisionsHistory
}

const initialState: InitialState = {
  profileImageUri: null,
  appRevisionsHistory: {
    meta: {
      lastShown: null
    },
    versions: null
  }
}

const localSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {
    updateProfileImageUri(state, action: PayloadAction<string | null>) {
      if (action.payload) {
        if (!action.payload.includes('file://')) {
          state.profileImageUri = 'file://' + action.payload
        } else {
          state.profileImageUri = action.payload
        }
      } else {
        state.profileImageUri = null
      }
    },
    updateAppRevision(state, action: PayloadAction<RevisionsHistory>) {
      state.appRevisionsHistory = { ...state.appRevisionsHistory, ...action.payload }
    },
    updateAppRevisonDate(state, action: PayloadAction<number>) {
      state.appRevisionsHistory.meta.lastShown = action.payload
    }
  }
})

export const { updateProfileImageUri, updateAppRevision, updateAppRevisonDate } = localSlice.actions
export default localSlice.reducer
