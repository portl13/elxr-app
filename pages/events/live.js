import React from 'react'
import EventsLayout from '@components/events/EventsLayout'
import PageEvents from '@components/main/pages/PageEvents'

function EventsLivePage() {
  return (
    <EventsLayout title="PORTL Live">
      <PageEvents />
    </EventsLayout>
  )
}

export default EventsLivePage
