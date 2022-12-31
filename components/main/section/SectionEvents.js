import EventCard from "@components/creator/cards/EventCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { FILTERS_POST, OPTIONS_SPLIDE_EVENT } from "@utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const eventlUrl = `${process.env.apiV2}/channel-event?all=true`;

function SectionEvents({search, category}) {
  const [filter, setFilter] = useState("desc");

  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: events, error } = useSWR(
    `${eventlUrl}&page=1&per_page=8&order=${filter}&search=${search}&category=${category}&date_filter=upcoming`,
    getFetchPublic, {revalidateOnFocus: false}
  );

  const isLoading = !events && !error;

  if (events?.data?.length === 0){
    return ''
  }

  return (
    <section className={"section-home"}>
      <div className="row">
        <div className="col-12 d-flex justify-content-between mb-md-3">
          <div className={"d-flex align-items-center mb-3"}>
            <h4 className="section-main-title text-capitalize mb-0 mr-5">
              Events
            </h4>
            <div className={"d-none d-md-flex"}>
              {FILTERS_POST.map((fil) => (
                <button
                  key={fil.value}
                  onClick={() => setFilter(fil.value)}
                  className={`custom-pills nowrap ${
                    filter === fil.value ? "active" : null
                  }`}
                >
                  {fil.label}
                </button>
              ))}
            </div>
          </div>
          <span>
            <button onClick={prev} className="arrow-slide btn-icon-header mr-3">
              <FontAwesomeIcon
                className="center-absolute"
                icon={faChevronLeft}
              />
            </button>
            <button onClick={next} className="arrow-slide btn-icon-header mr-4">
              <FontAwesomeIcon
                className="center-absolute"
                icon={faChevronRight}
              />
            </button>
            <Link href={"/events"}>
              <a className="font-size-14 color-font">See all</a>
            </Link>
          </span>
        </div>
      <div className="col-12 mb-3 d-md-none">
          <div className={"d-flex"}>
            {FILTERS_POST.map((fil) => (
                <button
                    key={fil.value}
                    onClick={() => setFilter(fil.value)}
                    className={`custom-pills nowrap ${
                        filter === fil.value ? "active" : null
                    }`}
                >
                  {fil.label}
                </button>
            ))}
          </div>
      </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <div className="section-main section-events">
        <Splide ref={refSlide} options={OPTIONS_SPLIDE_EVENT} hasTrack={false}>
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
    </section>
  );
}

export default SectionEvents;
