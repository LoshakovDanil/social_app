import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik'

import { Button } from '../common/Button/Button'
import { DialogsDataType, MessagesDataType } from '../../types/types'
import { mstpGetDialogsPage } from '../../redux/usersSelectors'
import { actions } from '../../redux/dialogReducer'
import { DispatchType } from '../../redux/store-redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'

import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'

import s from './Dialogs.module.css'

type ErrorType = {
  textValue?: string
}

const DialogsPage: FC = () => {
  const dialogsPage = useSelector(mstpGetDialogsPage)
  const dispatch: DispatchType = useDispatch()

  const DialogsElement = dialogsPage.dialogsData.map((el: DialogsDataType, index: number) => (
    <DialogItem key={index} name={el.name} id={el.id} />
  ))
  const MessagesElement = dialogsPage.messagesData.map((el: MessagesDataType, index: number) => (
    <MessageItem key={index} text={el.text} />
  ))

  const submit = (
    values: { textValue: string },
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    dispatch(actions.createPost(values.textValue))
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
              <Field type="text" name="textValue" className={errors.textValue && touched.textValue ? `${s.errorForm}` : ''} />
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
