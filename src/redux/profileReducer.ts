import { ProfileAPI } from '../api/proifle-api'
import { MessagesInfoType, PhotosType, ProfileType } from '../types/types'

import { BaseThunkType, GetActionType } from './store-redux'

const initialState = {
  messagesInfo: [
    { id: 1, message: 'I like it' },
    { id: 2, message: 'Good' },
    { id: 3, message: 'Nice' },
  ] as Array<MessagesInfoType>,
  profile: null as ProfileType | null,
  status: '---',
}

type InitialStateType = typeof initialState

export const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
  if (action.type === 'NEW_POST') {
    return {
      ...state,
      messagesInfo: [...state.messagesInfo, { id: 4, message: action.newMessageBody }],
    }
  } else if (action.type === 'SET_USER_PROFILE') {
    return {
      ...state,
      profile: action.profile,
    }
  } else if (action.type === 'SET_STATUS') {
    return {
      ...state,
      status: action.status,
    }
  } else if (action.type === 'SET_USER_PHOTO') {
    return {
      ...state,
      profile: { ...state.profile, photos: action.photos } as ProfileType,
    }
  }

  return state
}

export const actions = {
  createPost: (newMessageBody: string) => ({ type: 'NEW_POST', newMessageBody }) as const,
  setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', profile }) as const,
  setUserStatus: (status: string) => ({ type: 'SET_STATUS', status }) as const,
  updateUserPhoto: (photos: PhotosType) => ({ type: 'SET_USER_PHOTO', photos }) as const,
}

type ActionType = GetActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>

export const setUser =
  (userid: number): ThunkType =>
  async dispatch => {
    const data = await ProfileAPI.getProfile(userid)
    dispatch(actions.setUserProfile(data))
  }
export const setStatus =
  (userid: number): ThunkType =>
  async dispatch => {
    const data = await ProfileAPI.getStatus(userid)
    dispatch(actions.setUserStatus(data))
  }
export const updateStatus =
  (status: string): ThunkType =>
  async dispatch => {
    const data = await ProfileAPI.updateStatus(status)
    if (data.resultCode === 0) {
      dispatch(actions.setUserStatus(status))
    }
  }
export const setPhoto =
  (
    photo: File,
  ): ThunkType => // maybe refactor?
  async dispatch => {
    const data = await ProfileAPI.setPhoto(photo)
    if (data.data.resultCode === 0) {
      dispatch(actions.updateUserPhoto(data.data.data.photos))
    }
  }
