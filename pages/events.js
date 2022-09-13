import React from 'react'
import EventsLayout from '@components/events/EventsLayout'
import PageEvents from '@components/main/pages/PageEvents'


function EventsPage() {
  return (
    <EventsLayout title="Events">
      <PageEvents />
    </EventsLayout>
  )
}

export default EventsPage