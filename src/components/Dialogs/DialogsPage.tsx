import { FC } from 'react'

import { DialogsData } from '../../types/types'
import { useAppSelector } from '../../hook/hook'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'

import { DialogsForm } from './DialogsForm/DialogsForm'
import DialogItem from './DialogItem/DialogItem'
import MessageItems from './MessageItem/MessageItems'

import s from './Dialogs.module.css'

const DialogsPage: FC = () => {
  const dialogsData = useAppSelector(state => state.dialogs.dialogsData)

  const DialogsElement = dialogsData.map((el: DialogsData, index: number) => (
    <DialogItem key={index} name={el.name} id={el.id} />
  ))

  return (
    <div className={s.container}>
      <div className={s.dialogs}>{DialogsElement}</div>
      <div className={s.messages}>
        <MessageItems />
      </div>
      <div>
        <DialogsForm />
      </div>
    </div>
  )
}

export default withAuthRedirect(DialogsPage)
