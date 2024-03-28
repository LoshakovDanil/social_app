import { DefaultResponse } from '../types/types'

import { instance } from './api'

type AuthMeResponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  messages: Array<string>
  resultCode: number
}
type LoginResponseType = {
  data: {
    userId: number
  }
  messages: Array<string>
  resultCode: number
}
type LogoutResponseType = DefaultResponse

export const AuthAPI = {
  authMe() {
    return instance.get<AuthMeResponseType>('auth/me').then(response => {
      return response.data
    })
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    const requestData = { email, password, rememberMe, captcha }
    return instance.post<LoginResponseType>('auth/login', requestData).then(response => {
      return response.data
    })
  },
  logout() {
    return instance.delete<LogoutResponseType>('auth/login').then(response => {
      return response.data
    })
  },
}
