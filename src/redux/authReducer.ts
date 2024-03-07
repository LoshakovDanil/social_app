import { AuthAPI } from '../api/auth-api'
import { SecurityAPI } from '../api/security-api'

import { BaseThunkType, GetActionType } from './store-redux'

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captcha: null as string | null,
  error: '',
  errorType: 0,
  isAuthResponseReceived: false,
}
type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionType): InitialStateType => {
  if (action.type === 'SET_AUTH_USER_DATA') {
    return {
      ...state,
      ...action.data,
    }
  } else if (action.type === 'SET_CAPTCHA_DATA') {
    return {
      ...state,
      captcha: action.url,
    }
  } else if (action.type === 'SET_ERROR_STATUS') {
    return {
      ...state,
      error: action.error,
      errorType: action.errorType,
    }
  } else if (action.type === 'SET_AUTH_RESPONSE_STATUS') {
    return {
      ...state,
      isAuthResponseReceived: true,
    }
  }
  return state
}

export const actions = {
  setCaptchaData: (url: string) => ({ type: 'SET_CAPTCHA_DATA', url }) as const,
  setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({ type: 'SET_AUTH_USER_DATA', data: { id, email, login, isAuth } }) as const,
  setErrorStatus: (error: string, errorType: number) => ({ type: 'SET_ERROR_STATUS', error, errorType }) as const,
  setAuthResponseStatus: () => ({ type: 'SET_AUTH_RESPONSE_STATUS' }) as const,
}

type ActionType = GetActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>

export const authProfile = (): ThunkType => async dispatch => {
  const data = await AuthAPI.authMe()
  if (data.resultCode === 0) {
    const { id, email, login } = data.data
    dispatch(actions.setAuthUserData(id, email, login, true))
  }
  dispatch(actions.setAuthResponseStatus())
}

export const login =
  (email: string, password: string, rememberMe = false, captcha?: string | null): ThunkType =>
  async dispatch => {
    const data = await AuthAPI.login(email, password, rememberMe, captcha)

    if (data.resultCode === 0) {
      dispatch(authProfile())
      dispatch(actions.setErrorStatus('', 0))
    } else if (data.resultCode === 1) {
      dispatch(actions.setErrorStatus(data.messages[0], 1))
    } else if (data.resultCode === 10) {
      dispatch(getCaptcha())
      dispatch(actions.setErrorStatus(data.messages[0], 10))
    }
  }

export const getCaptcha = (): ThunkType => async dispatch => {
  const data = await SecurityAPI.getCaptcha()
  // const captchaResponse = data.url
  dispatch(actions.setCaptchaData(data))
}

export const logout = (): ThunkType => async dispatch => {
  const data = await AuthAPI.logout()
  if (data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}
