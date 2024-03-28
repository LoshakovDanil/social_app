import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { MessagesInfo, Photos, Profile } from '../types/types'
import { ProfileAPI } from '../api/profile-api'

const initialState = {
  messagesInfo: [
    { id: 1, message: 'I like it' },
    { id: 2, message: 'Good' },
    { id: 3, message: 'Nice' },
  ] as Array<MessagesInfo>,
  profile: null as Profile | null,
  status: '---',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    createPost(state, action: PayloadAction<string>) {
      state.messagesInfo.push({ id: state.messagesInfo.length + 1, message: action.payload })
    },
    setUserStatus(state, action: PayloadAction<string>) {
      state.status = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(setUser.fulfilled, (state, action) => {
        state.profile = action.payload
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.status = action.payload
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = action.payload
        } else {
          console.log('ERROR')
        }
      })
      .addCase(setPhoto.fulfilled, (state, action) => {
        if (state.profile && action.payload !== undefined) {
          state.profile.photos = action.payload
        }
      })
  },
})

export const setUser = createAsyncThunk<Profile, number>('profile/setUser', async userid => {
  return ProfileAPI.getProfile(userid)
})

export const getStatus = createAsyncThunk<string, number>('profile/getStatus', async userid => {
  return ProfileAPI.getStatus(userid)
})

export const updateStatus = createAsyncThunk<string | undefined, string>('profile/updateStatus', async status => {
  const data = await ProfileAPI.updateStatus(status)
  if (data.resultCode === 0) {
    return status
  }
})

export const setPhoto = createAsyncThunk<Photos | undefined, File>('profile/setPhoto', async photo => {
  const data = await ProfileAPI.setPhoto(photo)
  if (data.data.resultCode === 0 && data.data.data.photos) {
    return data.data.data.photos
  }
})

export const { createPost, setUserStatus } = profileSlice.actions
export default profileSlice.reducer
