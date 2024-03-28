import { DefaultResponse, Photos, Profile } from '../types/types'

import { instance } from './api'

type UpdateStatus = DefaultResponse
type GetProfile = Profile
type SetPhotoResponseType = {
  data: {
    photos: Photos
  }
  messages: Array<string>
  resultCode: number
}

export const ProfileAPI = {
  getProfile(id: number) {
    return instance.get<GetProfile>('profile/' + id).then(response => {
      return response.data
    })
  },
  getStatus(id: number) {
    return instance.get<string>('profile/status/' + id).then(response => {
      return response.data
    })
  },
  updateStatus(status: string) {
    return instance.put<UpdateStatus>('profile/status/', { status: status }).then(response => {
      return response.data
    })
  },
  setPhoto(photo: File) {
    const formData = new FormData()
    formData.append('image', photo)
    return instance.put<SetPhotoResponseType>('profile/photo', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
  },
}
