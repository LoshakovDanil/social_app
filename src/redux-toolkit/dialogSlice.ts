import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DialogsData, MessagesData } from '../types/types'

const initialState = {
  dialogsData: [
    { name: 'Vlad', id: 1 },
    { name: 'Gena', id: 2 },
    { name: 'Richard', id: 3 },
    { name: 'Mark', id: 4 },
    { name: 'Andrew', id: 5 },
  ] as Array<DialogsData>,
  messagesData: [{ text: 'hi' }, { text: 'thanks' }, { text: 'gl' }] as Array<MessagesData>,
}

const dialogSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    createPost(state, action: PayloadAction<string>) {
      state.messagesData.push({ text: action.payload })
    },
  },
})

export const { createPost } = dialogSlice.actions
export default dialogSlice.reducer
