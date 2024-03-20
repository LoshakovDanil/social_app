import { useSearchParams } from 'react-router-dom'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FilterType, getUsers } from '../../redux/usersReducer'
import {
  mstpGetCurrentPage,
  mstpGetFilter,
  mstpGetIsFollowing,
  mstpGetPageSize,
  mstpGetTotalUsersCount,
  mstpGetUsersSelector,
} from '../../redux/usersSelectors'
import { DispatchType } from '../../redux/store-redux'

import Paginator from '../common/Paginator/Paginator'

import { UsersSearchForm } from './UsersSearchForm'
import { User } from './User'

import s from './Users.module.css'

export const Users: FC = () => {
  const currentPage = useSelector(mstpGetCurrentPage)
  const pageSize = useSelector(mstpGetPageSize)
  const filter = useSelector(mstpGetFilter)
  const isFollowing = useSelector(mstpGetIsFollowing)
  const totalUsersCount = useSelector(mstpGetTotalUsersCount)
  const users = useSelector(mstpGetUsersSelector)

  const dispatch: DispatchType = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const parsed = Object.fromEntries(searchParams)

  useEffect(() => {
    let actualPage = currentPage
    let actualFilter = filter

    if (parsed.page) actualPage = +parsed.page
    if (parsed.term) actualFilter = { ...actualFilter, term: parsed.term }
    switch (parsed.friend) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null }
        break
      case 'true':
        actualFilter = { ...actualFilter, friend: true }
        break
      case 'false':
        actualFilter = { ...actualFilter, friend: false }
        break
    }
    dispatch(getUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    const term = filter.term
    const friend = filter.friend

    const urlQuery =
      (term ? `&term=${term}` : '') +
      (friend !== null && friend !== 'null' && friend !== '' ? `&friend=${friend}` : '') +
      (currentPage !== 1 ? `&page=${currentPage}` : '')

    setSearchParams(urlQuery)
  }, [filter, currentPage])

  const onPageChanged = (currentPage: number) => {
    dispatch(getUsers(currentPage, pageSize, filter))
  }
  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(1, pageSize, filter))
  }

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />

      <div className={s.cursorMenu}>
        <Paginator
          totalUsersCount={totalUsersCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
        />
      </div>
      <User users={users} isFollowing={isFollowing} />
    </div>
  )
}
