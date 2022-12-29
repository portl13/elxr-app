import React, { useEffect, useState } from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import EventCard from "@components/creator/cards/EventCard";
import Pagination from "@components/shared/pagination/Pagination";

const eventlUrl = `${process.env.apiV2}/channel-event?author=`;

function EventsTab({ creator_id }) {
  const limit = 12;
  const [page, setPage] = useState(1);
  const [filterTime, setFilterTime] = useState("upcoming");
  const [total, setTotal] = useState(0);

  const { data: events, error } = useSWR(
    `${eventlUrl}${creator_id}&page=${page}&per_page=${limit}&date_filter=${filterTime}`,
    getFetchPublic
  );
  const isLoading = !events && !error;

  useEffect(() => {
    if (events && events.total_items) {
      setTotal(events.total_items);
    }
  }, [events]);
  
  return (
    <>
      <div className="row mt-5">
        <div className="col-12 mb-3">
          <h4 className="color-font font-size-14">EVENTS</h4>

          <div className="p-1">
            <button
              onClick={() => setFilterTime("upcoming")}
              className={`custom-pills nowrap ${
                filterTime === "upcoming" ? "active" : ""
              }`}
            >
              Upcoming Events
            </button>{" "}
            <button
              onClick={() => setFilterTime("past")}
              className={`custom-pills nowrap ${
                filterTime === "past" ? "active" : ""
              }`}
            >
              Past Events
            </button>
          </div>
        </div>
        {isLoading && <SpinnerLoader />}
        {events && events.data && events.data.length === 0 && (
          <h3 className="col display-4"></h3>
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
  );
}

export default EventsTab;
