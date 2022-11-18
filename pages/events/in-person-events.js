import React, { useState } from 'react'
import EventsLayout from '@components/events/EventsLayout'
import EventsRealShowcase from '@components/events/EventsRealShowcase'
import GeoPositionProvider from '@context/GeoPositionContext'
import {useGeolocation} from 'react-use';
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";


function InPersonEventsPage() {
  const [eventLoader, setEventLoader] = useState(false)
    const {loading, longitude, latitude} = useGeolocation();
  return (
    <GeoPositionProvider>
      <EventsLayout title="In Person Events">
        {!loading ?<EventsRealShowcase
            latitude={latitude}
            longitude={longitude}
            eventLoader={eventLoader}
        /> : <SpinnerLoader />}
      </EventsLayout>
    </GeoPositionProvider>
  )
}

export default InPersonEventsPage
