import React, { useContext, useState } from 'react'
import { UserContext } from '@context/UserContext'
import useSWR from 'swr'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getChannelEvents } from '@request/dashboard'
import EventCard from '@components/dashboard/events/EventCard'
const eventsUrl = `${process.env.apiV2}/channel-event/`

function ChannelTabEvents({ id }) {
  const { user } = useContext(UserContext)
  const token = user?.token
  const limit = 20
  const [page, setPage] = useState(1)
  const { data: events, error } = useSWR(
    token
      ? [`${eventsUrl}?page${page}&per_page=${limit}&channel_id=${id}`, token]
      : null,
    getChannelEvents
  )
  const isLoading = !events && !error
  return (
    <div className="row">
      {isLoading && <SpinnerLoader />}
      {events &&
        events.data.map((event) => <EventCard event={event} key={event.id} />)}
    </div>
  )
}

export default ChannelTabEvents
