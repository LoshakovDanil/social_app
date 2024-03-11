import { authProfile } from './authReducer'
import { BaseThunkType, GetActionType } from './store-redux'

const initialState = {
  initialized: false,
}

type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
  if (action.type === 'INITIALIZE_SUCCESS') {
    return {
      ...state,
      initialized: true,
    }
  }
  return state
}

const actions = {
  initializedSuccess: () => ({ type: 'INITIALIZE_SUCCESS' }) as const,
}

type ActionType = GetActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>

export const initialize = (): ThunkType => async dispatch => {
  await dispatch(authProfile())
  dispatch(actions.initializedSuccess())
}
