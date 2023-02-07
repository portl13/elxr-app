import React from 'react'
import MainLayout from '@components/main/MainLayout'
import CreatorDashboard from '@components/creatorDashboard/CreatorDashboard'
import NonSsrWrapper from '../../components/no-ssr-wrapper/NonSSRWrapper'

function CreatorDashboardPage() {
  return (
    <MainLayout title="Creator Dashboard">
        <NonSsrWrapper>
            <CreatorDashboard />
        </NonSsrWrapper>
    </MainLayout>
  )
}

export default CreatorDashboardPage
