import { instance } from './api'

export const SecurityAPI = {
  getCaptcha() {
    return instance.get<string>('security/get-captcha-url').then(response => {
      return response.data
    })
  },
}
