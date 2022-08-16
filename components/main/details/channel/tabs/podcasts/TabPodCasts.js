import React from 'react'
import CreatorPodcasts from '../home/CreatorPodcasts'

function TabPodCasts({ channel_id, setTabs }) {
  return <CreatorPodcasts setTabs={setTabs} channel_id={channel_id} limit={20} />
}

export default TabPodCasts