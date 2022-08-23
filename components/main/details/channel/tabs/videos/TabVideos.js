import React from 'react'
import CreatorVideos from '../home/CreatorVideos'

function TabVideos({ channel_id, setTabs }) {
  return (
    <CreatorVideos setTabs={setTabs} channel_id={channel_id} limit={20} />
  )
}

export default TabVideos