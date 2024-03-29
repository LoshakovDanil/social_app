import React, { FC } from 'react'
import { Field, Formik } from 'formik'
import { Form } from 'formik'

import { useAppSelector } from '../../hook/hook'
import { Button } from '../common/Button/Button'
import { Filter } from '../../redux-toolkit/usersSlice'

type Props = {
  onFilterChanged: (filter: Filter) => void
}

export const UsersSearchForm: FC<Props> = React.memo(function UsersSearchForm(props) {
  const filter = useAppSelector(state => state.users.filter)

  const submit = (values: Filter, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    props.onFilterChanged(values)
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
})
