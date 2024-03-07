import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { setUser, setStatus } from '../../redux/profileReducer'
import { DispatchType } from '../../redux/store-redux'
import { mstpGetAuthResponse, mstpGetId } from '../../redux/usersSelectors'

import { Profile } from './Profile'

export const ProfileContainer: FC = () => {
  const navigate = useNavigate()
  const params = useParams()

  const userid: number | undefined = params.userid ? +params.userid : undefined
  const authorizedUserId = useSelector(mstpGetId)
  const isAuthResponseReceived = useSelector(mstpGetAuthResponse)

  const dispatch: DispatchType = useDispatch()

  useEffect(() => {
    const targetUserId = userid ?? authorizedUserId
    if (isAuthResponseReceived) {
      if (!targetUserId) {
        navigate('/login')
      } else {
        dispatch(setUser(targetUserId))
        dispatch(setStatus(targetUserId))
      }
    }
  }, [userid, authorizedUserId, setStatus, setUser])

  return <Profile isOwner={!userid} />
}
