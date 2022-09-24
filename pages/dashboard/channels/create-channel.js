import React from 'react'

import ChannelCreate from '@components/dashboard/channels/ChannelCreate'
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";

function CreateChannel() {
  return (
    <MainLayout title="Create Channel" sidebar={<MainSidebar />}>
      <ChannelCreate />
    </MainLayout>
  )
}

export default CreateChannel
