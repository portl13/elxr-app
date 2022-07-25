import EventDetails from '@components/main/details/channel/EventDetails'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import React from 'react'

function PageEventDetails() {
  return (
    <MainLayout
      sidebar={<MainSidebar />}
    >
      <EventDetails/>
    </MainLayout>
  )
}

export default PageEventDetails