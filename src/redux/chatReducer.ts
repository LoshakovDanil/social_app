import { MessagesDataType } from '../types/types'
import { ChatAPI, Status } from '../api/chat-api'

import { BaseThunkType, DispatchType, GetActionType } from './store-redux'

const initialState = {
  messages: [] as MessagesDataType[],
  status: 'pending' as Status,
}
type InitialStateType = typeof initialState

export const chatReducer = (state = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case 'MESSAGE_RECEIVED':
      return {
        ...state,
        messages: [...action.payload.messages],
      }
    case 'STATUS_CHANGED':
      return {
        ...state,
        status: action.payload.status,
      }
    default:
      return state
  }
}

const actions = {
  messagesReceived: (messages: MessagesDataType[]) => ({ type: 'MESSAGE_RECEIVED', payload: { messages } }) as const,
  statusChanged: (status: Status) => ({ type: 'STATUS_CHANGED', payload: { status } }) as const,
}

let _messageHandler: ((messages: MessagesDataType[]) => void) | null = null

const messageHandlerCreator = (dispatch: DispatchType) => {
  // eslint-disable-next-line no-debugger
  // debugger
  if (_messageHandler === null) {
    _messageHandler = messages => {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _messageHandler
}

let _statusHandler: ((status: Status) => void) | null = null

const statusHandlerCreator = (dispatch: DispatchType) => {
  if (_statusHandler === null) {
    _statusHandler = status => {
      dispatch(actions.statusChanged(status))
    }
  }
  return _statusHandler
}

export const startMessagesListening = (): ThunkType => async dispatch => {
  ChatAPI.start()
  ChatAPI.subscribe('message-received', messageHandlerCreator(dispatch))
  ChatAPI.subscribe('status-changed', statusHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async dispatch => {
  ChatAPI.stop()
  ChatAPI.unsubscribe('message-received', messageHandlerCreator(dispatch))
  ChatAPI.unsubscribe('status-changed', statusHandlerCreator(dispatch))
}
export const sendMessage =
  (message: string): ThunkType =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async dispatch => {
    ChatAPI.sendMessage(message)
  }

type ActionType = GetActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>
