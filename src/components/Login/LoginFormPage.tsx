import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { AppStateType, DispatchType } from '../../redux/store-redux'

import { login } from '../../redux/authReducer'
import { Button } from '../common/Button/Button'

import s from './Login.module.css'

type ErrorType = {
  login?: string
  password?: string
  captcha?: string
}

const LoginFormPage: React.FC = () => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const errorCode = useSelector((state: AppStateType) => state.auth.error)
  const errorStatus = useSelector((state: AppStateType) => state.auth.errorType)
  const captcha = useSelector((state: AppStateType) => state.auth.captcha)
  const dispatch: DispatchType = useDispatch()

  if (isAuth) {
    return <Navigate to="/profile" />
  }

  const validate = (values: { login: string; password: string; captcha: string }) => {
    const errors: ErrorType = {}
    if (!values.login) {
      errors.login = 'You need to type something on email'
    }
    if (!values.password) {
      errors.password = 'You need to type something on password'
    }
    if (!values.captcha && errorStatus === 10) {
      errors.captcha = 'Captcha is required'
    }
    return errors
  }

  const submit = (
    values: { login: string; password: string; captcha?: string },
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    dispatch(login(values.login, values.password, false, values?.captcha))
    setSubmitting(false)
    resetForm()
  }

  return (
    <div>
      <Formik enableReinitialize initialValues={{ login: '', password: '', captcha: '' }} onSubmit={submit} validate={validate}>
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div>
              <Field type="text" name="login" />
            </div>
            {errors.login && touched.login && <div className={s.error}>{errors.login}</div>}
            <div>
              <Field type="password" name="password" />
            </div>
            {errors.password && touched.password && <div className={s.error}>{errors.password}</div>}
            {captcha && <img src={captcha} alt="AAAAAA samurai server down" />}
            {captcha && (
              <div>
                <Field type="input" name="captcha" />
              </div>
            )}
            <div>
              <Button disabled={isSubmitting} type="submit">
                Вход
              </Button>
            </div>
            {errors.captcha && <div className={s.error}>{errors.captcha}</div>}
            {<div className={s.error}> {errorCode} </div>}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginFormPage
