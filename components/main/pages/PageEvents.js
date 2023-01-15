import React, { useState, useEffect } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Pagination from "@components/shared/pagination/Pagination";
import ScrollTags from "@components/shared/slider/ScrollTags";
import useDebounce from "@hooks/useDebounce";
import { genericFetch, getFetchPublic } from "@request/creator";
import EventCard from "@components/creator/cards/EventCard";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
import VideoCardNew from "@components/main/card/VideoCardNew";

const eventlUrl = `${process.env.apiV2}/channel-event?all=true`;
const categoriesUrl = `${process.env.apiV2}/channel-event/categories?hide=true`;

function PageEvents() {
  const limit = 12;
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("desc");
  const [filterTime, setFilterTime] = useState("upcoming");

  const debounceTerm = useDebounce(search, 500);

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${eventlUrl}&page=${
        index + 1
      }&per_page=${limit}&category=${category}&search=${debounceTerm}&date_filter=${filterTime}&order=${filter}&single=true`,
    genericFetch
  );

  const events = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const all = () => {
    setCategory("");
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-9 mb-3">
          <ScrollTags>
            <button
              onClick={() => {
                setFilter("desc");
                setFilterTime("upcoming");
              }}
              className={`custom-pills nowrap ${
                filter === "desc" ? "active" : ""
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => {
                setFilter("popular");
                setFilterTime("upcoming");
              }}
              className={`custom-pills nowrap ${
                filter === "popular" ? "active" : ""
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => {
                setFilter("alphabetical");
                setFilterTime("upcoming");
              }}
              className={`custom-pills nowrap ${
                filter === "alphabetical" ? "active" : ""
              }`}
            >
              Alphabetical
            </button>
            <button
              onClick={() => {
                setFilterTime("past");
                setFilter("");
              }}
              className={`custom-pills nowrap ${
                filterTime === "past" ? "active" : ""
              }`}
            >
              Past Events
            </button>
          </ScrollTags>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 mb-4 mb-md-5">
          <ScrollTags>
            <div className="p-1">
              <span
                onClick={all}
                className={`text-capitalize section-category nowrap pointer ${
                  category === "" ? "active" : ""
                }`}
              >
                All
              </span>
            </div>
            {categories?.map((value) => (
              <div key={value.id} className="p-1">
                <span
                  onClick={() => setCategory(value.slug)}
                  className={`text-capitalize section-category nowrap pointer  ${
                    category === value.slug ? "active" : ""
                  }`}
                >
                  {value.name}
                </span>
              </div>
            ))}
          </ScrollTags>
        </div>
        <div className="col-12 col-md-3 mb-4 mb-md-5">
          <div className="d-flex  justify-content-md-end">
            <InputDashSearch
              value={search}
              name={"search"}
              onChange={(e) => setSearch(e.target.value)}
            />
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
          events.map((event) => (
            <div key={event.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <EventCard event={event} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default PageEvents;
