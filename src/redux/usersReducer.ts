import { UserAPI } from '../api/user-api'
import { UsersType } from '../types/types'

import { BaseThunkType, GetActionType } from './store-redux'

const initialState = {
  users: [] as Array<UsersType>,
  pageSize: 10, //count users on page
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  isFollowing: [] as Array<number>,
  filter: {
    term: '',
    friend: null as boolean | null | string,
  },
}

export type InitialStateType = typeof initialState
export const usersReducer = (state = initialState, action: ActionType): InitialStateType => {
  if (action.type === 'FOLLOW_AC') {
    return {
      ...state,
      users: [
        ...state.users.map(e => {
          if (e.id === action.userID) {
            return {
              ...e,
              followed: true,
            }
          }
          return e
        }),
      ],
    }
  } else if (action.type === 'UNFOLLOW_AC') {
    return {
      ...state,
      users: [
        ...state.users.map(e => {
          if (e.id === action.userID) {
            return {
              ...e,
              followed: false,
            }
          }
          return e
        }),
      ],
    }
  } else if (action.type === 'SET_USERS') {
    return {
      ...state,
      users: [...action.users],
    }
  } else if (action.type === 'UPDATE_PAGE') {
    return {
      ...state,
      currentPage: action.currentPage,
    }
  } else if (action.type === 'UPDATE_TOTAL_USERS') {
    return {
      ...state,
      totalUsersCount: action.totalUsersCount,
    }
  } else if (action.type === 'TOGGLE_IS_FETCHING') {
    return {
      ...state,
      isFetching: action.isFetching,
    }
  } else if (action.type === 'TOGGLE_IS_FOLLOWING') {
    return {
      ...state,
      isFollowing: action.isFetching ? [...state.isFollowing, action.id] : state.isFollowing.filter(id => id !== action.id),
    }
  } else if (action.type === 'SET_FILTER') {
    return {
      ...state,
      filter: action.payload,
    }
  }
  return state
}

export const actions = {
  followSuccesec: (userID: number) => ({ type: 'FOLLOW_AC', userID }) as const,
  unfollowSuccesec: (userID: number) => ({ type: 'UNFOLLOW_AC', userID }) as const,
  setUsers: (users: Array<UsersType>) => ({ type: 'SET_USERS', users }) as const,
  setCurrentPage: (currentPage: number) => ({ type: 'UPDATE_PAGE', currentPage }) as const,
  setTotalUsers: (totalUsersCount: number) => ({ type: 'UPDATE_TOTAL_USERS', totalUsersCount }) as const,
  setFilter: (payload: FilterType) => ({ type: 'SET_FILTER', payload }) as const,
  toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching }) as const,
  toggleIsFollowing: (isFetching: boolean, id: number) => ({ type: 'TOGGLE_IS_FOLLOWING', isFetching, id }) as const,
}

export const getUsers =
  (currentPage: number, pageSize: number, filter: FilterType): ThunkType =>
  async dispatch => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setFilter(filter))

    const data = await UserAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)

    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsers(data.totalCount))
    dispatch(actions.toggleIsFetching(false))
  }

export const follow =
  (id: number): ThunkType =>
  async dispatch => {
    dispatch(actions.toggleIsFollowing(true, id))
    const data = await UserAPI.subscribeUsers(id)
    if (data.resultCode === 0) {
      dispatch(actions.followSuccesec(id))
    }
    dispatch(actions.toggleIsFollowing(false, id))
  }

export const unfollow =
  (id: number): ThunkType =>
  async dispatch => {
    dispatch(actions.toggleIsFollowing(true, id))
    const data = await UserAPI.deleteUsers(id)
    if (data.resultCode === 0) {
      dispatch(actions.unfollowSuccesec(id))
    }
    dispatch(actions.toggleIsFollowing(false, id))
  }

export type FilterType = typeof initialState.filter
type ActionType = GetActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>
