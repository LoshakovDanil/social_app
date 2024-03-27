import { configureStore } from '@reduxjs/toolkit'

import appSlice from './appSlice'
import authSlice from './authSlice'
import profileSlice from './profileSlice'
import dialogSlice from './dialogSlice'
import usersSlice from './usersSlice'
import chatSlice from './chatSlice'

const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
    profile: profileSlice,
    dialogs: dialogSlice,
    users: usersSlice,
    chat: chatSlice,
  },
})

export type AppStateType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

//@ts-ignore
window.store = store
export default store
