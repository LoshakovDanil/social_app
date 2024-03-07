import { FC } from 'react'
import { useSelector } from 'react-redux'

import { mstpGetIsFetching } from '../../redux/usersSelectors'

import { Preloader } from '../common/Paginator/Preloader'

import { Users } from './Users'

const UsersPage: FC = () => {
  const isFetching = useSelector(mstpGetIsFetching)
  return (
    <>
      <div>
        {isFetching ? <Preloader /> : null}
        <Users />
      </div>
    </>
  )
}

export default UsersPage
