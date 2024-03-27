import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AuthAPI } from '../api/auth-api'
import { SecurityAPI } from '../api/security-api'

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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCaptchaData(state, action) {
      state.captcha = action.payload
    },
    setAuthUserData(state, action) {
      state.id = action.payload.id
      state.email = action.payload.email
      state.login = action.payload.login
      state.isAuth = action.payload.isAuth
    },
    setErrorStatus(state, action) {
      state.error = action.payload.error
      state.errorType = action.payload.errorType
    },
    setAuthResponseStatus(state) {
      state.isAuthResponseReceived = true
    },
  },
  extraReducers: builder => {
    builder
      .addCase(authProfile.fulfilled, (state, action) => {
        if (action.payload) {
          const { id, email, login, isAuth } = action.payload
          state.id = id
          state.email = email
          state.login = login
          state.isAuth = isAuth
        }
        state.isAuthResponseReceived = true
      })
      .addCase(logout.fulfilled, state => {
        state.id = null
        state.email = null
        state.login = null
        state.isAuth = false
        state.isAuthResponseReceived = true
      })
  },
})

export const authProfile = createAsyncThunk('auth/authProfile', async () => {
  const data = await AuthAPI.authMe()
  if (data.resultCode === 0) {
    const { id, email, login } = data.data
    return { id, email, login, isAuth: true }
  }
  return null
})

export const logout = createAsyncThunk('auth/logout', async () => {
  const data = await AuthAPI.logout()
  if (data.resultCode === 0) {
    return
  }
  throw new Error('Logout failed')
})

export const login = createAsyncThunk('auth/login', async (loginData: Login, { dispatch }) => {
  const { email, password, rememberMe = false, captcha } = loginData
  const data = await AuthAPI.login(email, password, rememberMe, captcha)

  if (data.resultCode === 0) {
    dispatch(authProfile())
    dispatch(authSlice.actions.setErrorStatus({ error: '', errorType: 0 }))
  } else if (data.resultCode === 1) {
    dispatch(authSlice.actions.setErrorStatus({ error: data.messages[0], errorType: 1 }))
  } else if (data.resultCode === 10) {
    dispatch(getCaptcha())
    dispatch(authSlice.actions.setErrorStatus({ error: data.messages[0], errorType: 10 }))
  }
})

export const getCaptcha = createAsyncThunk('auth/getCaptcha', async (_, { dispatch }) => {
  const data = await SecurityAPI.getCaptcha()
  dispatch(authSlice.actions.setCaptchaData(data.url))
})

type Login = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string | null
}

export const { setCaptchaData, setAuthUserData, setErrorStatus, setAuthResponseStatus } = authSlice.actions
export default authSlice.reducer
