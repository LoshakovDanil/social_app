import { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { path } from '../../constants/pages'
import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { getStatus, setUser } from '../../redux-toolkit/profileSlice'

import { Profile } from './Profile'

export const ProfileContainer: FC = () => {
  const navigate = useNavigate()
  const params = useParams()

  const userid: number | undefined = params.userid ? +params.userid : undefined
  const authorizedUserId = useAppSelector(state => state.auth.id)
  const isAuthResponseReceived = useAppSelector(state => state.auth.isAuthResponseReceived)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const targetUserId = userid ?? authorizedUserId
    if (isAuthResponseReceived) {
      if (!targetUserId) {
        navigate(path.login)
      } else {
        dispatch(setUser(targetUserId))
        dispatch(getStatus(targetUserId))
      }
    }
  }, [userid, authorizedUserId, getStatus, setUser])

  return <Profile isOwner={!userid} />
}
