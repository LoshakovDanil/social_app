import { FC } from 'react'

import { useAppSelector } from '../../../hook/hook'
import { MessagesData } from '../../../types/types'

import s from '../Dialogs.module.css'

type Props = {
  text: string
}

const MessageItems: FC = () => {
  const messagesData = useAppSelector(state => state.dialogs.messagesData)

  const MessagesElement = messagesData.map((el: MessagesData, index: number) => (
    <MessageItem key={index} text={el.text} />
  ))

  return <div>{MessagesElement}</div>
}

const MessageItem: FC<Props> = props => {
  return <div className={s.message}> {props.text}</div>
}

export default MessageItems
