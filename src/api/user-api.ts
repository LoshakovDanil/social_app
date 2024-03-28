import { DefaultResponse, Users } from '../types/types'

import { instance } from './api'

type GetUsersResponseType = {
  items: Array<Users>
  totalCount: number
  error: string
}

export const UserAPI = {
  subscribeUsers(id: number) {
    return instance.post<DefaultResponse>('follow/' + id).then(response => {
      return response.data
    })
  },
  deleteUsers(id: number) {
    return instance.delete<DefaultResponse>('follow/' + id).then(response => {
      return response.data
    })
  },
  getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean | string) {
    const params = {
      page: currentPage,
      count: pageSize,
      term: term || null,
      friend: friend || null,
    }
    return instance.get<GetUsersResponseType>('users', { params }).then(response => {
      return response.data
    })
  },
}
