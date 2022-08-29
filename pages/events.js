import EventsLayout from '@components/events/EventsLayout'
import PartnerEventsPage from '@components/events/PartnerEventsPage'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import PageEvents from '@components/main/pages/PageEvents'

import React from 'react'

function EventsPage() {
  return (
    <EventsLayout title="Events">
      <PageEvents />
    </EventsLayout>
  )
}

export default EventsPage