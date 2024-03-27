import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { path } from '../../constants/pages'
import { AppStateType, DispatchType } from '../../redux-toolkit/store-redux'
import { getStatus, setUser } from '../../redux-toolkit/profileSlice'

import { Profile } from './Profile'

export const ProfileContainer: FC = () => {
  const navigate = useNavigate()
  const params = useParams()

  const userid: number | undefined = params.userid ? +params.userid : undefined
  const authorizedUserId = useSelector((state: AppStateType) => state.auth.id)
  const isAuthResponseReceived = useSelector((state: AppStateType) => state.auth.isAuthResponseReceived)

  const dispatch: DispatchType = useDispatch()

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
