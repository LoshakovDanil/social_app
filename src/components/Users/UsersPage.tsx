import { FC } from 'react'
import { useSelector } from 'react-redux'

import { Preloader } from '../common/Paginator/Preloader'
import { AppStateType } from '../../redux-toolkit/store-redux'

import { Users } from './Users'

const UsersPage: FC = () => {
  const isFetching = useSelector((state: AppStateType) => state.users.isFetching)
  return (
    <div>
      {isFetching ? <Preloader /> : null}
      <Users />
    </div>
  )
}

export default UsersPage
