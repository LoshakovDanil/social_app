import { useSearchParams } from 'react-router-dom'
import { FC, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { getUsers } from '../../redux-toolkit/usersSlice'
import Paginator from '../common/Paginator/Paginator'

import { UsersSearchForm } from './UsersSearchForm'
import { User } from './User'

import s from './Users.module.css'

export const Users: FC = () => {
  const currentPage = useAppSelector(state => state.users.currentPage)
  const pageSize = useAppSelector(state => state.users.pageSize)
  const filter = useAppSelector(state => state.users.filter)
  const totalUsersCount = useAppSelector(state => state.users.totalUsersCount)

  const dispatch = useAppDispatch()

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
    dispatch(getUsers({ currentPage: actualPage, pageSize, filter: actualFilter }))
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
    dispatch(getUsers({ currentPage, pageSize, filter }))
  }

  return (
    <div>
      <UsersSearchForm />
      <div className={s.cursorMenu}>
        <Paginator
          totalUsersCount={totalUsersCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
        />
      </div>
      <User />
    </div>
  )
}
