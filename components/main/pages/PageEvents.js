import EventCard from "@components/creator/cards/EventCard";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React, { useState } from "react";
import useSWR from "swr";

const eventlUrl = `${process.env.apiV2}/channel-event?all=true`;

const tabs = [
  {
    tab: "all",
    label: "All",
  },
  {
    tab: "art",
    label: "Art",
  },
  {
    tab: "food",
    label: "Food",
  },
  {
    tab: "music",
    label: "Music",
  },
  {
    tab: "yoga",
    label: "Yoga",
  },
];

function PageEvents() {
  const [tab, setTab] = useState("");

  const { data: events, error } = useSWR(
    `${eventlUrl}&page=1&per_page=12`,
    getFetchPublic
  );
  const isLoading = !events && !error;

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Events</h4>
        </div>
        <div className="col-12 col-md-6 mb-5">
          {tabs.map((item) => (
            <button
              key={item.tab}
              onClick={() => setTab(item.tab)}
              className={`${
                tab === item.tab ? "active" : ""
              } custom-pills`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="col-12 col-md-6 mb-5">
          <div className="d-flex  justify-content-md-end">
            <InputDashSearch />
          </div>
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

export default PageEvents;
