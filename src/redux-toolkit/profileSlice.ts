import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { MessagesInfoType, ProfileType } from '../types/types'
import { ProfileAPI } from '../api/profile-api'

const initialState = {
  messagesInfo: [
    { id: 1, message: 'I like it' },
    { id: 2, message: 'Good' },
    { id: 3, message: 'Nice' },
  ] as Array<MessagesInfoType>,
  profile: null as ProfileType | null,
  status: '---',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    createPost(state, action) {
      state.messagesInfo.push({ id: state.messagesInfo.length + 1, message: action.payload })
    },
    setUserProfile(state, action) {
      state.profile = action.payload
    },
    setUserStatus(state, action) {
      state.status = action.payload
    },
    setUserPhoto(state, action) {
      if (state.profile) {
        state.profile.photos = action.payload
      }
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

export const setUser = createAsyncThunk('profile/setUser', async (userid: number) => {
  return ProfileAPI.getProfile(userid)
})

export const getStatus = createAsyncThunk('profile/getStatus', async (userid: number) => {
  return ProfileAPI.getStatus(userid)
})

export const updateStatus = createAsyncThunk('profile/updateStatus', async (status: string) => {
  const data = await ProfileAPI.updateStatus(status)
  if (data.resultCode === 0) {
    return status
  }
})

export const setPhoto = createAsyncThunk('profile/setPhoto', async (photo: File) => {
  const data = await ProfileAPI.setPhoto(photo)
  if (data.data.resultCode === 0 && data.data.data.photos) {
    return data.data.data.photos
  }
})

export const { createPost, setUserProfile, setUserStatus, setUserPhoto } = profileSlice.actions
export default profileSlice.reducer
