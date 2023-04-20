import React from 'react'

import ChannelCreate from '@components/dashboard/channels/ChannelCreate'
import MainLayout from "@components/main/MainLayout";

function CreateChannel() {
  return (
    <MainLayout title="Create Channel" >
      <ChannelCreate />
    </MainLayout>
  )
}

export default CreateChannel
