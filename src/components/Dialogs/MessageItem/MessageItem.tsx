import { FC } from 'react'

import s from '../Dialogs.module.css'

type Props = {
  text: string
}
const MessageItem: FC<Props> = props => {
  return <div className={s.message}> {props.text}</div>
}

export default MessageItem
