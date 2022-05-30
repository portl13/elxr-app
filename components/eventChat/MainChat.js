import React, { useContext, useState, useEffect } from 'react'

import ChatEvent from './component/ChatEvent'
import { WrapperEventChat } from './component/EventChatStyle'
import { UserContext } from '../../context/UserContext'

export default function MainChat(props) {
  const { videoHeight = null, vendor_id } = props

  const { user } = useContext(UserContext)

  const [videoPadding, setVideoPadding] = useState(0)

  const [auth, setAuth] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(max-width: 991px)').matches) {
      setVideoPadding(videoHeight)
    }
  }, [videoHeight])

  useEffect(() => {
    if (!user) return
    setAuth(!auth)
  }, [user])

  useEffect(() => {
    if (!user && auth) {
      setAuth(!auth)
    }
  }, [user])

  return (
    <WrapperEventChat
      style={{
        paddingTop: videoPadding,
      }}
      className="MainChat"
    >
      <ChatEvent auth={auth} user={user} vendor_id={vendor_id} />
    </WrapperEventChat>
  )
}
