import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { Button } from '../common/Button/Button'
import { AppStateType, DispatchType } from '../../redux-toolkit/store-redux'
import { logout } from '../../redux-toolkit/authSlice'

import classes from './Header.module.scss'

export const HeaderPage: React.FC = () => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const login = useSelector((state: AppStateType) => state.auth.login)
  const dispatch: DispatchType = useDispatch()

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
