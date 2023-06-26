import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { FILTERS_POST, OPTIONS_SPLIDE_EVENTS } from "@utils/constant";
import MainEventCard from "@components/main/card/MainEventCard";
import { useCategories } from "@context/EventsContext";
import SeeAllButton from "@components/main/ui/SeeAllButton";

const eventUrl = `${process.env.apiV2}/channel-event?all=true`;

function SectionEvents({ search }) {
  const [filter, setFilter] = useState("featured");
  const { cat: category } = useCategories();
  const refSlide = useRef();

  const { data: events, isLoading } = useSWR(
    `${eventUrl}&page=1&per_page=8&order=${filter}&search=${search}&category=${category.slug}&date_filter=upcoming&single=true`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  if (events?.length === 0) {
    return "";
  }

  return (
    <section className={"section-dark"}>
      <div className="row">
        <div className="col-12 mb-2 d-flex justify-content-between">
          <div className={"d-flex flex-column flex-lg-row w-100"}>
            <h4 className="section-main-title text-capitalize d-flex align-items-center justify-content-between">
              Live Stream Events{" "}
              <SeeAllButton path={"/events"} className={"d-lg-none d-flex"} />
            </h4>
            <div className={"filter-contents mb-2 ml-lg-3"}>
              {FILTERS_POST.map((fil) => (
                <button
                  key={fil.value}
                  onClick={() => setFilter(fil.value)}
                  className={`category-btn ${
                    filter === fil.value ? "active" : null
                  }`}
                >
                  {fil.label}
                </button>
              ))}
            </div>
          </div>
          <SeeAllButton path={"/events"} className={"d-none d-lg-flex"} />
        </div>
      </div>

      {isLoading && <SpinnerLoader />}

      <div className="section-creator">
        <Splide ref={refSlide} options={OPTIONS_SPLIDE_EVENTS} hasTrack={false}>
          <SplideTrack>
            {events &&
              events.map((event) => (
                <SplideSlide key={event.id}>
                  <MainEventCard event={event} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>
    </section>
  );
}

export default SectionEvents;
