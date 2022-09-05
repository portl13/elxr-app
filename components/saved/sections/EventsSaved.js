import EventCard from '@components/creator/cards/EventCard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import React from 'react'

function EventsSaved({ events, eventIds }) {
  if (events && events.data && events.data.length === 0) {
    return ''
  }

  if (eventIds && eventIds.length === 0) {
    return ''
  }

  return (
    <div className="row mt-4">
      <div className="col-12 d-flex justify-content-between mb-2">
        <h4 className="font-size-14">EVENTS</h4>
      </div>
      {!eventIds && <SpinnerLoader />}
      {!events && eventIds && eventIds.length > 0 && <SpinnerLoader />}
      {events &&
        events.data &&
        events.data.length > 0 &&
        events.data.map((event) => (
          <div key={event.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <EventCard event={event} />
          </div>
        ))}
    </div>
  )
}

export default EventsSaved
