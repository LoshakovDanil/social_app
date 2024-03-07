import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DispatchType } from '../../../redux/store-redux'
import { mstpGetProfile } from '../../../redux/usersSelectors'
import { setPhoto } from '../../../redux/profileReducer'

import { Preloader } from '../../common/Paginator/Preloader'

import smile from '../../../assets/images/Smiley.jpg'

import { ProfileStatus } from './ProfileStatus'

import s from './ProfileInfo.module.css'

type PropsType = {
  isOwner: boolean
}
export const ProfileInfo: React.FC<PropsType> = ({ isOwner }) => {
  const dispatch: DispatchType = useDispatch()
  const profile = useSelector(mstpGetProfile)

  if (!profile) {
    return <Preloader />
  }
  const loadImage = (photos: ChangeEvent<HTMLInputElement>) => {
    if (photos.target.files?.length) {
      dispatch(setPhoto(photos.target.files[0]))
    }
  }

  return (
    <div>
      <div>
        <div className={s.profile}>
          <img src={profile.photos.large || smile} alt="" />
          {isOwner && <input type="file" accept="image/png, image/gif, image/jpeg" onChange={loadImage} />}
        </div>
        <div>{profile.fullName}</div>

        <br />
      </div>
      <ProfileStatus />
    </div>
  )
}
