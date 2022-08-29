import React from 'react'
import EventsLayout from '@components/events/EventsLayout'
import PartnerEventsPage from '@components/events/PartnerEventsPage'

function PartnerPage() {
  return (
    <EventsLayout title="Partner Events">
      <PartnerEventsPage />
    </EventsLayout>
  )
}

export default PartnerPage
