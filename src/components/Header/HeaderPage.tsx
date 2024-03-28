import { NavLink } from 'react-router-dom'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { Button } from '../common/Button/Button'
import { logout } from '../../redux-toolkit/authSlice'

import classes from './Header.module.scss'

export const HeaderPage: React.FC = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const login = useAppSelector(state => state.auth.login)
  const dispatch = useAppDispatch()

  const logoutCallback = () => {
    dispatch(logout())
  }

  return (
    <div className="wrapper">
      <div className={'header'}>
        {isAuth ? (
          <>
            <div className={classes.profile}>
              <span className={classes.avatar}>
                <Avatar style={{ backgroundColor: '#3477eb' }} icon={<UserOutlined />} />
              </span>
              <span>{login}</span>
            </div>
            <div className={classes.exitButton}>
              <Button onClick={logoutCallback}>Log out</Button>
            </div>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </div>
  )
}
