import { useEffect, useRef } from 'react'

import { Avatar, List } from 'antd'

import { MessagesData } from '../../types/types'
import { useAppSelector } from '../../hook/hook'

import './ChatMessagePage.scss'

export const ChatMessagePage: React.FC = () => {
  const listRef = useRef<HTMLHeadingElement>(null)

  const messages = useAppSelector(state => state.chat.messages)

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
        renderItem={(item: MessagesData, index) => (
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
