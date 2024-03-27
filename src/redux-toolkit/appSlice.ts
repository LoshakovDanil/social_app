import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { authProfile } from './authSlice'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    initialized: false,
  },
  reducers: {
    initializedSuccess(state) {
      state.initialized = true
    },
  },
  extraReducers: builder => {
    builder.addCase(initialize.fulfilled, state => {
      state.initialized = true
    })
  },
})

export const initialize = createAsyncThunk('app/initialize', async (_, { dispatch }) => {
  await dispatch(authProfile())
})

export const { initializedSuccess } = appSlice.actions
export default appSlice.reducer
