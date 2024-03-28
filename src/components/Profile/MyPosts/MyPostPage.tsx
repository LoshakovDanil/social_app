import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik'

import { MessagesInfo } from '../../../types/types'
import { Post } from '../MyPosts/Post/Post'
import { AppStateType, DispatchType } from '../../../redux-toolkit/store-redux'
import { Button } from '../../common/Button/Button'
import { createPost } from '../../../redux-toolkit/profileSlice'

import s from './MyPost.module.css'

type ErrorType = {
  newMessageBody?: string
}

export const MyPostPage: FC = () => {
  const profilePage = useSelector((state: AppStateType) => state.profile)
  const messagesElement = profilePage.messagesInfo.map((el: MessagesInfo, index: number) => (
    <Post key={index} message={el.message} />
  ))

  return (
    <div>
      <MyPostForm />
      <div>{messagesElement}</div>
    </div>
  )
}

const MyPostForm: React.FC = () => {
  const dispatch: DispatchType = useDispatch()

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

export default MyPostPage
