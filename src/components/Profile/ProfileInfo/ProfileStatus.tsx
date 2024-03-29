import { useState, useEffect, ChangeEvent } from 'react'

import { updateStatus } from '../../../redux-toolkit/profileSlice'
import { useAppDispatch, useAppSelector } from '../../../hook/hook'

export const ProfileStatus: React.FC = () => {
  const profileStatus = useAppSelector(state => state.profile.status)
  const [editMode, changeEditMode] = useState(false)
  const [status, changeStatus] = useState(profileStatus)
  const dispatch = useAppDispatch()

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
