import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import s from '../Dialogs.module.css'

type Props = {
  id: number
  name: string
}
const DialogItem: FC<Props> = ({ id, name }) => {
  const path = '/dialogs/' + id
  return (
    <div className={s.dialog}>
      <NavLink to={path}>{name}</NavLink>
    </div>
  )
}

export default DialogItem
