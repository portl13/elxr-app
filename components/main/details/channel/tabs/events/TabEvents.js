import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import EventCard from "@components/creator/cards/EventCard";
import Pagination from "@components/shared/pagination/Pagination";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
import MainEventCard from "@components/main/card/MainEventCard";

const baseUrl = process.env.apiV2;
const eventUrl = `${baseUrl}/channel-event?channel_id=`;

function TabEvents({ channel_id }) {
  const limit = 20;

  const [filterTime, setFilterTime] = useState("upcoming");

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${eventUrl}${channel_id}&page=${
        index + 1
      }&per_page=${limit}&single=true&date_filter=${filterTime}`,
    getFetchPublic
  );

  const events = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 mb-3">
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
      </div>
      <div className="row">{isLoadingInitialData && <SpinnerLoader />}</div>
      <InfinitScroll
        className={"row"}
        dataLength={events.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={!isLoadingInitialData ? <SpinnerLoading /> : null}
      >
        {events &&
          events?.map((event) => (
            <div key={event.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <MainEventCard event={event} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default TabEvents;
