import { Field, Form, Formik } from 'formik'

import { useAppDispatch } from '../../../hook/hook'
import { createPost } from '../../../redux-toolkit/profileSlice'
import { Button } from '../../common/Button/Button'

import s from './Post.module.css'

type ErrorType = {
  newMessageBody?: string
}

export const MyPostForm: React.FC = () => {
  const dispatch = useAppDispatch()

  const validate = (values: { newMessageBody: string }) => {
    const errors: ErrorType = {}

    if (!values.newMessageBody) {
      errors.newMessageBody = 'You need to type something'
    }

    return errors
  }
  const submit = (
    values: { newMessageBody: string },
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    dispatch(createPost(values.newMessageBody))
    setSubmitting(false)
    resetForm()
  }
  return (
    <Formik enableReinitialize initialValues={{ newMessageBody: '' }} onSubmit={submit} validate={validate}>
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Field
            type="text"
            name="newMessageBody"
            className={errors.newMessageBody && touched.newMessageBody ? `${s.errorForm}` : ''}
          />
          {errors.newMessageBody && touched.newMessageBody && <div className={s.error}>{errors.newMessageBody}</div>}
          <div>
            <Button disabled={isSubmitting} type="submit">
              Send message
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
