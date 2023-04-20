import React, { useRef } from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import {
  FILTERS_POST,
  OPTIONS_SPLIDE_EVENTS,
} from "@utils/constant";
import MainEventCard from "@components/main/card/MainEventCard";
import CreatorSectionHeader from "@components/creator/tabs/home/CreatorSectionHeader";

function CreatorEvents({
  events,
  isLoading,
  setTab,
  text = "Events",
  setFilter,
  filter,
}) {
  const refSlide = useRef();

  if (events && events.data && events.data.length === 0) {
    return "";
  }

  return (
    <>
      <CreatorSectionHeader title={text} setTab={() => setTab("events")}>
        {FILTERS_POST.map((fil) => (
          <button
            key={fil.value}
            onClick={() => setFilter(fil.value)}
            className={`category-btn ${filter === fil.value ? "active" : null}`}
          >
            {fil.label}
          </button>
        ))}
      </CreatorSectionHeader>
      {isLoading && (
        <div className={"row"}>
          <SpinnerLoader />
        </div>
      )}
      <div className="section-events">
        <Splide ref={refSlide} options={OPTIONS_SPLIDE_EVENTS} hasTrack={false}>
          <SplideTrack>
            {events &&
              events.data &&
              events.data.length > 0 &&
              events.data.map((event) => (
                <SplideSlide key={event.id}>
                  <MainEventCard event={event} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>
    </>
  );
}
export default CreatorEvents;
