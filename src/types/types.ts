export type DialogsData = {
  name: string
  id: number
}
export type MessagesData = {
  text: string
}
export type MessagesInfo = {
  id: number
  message: string
}
export type Contacts = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}
export type Photos = {
  small: string | null
  large: string | null
}
export type Profile = {
  aboutMe: string
  contacts: Contacts
  fullName: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
  photos: Photos
  userId: number
}
export type Users = {
  id: number
  name: string
  status: string
  photos: Photos
  followed: boolean
}
export type DefaultResponse = {
  data: unknown
  messages: Array<string>
  resultCode: number
}
