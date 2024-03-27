import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { UsersType } from '../types/types'
import { UserAPI } from '../api/user-api'

const initialState = {
  users: [] as Array<UsersType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  isFollowing: [] as Array<number>,
  filter: {
    term: '',
    friend: null as boolean | null | string,
  },
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    followSuccess(state, action) {
      state.users = state.users.map(user => (user.id === action.payload ? { ...user, followed: true } : user))
    },
    unfollowSuccess(state, action) {
      state.users = state.users.map(user => (user.id === action.payload ? { ...user, followed: false } : user))
    },
    setUsers(state, action) {
      state.users = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setTotalUsers(state, action) {
      state.totalUsersCount = action.payload
    },
    setFilter(state, action) {
      state.filter = action.payload
    },
    toggleIsFetching(state, action) {
      state.isFetching = action.payload
    },
    toggleIsFollowing(state, action) {
      state.isFollowing = action.payload.isFetching
        ? [...state.isFollowing, action.payload.id]
        : state.isFollowing.filter(id => id !== action.payload.id)
    },
  },
})

export const getUsers = createAsyncThunk('users/getUsers', async (getUsersData: getUsers, { dispatch }) => {
  const { currentPage, filter, pageSize } = getUsersData

  dispatch(usersSlice.actions.toggleIsFetching(true))
  dispatch(usersSlice.actions.setCurrentPage(currentPage))
  dispatch(usersSlice.actions.setFilter(filter))

  const data = await UserAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)

  dispatch(usersSlice.actions.setUsers(data.items))
  dispatch(usersSlice.actions.setTotalUsers(data.totalCount))
  dispatch(usersSlice.actions.toggleIsFetching(false))
})

export const follow = createAsyncThunk('users/follow', async (id: number, { dispatch }) => {
  dispatch(usersSlice.actions.toggleIsFollowing({ isFetching: true, id }))

  const data = await UserAPI.subscribeUsers(id)

  if (data.resultCode === 0) {
    dispatch(usersSlice.actions.followSuccess(id))
  }
  dispatch(usersSlice.actions.toggleIsFollowing({ isFetching: false, id }))
})

export const unfollow = createAsyncThunk('users/unfollow', async (id: number, { dispatch }) => {
  dispatch(usersSlice.actions.toggleIsFollowing({ isFetching: true, id }))

  const data = await UserAPI.deleteUsers(id)

  if (data.resultCode === 0) {
    dispatch(usersSlice.actions.unfollowSuccess(id))
  }
  dispatch(usersSlice.actions.toggleIsFollowing({ isFetching: false, id }))
})

type getUsers = {
  currentPage: number
  pageSize: number
  filter: FilterType
}
export type FilterType = typeof initialState.filter

export const {
  followSuccess,
  unfollowSuccess,
  setUsers,
  setCurrentPage,
  setTotalUsers,
  setFilter,
  toggleIsFetching,
  toggleIsFollowing,
} = usersSlice.actions
export default usersSlice.reducer
