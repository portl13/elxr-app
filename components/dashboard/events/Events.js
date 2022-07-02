import React, { useContext, useState } from 'react'
import LupaIcon from '@icons/LupaIcon'
import { getChannelEvents, getEvents } from '@request/dashboard'
import useSWR from 'swr'
import EventCard from './EventCard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { UserContext } from '@context/UserContext'
import useDebounce from '@hooks/useDebounce'
import InputDashSearch from '@components/shared/form/InputDashSearch'
// const eventsUrl = `${process.env.NEXT_PUBLIC_API_EVENTS_WP}events`
const eventsUrl = `${process.env.apiV2}/channel-event/`

function Events() {
  const { user } = useContext(UserContext)
  const token = user?.token
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const debounceTerm = useDebounce(search, 500)

  const { data: events, error } = useSWR(
    token ? [`${eventsUrl}?page${page}&per_page=20&search=${debounceTerm}`, token] : null,
    getChannelEvents
  )

  const isLoading = !events && !error

  return (
    <div className="container ">
      <div className="d-flex  justify-content-between">
        <div>
          <h2 className="title-dashboard">Events</h2>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <InputDashSearch 
            value={search}
            name={'search'}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="row mt-5">
        {isLoading && <SpinnerLoader />}
        {events &&
          events.data.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
      </div>
    </div>
  )
}

export default Events
