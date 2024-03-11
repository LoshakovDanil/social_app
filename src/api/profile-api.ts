import { DefaultResponseType, PhotosType, ProfileType } from '../types/types'

import { instance } from './api'

type UpdateStatusResponseType = DefaultResponseType
type GetProfileResponseType = ProfileType
type SetPhotoResponseType = {
  data: {
    photos: PhotosType
  }
  messages: Array<string>
  resultCode: number
}

export const ProfileAPI = {
  getProfile(id: number) {
    return instance.get<GetProfileResponseType>('profile/' + id).then(response => {
      return response.data
    })
  },
  getStatus(id: number) {
    return instance.get<string>('profile/status/' + id).then(response => {
      return response.data
    })
  },
  updateStatus(status: string) {
    return instance.put<UpdateStatusResponseType>('profile/status/', { status: status }).then(response => {
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
