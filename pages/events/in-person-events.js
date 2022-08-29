import React, { useState } from 'react'
import EventsLayout from '@components/events/EventsLayout'
import InPersonEvents from '@components/events/InPersonEvents'
import { usePosition } from 'use-position'
import EventsRealShowcase from '@components/events/EventsRealShowcase'
import GeoPositionProvider from '@context/GeoPositionContext'

function InPersonEventsPage() {
  const [eventLoader, setEventLoader] = useState(false)
  const watch = true
  const { latitude, longitude } = usePosition(watch)

  return (
    <GeoPositionProvider>
      <EventsLayout title="In Person Events">
        <EventsRealShowcase
          latitude={latitude}
          longitude={longitude}
          eventLoader={eventLoader}
        />
      </EventsLayout>
    </GeoPositionProvider>
  )
}

export default InPersonEventsPage
