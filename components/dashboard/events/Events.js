import React, { useState } from 'react'
import LupaIcon from '@icons/LupaIcon'
import { getEvents } from '@request/dashboard'
import useSWR from 'swr'
import EventCard from './EventCard'
const eventsUrl = `${process.env.NEXT_PUBLIC_API_EVENTS_WP}events`

function Events() {
  const [page, setPage] = useState(1)

  const { data: events, error } = useSWR(`${eventsUrl}?page${page}&per_page=20`, getEvents)

  console.log('🚀 ~ file: Events.js ~ line 10 ~ Events ~ events', events)

  return (
    <div className="container ">
      <div className="d-flex  justify-content-between">
        <div>
          <h2 className="title-dashboard">Events</h2>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <form action="">
            <div className="input-search-contain">
              <span className="input-search-icon">
                <LupaIcon className="input-search-icon-svg" />
              </span>
              <input
                className="input-search"
                type="search"
                name=""
                placeholder="Search"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="row mt-5">
        {events && events.events.map((event) => (
            <EventCard event={event} key={event.id} />
        ))}
      </div>
    </div>
  )
}

export default Events
