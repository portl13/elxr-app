import EventCard from "@components/creator/cards/EventCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import EventCardNew from "../card/EventCardNew";



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
        <div className="col-12 d-flex justify-content-between mb-2">
          <h4 className="font-size-14">EVENTS</h4>
          <Link href={'/events'}>
            <a className="font-size-14 text-white">See all</a>
          </Link>
        </div>
        {isLoading && <SpinnerLoader />}
        {events && events.data && events.data.length === 0 && (
          <h3 className="col display-4">You have not created any events yet</h3>
        )}
        {events &&
          events.data &&
          events.data.length > 0 &&
          events.data.map((event) => (
            <div key={event.id} className="col-12 col-md-6 col-lg-2 mb-4">
              {/* <EventCard event={event} /> */}
              <EventCardNew event={event} />
            </div>
          ))}
      </div>
    </>
  );
}

export default SectionEvents;
