import React from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import EventCard from '../../cards/EventCard'



function CreatorEvents({ events, isLoading }) {

  if (events && events.data && events.data.length === 0) {
    return ''
  }

  return (
    <>
      <div className="row mt-5">
        <div className="col-12">
          <h4 className="font-size-14 mb-3">EVENTS</h4>
        </div>
        {isLoading && <SpinnerLoader />}
        {events &&
          events.data &&
          events.data.length > 0 &&
          events.data.map((event) => (
            <div key={event.id} className="col-12 col-md-6 col-lg-3">
              <EventCard event={event} />
            </div>
          ))}
      </div>
    </>
  )
}
export default CreatorEvents
