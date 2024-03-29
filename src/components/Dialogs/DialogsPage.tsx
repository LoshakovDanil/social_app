import { FC } from 'react'
import { Field, Form, Formik } from 'formik'

import { Button } from '../common/Button/Button'
import { DialogsData, MessagesData } from '../../types/types'
import { createPost } from '../../redux-toolkit/dialogSlice'
import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'

import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'

import s from './Dialogs.module.css'

type ErrorType = {
  textValue?: string
}

const DialogsPage: FC = () => {
  const dialogsPage = useAppSelector(state => state.dialogs)
  const dispatch = useAppDispatch()

  const DialogsElement = dialogsPage.dialogsData.map((el: DialogsData, index: number) => (
    <DialogItem key={index} name={el.name} id={el.id} />
  ))
  const MessagesElement = dialogsPage.messagesData.map((el: MessagesData, index: number) => (
    <MessageItem key={index} text={el.text} />
  ))

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
    <div className={s.container}>
      <div className={s.dialogs}>{DialogsElement}</div>
      <div className={s.messages}>{MessagesElement}</div>
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
    </div>
  )
}

export default withAuthRedirect(DialogsPage)
