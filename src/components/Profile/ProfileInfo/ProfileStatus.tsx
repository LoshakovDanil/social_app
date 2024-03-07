import { useState, useEffect, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DispatchType } from '../../../redux/store-redux'

import { updateStatus } from '../../../redux/profileReducer'
import { mstpGetStatus } from '../../../redux/usersSelectors'

export const ProfileStatus: React.FC = () => {
  const profileStatus = useSelector(mstpGetStatus)
  const [editMode, changeEditMode] = useState(false)
  const [status, changeStatus] = useState(profileStatus)
  const dispatch: DispatchType = useDispatch()

  const deactivateEditMode = () => {
    changeEditMode(false)
    dispatch(updateStatus(status))
  }

  const activateEditMode = () => {
    changeEditMode(true)
  }

  const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    changeStatus(e.currentTarget.value)
  }

  useEffect(() => {
    changeStatus(profileStatus)
  }, [profileStatus])

  const toggleMode = (editStatus: boolean) => {
    if (editStatus) {
      return (
        <div>
          {' '}
          <input value={status} onBlur={deactivateEditMode} autoFocus={true} onChange={onChangeStatus} />{' '}
        </div>
      )
    } else {
      return (
        <div>
          {' '}
          <span onDoubleClick={activateEditMode}>{profileStatus || '---'}</span>{' '}
        </div>
      )
    }
  }

  return <div>{toggleMode(editMode)}</div>
}
