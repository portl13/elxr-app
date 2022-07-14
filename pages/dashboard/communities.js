import React from 'react'
import DashBoard from '@components/dashboard/DashBoard'
import Community from '@components/dashboard/community/Community'

function CommunityPage() {
  return (
    <DashBoard title="Community">
      <Community />
    </DashBoard>
  )
}

export default CommunityPage