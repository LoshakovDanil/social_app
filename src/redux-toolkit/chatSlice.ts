import { Dispatch, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { MessagesData } from '../types/types'
import { ChatAPI, Status } from '../api/chat-api'

const initialState = {
  messages: [] as MessagesData[],
  status: 'pending' as Status,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    messagesReceived(state, action: PayloadAction<MessagesData[]>) {
      state.messages = action.payload
    },
    statusChanged(state, action: PayloadAction<Status>) {
      state.status = action.payload
    },
  },
})

let _messageHandler: ((messages: MessagesData[]) => void) | null = null

const messageHandlerCreator = (dispatch: Dispatch<any>) => {
  if (_messageHandler === null) {
    _messageHandler = messages => {
      dispatch(chatSlice.actions.messagesReceived(messages))
    }
  }
  return _messageHandler
}

let _statusHandler: ((status: Status) => void) | null = null

const statusHandlerCreator = (dispatch: any) => {
  if (_statusHandler === null) {
    _statusHandler = status => {
      dispatch(chatSlice.actions.statusChanged(status))
    }
  }
  return _statusHandler
}

export const startMessagesListening = createAsyncThunk('chat/startMessagesListening', async (_, { dispatch }) => {
  ChatAPI.start()
  ChatAPI.subscribe('message-received', messageHandlerCreator(dispatch))
  ChatAPI.subscribe('status-changed', statusHandlerCreator(dispatch))
})

export const stopMessagesListening = createAsyncThunk('chat/stopMessagesListening', async (_, { dispatch }) => {
  ChatAPI.stop()
  ChatAPI.unsubscribe('message-received', messageHandlerCreator(dispatch))
  ChatAPI.unsubscribe('status-changed', statusHandlerCreator(dispatch))
})

export const sendMessage = createAsyncThunk('chat/sendMessage', async (message: string) => {
  await ChatAPI.sendMessage(message)
  return message
})

export default chatSlice.reducer
