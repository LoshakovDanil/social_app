import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { Avatar, List } from 'antd'

import { MessagesDataType } from '../../types/types'

import './ChatMessagePage.scss'
import { AppStateType } from '../../redux-toolkit/store-redux'

export const ChatMessagePage: React.FC = () => {
  const listRef = useRef<HTMLHeadingElement>(null)
  console.log('messages rerender')

  const messages = useSelector((state: AppStateType) => state.chat.messages)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div ref={listRef} style={{ maxHeight: '700px', overflowY: 'auto' }}>
      <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(item: MessagesDataType, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
              title={item.text}
              className={'j'}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
