import React, { FC } from 'react'
import { Field, Formik } from 'formik'
import { Form } from 'formik'
import { useSelector } from 'react-redux'

import { Button } from '../common/Button/Button'
import { AppStateType } from '../../redux-toolkit/store-redux'
import { FilterType } from '../../redux-toolkit/usersSlice'

type Props = {
  onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: FC<Props> = React.memo(function UsersSearchForm(props) {
  const filter = useSelector((state: AppStateType) => state.users.filter)

  const submit = (values: FilterType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
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
