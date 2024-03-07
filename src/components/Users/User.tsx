import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { UsersType } from '../../types/types'
import { Button } from '../common/Button/Button'

import smile from '../../assets/images/Smiley.jpg'

import s from './Users.module.css'

type Props = {
  users: UsersType[]
  isFollowing: number[]
  follow: (id: number) => void
  unfollow: (id: number) => void
}

export const User: FC<Props> = ({ users, isFollowing, follow: followFunction, unfollow: unfollowFunction }) => {
  return (
    <div>
      {users.map((u: UsersType, index: number) => (
        <div key={index} className={s.container}>
          <div className={s.image}>
            <NavLink to={'/profile/' + u.id}>
              <img src={u.photos.large || smile} alt={'smile face'} />
            </NavLink>
            <div>
              {u.followed ? (
                <Button
                  disabled={isFollowing.includes(u.id)}
                  onClick={() => {
                    unfollowFunction(u.id)
                  }}
                >
                  UNFOLLOW
                </Button>
              ) : (
                <Button
                  disabled={isFollowing.includes(u.id)}
                  onClick={() => {
                    followFunction(u.id)
                  }}
                >
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
