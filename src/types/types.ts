export type DialogsDataType = {
  name: string
  id: number
}
export type MessagesDataType = {
  text: string
}
export type MessagesInfoType = {
  id: number
  message: string
}
export type ContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}
export type PhotosType = {
  small: string | null
  large: string | null
}
export type ProfileType = {
  aboutMe: string
  contacts: ContactsType
  fullName: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
  photos: PhotosType
  userId: number
}
export type UsersType = {
  id: number
  name: string
  status: string
  photos: PhotosType
  followed: boolean
}
export type DefaultResponseType = {
  data: unknown
  messages: Array<string>
  resultCode: number
}
