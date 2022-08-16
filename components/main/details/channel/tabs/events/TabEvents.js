import React from 'react'
import CreatorEvents from '../home/CreatorEvents'

function TabEvents({ channel_id, setTabs }) {
  return <CreatorEvents setTabs={setTabs} channel_id={channel_id} limit={20} />
}

export default TabEvents
