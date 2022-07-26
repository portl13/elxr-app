import React from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getCreator } from '@request/creator'
import useSWR from 'swr'
import EventCard from '@components/creator/cards/EventCard'

const eventlUrl = `${process.env.apiV2}/channel-event?channel_id=`

function CreatorEvents({ channel_id }) {
  const { data: events, error } = useSWR(
    `${eventlUrl}${channel_id}&page=1&per_page=4`,
    getCreator
  )
  const isLoading = !events && !error

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
            <div key={event.id} className='col-12 col-md-6 col-lg-3'>
              <EventCard event={event} />
            </div>
          ))}
      </div>
    </>
  )
}
export default CreatorEvents
