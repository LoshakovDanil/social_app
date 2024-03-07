import { FC } from 'react'

import Cat from '../../../../assets/images/cat.jpg'

import s from './Post.module.css'


type Props = {
  message: string
}
export const Post: FC<Props> = props => {
  return (
    <div className={s.content}>
      <img src={Cat} alt="" />
      {props.message}
    </div>
  )
}
