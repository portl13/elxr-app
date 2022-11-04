import React, {useEffect, useState} from 'react'
import useSWR from "swr";
import {getFetchPublic} from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import EventCard from "@components/creator/cards/EventCard";
import Pagination from "@components/shared/pagination/Pagination";

const baseUrl = process.env.apiV2
const eventUrl = `${baseUrl}/channel-event?channel_id=`

function TabEvents({ channel_id }) {
  const limit = 12;

  const [page, setPage] = useState(1)

  const [total, setTotal] = useState(0)

  const { data: events, error } = useSWR(
      `${eventUrl}${channel_id}&page=${page}&per_page=${limit}`,
      getFetchPublic
  )

  const isLoading = !events && !error

  useEffect(() => {
    if(events && events.total_items) {
      setTotal(events.total_items)
    }
  }, [events])


  return (
      <>
        <div className="row mt-5">
          {isLoading && <SpinnerLoader />}
          {events &&
              events.data &&
              events.data.length > 0 &&
              events.data.map((event) => (
                  <div key={event.id} className="col-12 col-md-6 col-lg-3 mb-4">
                    <EventCard event={event} />
                  </div>
              ))}
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <Pagination
                totalCount={total || 0}
                onPageChange={setPage}
                currentPage={page}
                pageSize={limit}
            />
          </div>
        </div>
      </>
  )
}

export default TabEvents
