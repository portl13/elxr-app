import React from 'react'
import ChannelBlogs from '../home/ChannelBlogs'

function TabBlogs({ channel_id, setTabs }) {
  return <ChannelBlogs setTabs={setTabs} channel_id={channel_id} limit={20} />
}

export default TabBlogs