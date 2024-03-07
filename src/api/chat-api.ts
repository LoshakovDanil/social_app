import { MessagesDataType } from '../types/types'

const subscribers = {
  'message-received': [] as MessageReceivedSubscribers[],
  'status-changed': [] as StatusChangedSubscribers[],
}

let ws: WebSocket | null = null

const messageHandler = (e: MessageEvent) => {
  // eslint-disable-next-line no-debugger

  if (e.data[0] === '[') {
    const allMessage = JSON.parse(e.data)
    subscribers['message-received'].forEach(s => s(allMessage))
  }
}
const notifyStatus = (status: Status) => {
  subscribers['status-changed'].forEach(s => s(status))
}
const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.close()
}
const closeHandler = () => {
  notifyStatus('pending')
  console.log('SERVER CLOSE')
  setTimeout(createChannel, 5000)
}
const openHandler = () => {
  notifyStatus('ready')
}
function createChannel() {
  cleanUp()
  ws = new WebSocket('ws://127.0.0.1:8000')
  notifyStatus('pending')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
}

export const ChatAPI = {
  start() {
    createChannel()
  },
  stop() {
    subscribers['message-received'] = []
    subscribers['status-changed'] = []
    cleanUp()
  },
  subscribe(eventName: EventsNamesType, callback: MessageReceivedSubscribers | StatusChangedSubscribers) {
    if (eventName === 'message-received') {
      subscribers['message-received'].push(callback as MessageReceivedSubscribers)
    } else if (eventName === 'status-changed') {
      subscribers['status-changed'].push(callback as StatusChangedSubscribers)
    }
  },
  unsubscribe(eventName: EventsNamesType, callback: MessageReceivedSubscribers | StatusChangedSubscribers) {
    if (eventName === 'message-received') {
      subscribers['message-received'] = subscribers['message-received'].filter(s => s !== callback)
    } else if (eventName === 'status-changed') {
      subscribers['status-changed'] = subscribers['status-changed'].filter(s => s !== callback)
    }
  },
  sendMessage(message: string) {
    ws?.send(message)
  },
}

export type MessageReceivedSubscribers = (messages: MessagesDataType[]) => void
export type StatusChangedSubscribers = (status: Status) => void
export type Status = 'pending' | 'ready'
type EventsNamesType = 'message-received' | 'status-changed'
