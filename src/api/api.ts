import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { 'API-KEY': process.env.REACT_APP_API_KEY },
  withCredentials: true,
})
