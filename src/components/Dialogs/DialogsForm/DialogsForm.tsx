import { FC } from 'react'
import { Field, Form, Formik } from 'formik'

import { Button } from '../../common/Button/Button'
import { useAppDispatch } from '../../../hook/hook'
import { createPost } from '../../../redux-toolkit/dialogSlice'

import s from '.././Dialogs.module.css'

type ErrorType = {
  textValue?: string
}

export const DialogsForm: FC = () => {
  const dispatch = useAppDispatch()

  const submit = (
    values: { textValue: string },
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    dispatch(createPost(values.textValue))
    setSubmitting(false)
    resetForm()
  }

  const validate = (values: { textValue: string }) => {
    const errors: ErrorType = {}

    if (!values.textValue) {
      errors.textValue = 'You need to type something'
    } else if (values.textValue.length > 11) {
      errors.textValue = 'Message too long'
    }

    return errors
  }

  return (
    <div>
      <Formik enableReinitialize initialValues={{ textValue: '' }} onSubmit={submit} validate={validate}>
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              type="text"
              name="textValue"
              className={errors.textValue && touched.textValue ? `${s.errorForm}` : ''}
            />
            {errors.textValue && touched.textValue && <div className={s.error}>{errors.textValue}</div>}
            <div>
              <Button type="submit" disabled={isSubmitting}>
                Send Message
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
