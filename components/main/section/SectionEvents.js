import EventCard from "@components/creator/cards/EventCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, {useRef} from "react";
import useSWR from "swr";
import EventCardNew from "../card/EventCardNew";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import {OPTIONS_SPLIDE_EVENT} from "@utils/constant";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

const eventlUrl = `${process.env.apiV2}/channel-event?all=true`;

function SectionEvents() {

  const refSlide = useRef()

  const next = () => {
    refSlide.current.splide.go('>')
  }

  const prev = () => {
    refSlide.current.splide.go('<')
  }

  const { data: events, error } = useSWR(
    `${eventlUrl}&page=1&per_page=8`,
    getFetchPublic
  );

  const isLoading = !events && !error;

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-between mb-3">
          <h4 className="section-main-title text-uppercase">Events</h4>
          <span>
            <button onClick={prev} className="arrow-slide btn-icon-header mr-3">
              <FontAwesomeIcon className="center-absolute" icon={faChevronLeft} />
            </button>
            <button onClick={next} className="arrow-slide btn-icon-header mr-4">
              <FontAwesomeIcon className="center-absolute" icon={faChevronRight} />
            </button>
            <Link href={"/events"}>
              <a className="font-size-14 color-font">See all</a>
            </Link>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <div className="section-main section-events">
        <Splide ref={refSlide} options={OPTIONS_SPLIDE_EVENT} hasTrack={false}>
          <SplideTrack>
            {events &&
              events.data &&
              events.data.length > 0 &&
              events.data.map((event) =>
                  <SplideSlide key={event.id}>
                    <EventCard  event={event} />
                  </SplideSlide>
              )}
          </SplideTrack>
        </Splide>
      </div>
    </>
  );
}

export default SectionEvents;
