import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat, Channel } from 'stream-chat-react'
import { getColor } from '../../../lib/color'
import { GamingChatInner } from './EventChatInner'
import { EventChatContainer } from './EventChatStyle'
import { EventChatThreadHeader } from './EventChatThreadHeader'
import axios from 'axios'
import { v4 as uuidv5 } from 'uuid'

const apiKey = process.env.NEXT_PUBLIC_GETSTREAM_KEY

const clientChat = StreamChat.getInstance(apiKey, {
  enableInsights: true,
  enableWSFallback: true,
})

export default function ChatEvent(props) {
  const { user, vendor_id, auth, chat, setChat } = props

  const [channel, setChannel] = useState(null)
  const [timestamp, setTimestamp] = useState(false)
  const [chatClient, setChatClient] = useState(null)

  const loadChat = async () => {
    let createChannel

    if (user) {
      const { data } = await axios.post('/api/chat/auth', user)

      await chatClient.connectUser(
        {
          id: String(user.id),
          color: getColor(),
          name: user.name,
          userRole: 'default',
        },
        data.token
      )

      createChannel = chatClient.channel('gaming', `channel-${vendor_id}`, {
        name: 'Portl Demo',
      })

      if (!createChannel.state.members[String(user.id)])
        await createChannel.addMembers([String(user.id)])
    } else {
      await chatClient.setGuestUser({ id: uuidv5() })

      createChannel = chatClient.channel('gaming', `channel-${vendor_id}`, {
        name: 'Portl Demo',
      })
    }

    await createChannel.watch()

    setChannel(createChannel)
  }

  const createChannel = async () => {
    await chatClient.setGuestUser({ id: uuidv5() })

    createChannel = chatClient.channel('gaming', `channel-${vendor_id}`, {
      name: 'Portl Demo',
    })

    await createChannel.watch()
  }

  useEffect(() => {
    if (!clientChat) return
    setChatClient(clientChat)
  }, [clientChat])

  useEffect(() => {
    if (!chatClient) return
    try {
      loadChat()
    } catch (error) {}
    return () => {
      chatClient.disconnectUser()
      setChatClient(null)
    }
  }, [chatClient])

  return (
    <EventChatContainer>
      {chatClient && (
        <Chat client={chatClient}>
          <Channel channel={channel} ThreadHeader={EventChatThreadHeader}>
            <GamingChatInner
              {...{
                timestamp,
                setTimestamp,
                auth,
              }}
            />
          </Channel>
        </Chat>
      )}
    </EventChatContainer>
  )
}
