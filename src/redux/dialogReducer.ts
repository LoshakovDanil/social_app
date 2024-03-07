import { DialogsDataType, MessagesDataType } from '../types/types'

import { GetActionType } from './store-redux'

const initialState = {
  dialogsData: [
    { name: 'Vlad', id: 1 },
    { name: 'Gena', id: 2 },
    { name: 'Stas', id: 3 },
    { name: 'Mark', id: 4 },
    { name: 'Andrew', id: 5 },
  ] as Array<DialogsDataType>,
  messagesData: [{ text: 'hi' }, { text: 'thanks' }, { text: 'gl' }] as Array<MessagesDataType>,
}

type InitialStateType = typeof initialState

export const dialogReducer = (state = initialState, action: ActionType): InitialStateType => {
  if (action.type === 'NEW_DIALOGS') {
    return {
      ...state,
      messagesData: [...state.messagesData, { text: action.newMessageBody }],
    }
  }
  return state
}

export const actions = {
  createPost: (newMessageBody: string) => ({ type: 'NEW_DIALOGS', newMessageBody }) as const,
}

type ActionType = GetActionType<typeof actions>
