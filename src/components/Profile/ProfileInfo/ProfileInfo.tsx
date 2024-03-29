import { ChangeEvent } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hook/hook'
import { Preloader } from '../../common/Paginator/Preloader'
import { setPhoto } from '../../../redux-toolkit/profileSlice'

import smile from '../../../assets/images/Smiley.jpg'

import { ProfileStatus } from './ProfileStatus'

import s from './ProfileInfo.module.css'

type PropsType = {
  isOwner: boolean
}
export const ProfileInfo: React.FC<PropsType> = ({ isOwner }) => {
  const profile = useAppSelector(state => state.profile.profile)
  const dispatch = useAppDispatch()

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
          <div>
            {isOwner && (
              <input type="file" id="uploadBtn" accept="image/png, image/gif, image/jpeg" onChange={loadImage} />
            )}
            <label htmlFor="uploadBtn">Update profile photo</label>
          </div>
        </div>
        <div>{profile.fullName}</div>

        <br />
      </div>
      <ProfileStatus />
    </div>
  )
}
