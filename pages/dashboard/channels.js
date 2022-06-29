import React from 'react'
import DashBoard from '@components/dashboard/DashBoard'
import Channels from '@components/dashboard/channels/Channels'

function ChannelPage() {
  return (
    <DashBoard title="channels">
        <Channels />
    </DashBoard>
  )
}

export default ChannelPage
