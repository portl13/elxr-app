import React, { useRef } from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import EventCard from "../../cards/EventCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { OPTIONS_SPLIDE_BID_CARD, OPTIONS_SPLIDE_EVENT } from "@utils/constant";

function CreatorEvents({ events, isLoading }) {
  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  if (events && events.data && events.data.length === 0) {
    return "";
  }

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-between mb-3">
          <h4 className="section-main-title">Events</h4>
          <span>
            {events?.data.length > OPTIONS_SPLIDE_BID_CARD.perPage && (
              <>
                <button
                  onClick={prev}
                  className="arrow-slide btn-icon-header mr-3"
                >
                  <FontAwesomeIcon
                    className="center-absolute"
                    icon={faChevronLeft}
                  />
                </button>
                <button
                  onClick={next}
                  className="arrow-slide btn-icon-header mr-4"
                >
                  <FontAwesomeIcon
                    className="center-absolute"
                    icon={faChevronRight}
                  />
                </button>
              </>
            )}
            <Link href={"/events"}>
              <a className="font-size-14 text-white">See all</a>
            </Link>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <div className="section-main section-events">
        <Splide
          ref={refSlide}
          options={OPTIONS_SPLIDE_BID_CARD}
          hasTrack={false}
        >
          <SplideTrack>
            {events &&
              events.data &&
              events.data.length > 0 &&
              events.data.map((event) => (
                <SplideSlide key={event.id}>
                  <EventCard event={event} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>
    </>
  );
}
export default CreatorEvents;
