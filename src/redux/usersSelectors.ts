import { AppStateType } from './store-redux'

export const mstpGetUsersSelector = (state: AppStateType) => {
  return state.usersPage.users
}

export const mstpGetPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize
}

export const mstpGetTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount
}

export const mstpGetCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage
}

export const mstpGetIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching
}

export const mstpGetIsFollowing = (state: AppStateType) => {
  return state.usersPage.isFollowing
}
export const mstpGetFilter = (state: AppStateType) => {
  return state.usersPage.filter
}
export const mstpGetInitialized = (state: AppStateType) => {
  return state.app.initialized
}
export const mstpGetIsAuth = (state: AppStateType) => {
  return state.auth.isAuth
}
export const mstpGetLogin = (state: AppStateType) => {
  return state.auth.login
}
export const mstpGetProfile = (state: AppStateType) => {
  return state.profilePage.profile
}
export const mstpGetId = (state: AppStateType) => {
  return state.auth.id
}
export const mstpGetAuthResponse = (state: AppStateType) => {
  return state.auth.isAuthResponseReceived
}
export const mstpGetStatus = (state: AppStateType) => {
  return state.profilePage.status
}
export const mstpGetProfilePage = (state: AppStateType) => {
  return state.profilePage
}
export const mstpGetDialogsPage = (state: AppStateType) => {
  return state.dialogsPage
}
