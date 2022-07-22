import EventCard from "@components/creator/cards/EventCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React from "react";
import useSWR from "swr";



const eventlUrl = `${process.env.apiV2}/channel-event?all=true`

function SectionEvents() {

    const { data: events, error } = useSWR(
        `${eventlUrl}&page=1&per_page=4`,
        getFetchPublic
      )
    const isLoading = !events && !error


  return (
    <>
      <div className="row mt-4">
        <div className="col-12">
          <h4 className="font-size-14">EVENTS</h4>
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
    </>
  );
}

export default SectionEvents;
