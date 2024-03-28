import { Field, Form, Formik } from 'formik'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { Button } from '../common/Button/Button'
import { login } from '../../redux-toolkit/authSlice'

import s from './Login.module.css'

type ErrorType = {
  login?: string
  password?: string
  captcha?: string
}

const LoginFormPage: React.FC = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const errorCode = useAppSelector(state => state.auth.error)
  const errorStatus = useAppSelector(state => state.auth.errorType)
  const captcha = useAppSelector(state => state.auth.captcha)
  const dispatch = useAppDispatch()

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
    dispatch(login({ email: values.login, password: values.password, rememberMe: false, captcha: values?.captcha }))
    setSubmitting(false)
    resetForm()
  }

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ login: '', password: '', captcha: '' }}
        onSubmit={submit}
        validate={validate}
      >
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
                Login
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
