import React from 'react'
import { getFetchPublic } from '@request/creator'
import useSWR from 'swr'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import EventCardPartner from './EventCardPartner'

const baseUrl = process.env.NEXT_PUBLIC_API_EVENTS_WP

const eventlUrl = `${baseUrl}events`

function EventPartnerRelated({ category }) {
  const { data: events } = useSWR(
    `${eventlUrl}?page=${1}&per_page=${3}${
      category ? '&categories=' + category : ''
    }`,
    getFetchPublic
  )
  const isLoading = !events

  return (
    <aside>
      {isLoading && <SpinnerLoader />}
      {events &&
        events.events &&
        events.events.length > 0 &&
        events.events.map((event) => (
          <div key={event.id} className="mb-4">
            <EventCardPartner event={event} />
          </div>
        ))}
    </aside>
  )
}

export default EventPartnerRelated
