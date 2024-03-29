import { FC } from 'react'

import { useAppSelector } from '../../hook/hook'
import { Preloader } from '../common/Paginator/Preloader'

import { Users } from './Users'

const UsersPage: FC = () => {
  const isFetching = useAppSelector(state => state.users.isFetching)
  return (
    <div>
      {isFetching ? <Preloader /> : null}
      <Users />
    </div>
  )
}

export default UsersPage
