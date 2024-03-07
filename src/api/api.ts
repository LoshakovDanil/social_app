import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { 'API-KEY': '99869ba6-ae2c-4dca-8701-aa1dcb18dda8' },
  withCredentials: true,
})
