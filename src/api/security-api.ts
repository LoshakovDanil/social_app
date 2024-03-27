import { instance } from './api'

interface CaptchaResponse {
  url: string
}

export const SecurityAPI = {
  getCaptcha() {
    return instance.get<CaptchaResponse>('security/get-captcha-url').then(response => {
      return response.data
    })
  },
}
