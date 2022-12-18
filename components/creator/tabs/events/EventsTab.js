import React, { useState } from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import useSWR from 'swr'
import { getFetchPublic } from '@request/creator'
import EventCard from '@components/creator/cards/EventCard'

const eventlUrl = `${process.env.apiV2}/channel-event?author=`

function EventsTab({ creator_id }) {
  const [page, setPage] = useState(1)

  const { data: events, error } = useSWR(
    `${eventlUrl}${creator_id}&page=${page}&per_page=12`,
    getFetchPublic
  )
  const isLoading = !events && !error

  if (events && events.data && events.data.length === 0) {
    return ''
  }

  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="color-font  font-size-14">EVENTS</h4>
      </div>
      {isLoading && <SpinnerLoader />}
      {events && events.data && events.data.length === 0 && (
        <h3 className="col display-4">You have not created any events yet</h3>
      )}
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

export default EventsTab
