import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik'

import { AppStateType, DispatchType } from '../../redux/store-redux'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chatReducer'
import { Button } from '../common/Button/Button'

import { ChatMessagePage } from './ChatMessagePage'

import s from './ChatPage.module.css'

const ChatPage = () => {
  const status = useSelector((state: AppStateType) => state.chat.status)

  const dispatch: DispatchType = useDispatch()
  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  const submit = (
    values: { term: string },
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    setSubmitting(false)
    if (values.term && values.term.trim() !== '') {
      const cleanMessage = values.term.replace(/\s+/g, ' ').trim()
      console.log('message ' + cleanMessage)
      dispatch(sendMessage(cleanMessage))
    }
    resetForm()
  }

  return (
    <div>
      <div>
        <ChatMessagePage />
      </div>
      <div>
        <Formik enableReinitialize initialValues={{ term: '' }} onSubmit={submit}>
          {() => (
            <Form>
              <Field type="text" name="term" />
              <Button type="submit" disabled={status === 'pending'}>
                Send Message
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        {status === 'ready' ? (
          <div className={`${s.statusContainer} ${s.onlineMessage}`}>Server is on</div>
        ) : (
          <div className={`${s.statusContainer} ${s.offlineMessage}`}>Server is down</div>
        )}
      </div>
    </div>
  )
}

export default ChatPage
