import { createSlice } from '@reduxjs/toolkit'

import { DialogsDataType, MessagesDataType } from '../types/types'

const initialState = {
  dialogsData: [
    { name: 'Vlad', id: 1 },
    { name: 'Gena', id: 2 },
    { name: 'Richard', id: 3 },
    { name: 'Mark', id: 4 },
    { name: 'Andrew', id: 5 },
  ] as Array<DialogsDataType>,
  messagesData: [{ text: 'hi' }, { text: 'thanks' }, { text: 'gl' }] as Array<MessagesDataType>,
}

const dialogSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    createPost(state, action) {
      state.messagesData.push({ text: action.payload })
    },
  },
})

export const { createPost } = dialogSlice.actions
export default dialogSlice.reducer
