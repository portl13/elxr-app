import React from 'react'
import EventsLayout from '@components/events/EventsLayout'
import InPersonEvents from '@components/events/InPersonEvents'

function InPersonEventsPage() {
  return (
    <EventsLayout title="In Person Events">
        <InPersonEvents />
    </EventsLayout>
  )
}

export default InPersonEventsPage
