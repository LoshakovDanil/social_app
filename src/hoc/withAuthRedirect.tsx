import { ComponentType, FC } from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import { AppStateType } from '../redux-toolkit/store-redux'

const mapStateToProps = (state: AppStateType) =>
  ({
    isAuth: state.auth.isAuth,
    isAuthResponseReceived: state.auth.isAuthResponseReceived,
  }) as Props

type Props = {
  isAuth: boolean
  isAuthResponseReceived: boolean
}
export function withAuthRedirect<WCP extends JSX.IntrinsicAttributes>(WrappedComponent: ComponentType<WCP>) {
  const RedirectComponent: FC<Props> = props => {
    const { isAuth, isAuthResponseReceived, ...restProps } = props
    if (isAuthResponseReceived) {
      if (!isAuth) {
        return <Navigate to="/login" />
      }
    }

    return <WrappedComponent {...(restProps as WCP)} />
  }
  return connect<Props, object, WCP, AppStateType>(mapStateToProps, {})(RedirectComponent)
}
