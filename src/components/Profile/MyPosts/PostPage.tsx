import { FC } from 'react'

import { useAppSelector } from '../../../hook/hook'
import { MessagesInfo } from '../../../types/types'

import { Post } from './Post/Post'
import { MyPostForm } from './PostForm'

export const MyPostPage: FC = () => {
  const profilePage = useAppSelector(state => state.profile)

  const messagesElement = profilePage.messagesInfo.map((el: MessagesInfo, index: number) => (
    <Post key={index} message={el.message} />
  ))

  return (
    <div>
      <MyPostForm />
      <div>{messagesElement}</div>
    </div>
  )
}
