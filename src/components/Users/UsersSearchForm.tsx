import React, { FC } from 'react'
import { Field, Formik } from 'formik'
import { Form } from 'formik'

import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { Button } from '../common/Button/Button'
import { Filter, getUsers } from '../../redux-toolkit/usersSlice'

export const UsersSearchForm: FC = () => {
  const filter = useAppSelector(state => state.users.filter)
  const pageSize = useAppSelector(state => state.users.pageSize)
  const dispatch = useAppDispatch()

  const onFilterChanged = (filter: Filter) => {
    dispatch(getUsers({ currentPage: 1, pageSize, filter }))
  }

  const submit = (values: Filter, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    onFilterChanged(values)
    setSubmitting(false)
  }

  return (
    <div>
      <Formik enableReinitialize initialValues={{ term: filter.term, friend: String(filter.friend) }} onSubmit={submit}>
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field as="select" name="friend">
              <option value="">All</option>
              <option value="true">Followed</option>
              <option value="false">Not Followed</option>
            </Field>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
