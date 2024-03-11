import { Action, applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authReducer } from './authReducer'
import { dialogReducer } from './dialogReducer'
import { profileReducer } from './profileReducer'
import { usersReducer } from './usersReducer'
import { appReducer } from './appReducer'
import { chatReducer } from './chatReducer'

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  chat: chatReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

type PropertyTypes<T> = T extends { [key: string]: infer R } ? R : never
export type GetActionType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertyTypes<T>>
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export type DispatchType = ThunkDispatch<AppStateType, any, Action>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
