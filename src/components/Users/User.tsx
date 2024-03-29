import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { useAppDispatch } from '../../hook/hook'
import { follow, unfollow } from '../../redux-toolkit/usersSlice'
import { Users } from '../../types/types'
import { Button } from '../common/Button/Button'
import { path } from '../../constants/pages'

import smile from '../../assets/images/Smiley.jpg'

import s from './Users.module.css'

type Props = {
  users: Users[]
  isFollowing: number[]
}

export const User: FC<Props> = ({ users, isFollowing }) => {
  const dispatch = useAppDispatch()

  const followFc = (id: number) => {
    dispatch(follow(id))
  }
  const unfollowFc = (id: number) => {
    dispatch(unfollow(id))
  }

  return (
    <div>
      {users.map((u: Users, index: number) => (
        <div key={index} className={s.container}>
          <div className={s.image}>
            <NavLink to={'/' + path.profile + '/' + u.id}>
              <img src={u.photos.large || smile} alt={'smile face'} />
            </NavLink>
            <div>
              {u.followed ? (
                <Button disabled={isFollowing.includes(u.id)} onClick={() => unfollowFc(u.id)}>
                  UNFOLLOW
                </Button>
              ) : (
                <Button disabled={isFollowing.includes(u.id)} onClick={() => followFc(u.id)}>
                  FOLLOW
                </Button>
              )}
            </div>
          </div>
          <div className={s.message_body}>
            <div className={s.name}>{u.name}</div>
            <div className={s.message}>{u.status}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
