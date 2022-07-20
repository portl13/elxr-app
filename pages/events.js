import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import PageEvents from '@components/main/pages/PageEvents'
import React from 'react'

function EventsPage() {
  return (
    <MainLayout
      sidebar={<MainSidebar />}
    >
      <PageEvents />
    </MainLayout>
  )
}

export default EventsPage