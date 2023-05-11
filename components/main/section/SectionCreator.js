import React, { useRef } from "react";
import Link from "next/link";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { getFetchPublic } from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import CreatorCardNew from "../card/CreatorCardNew";
import { OPTIONS_SPLIDE_CREATOR } from "@utils/constant";
import { useCategories } from "@context/EventsContext";

const url = `${process.env.apiV2}/creator?page=1&per_page=12`;

function SectionCreator({ search }) {
  const refSlide = useRef();
  const { cat } = useCategories();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: creators, error } = useSWR(
    `${url}&featured=true&search=${search}&category=${cat.creator}`,
    getFetchPublic,
    {
      revalidateOnFocus: false,
    }
  );

  const isLoading = !creators && !error;

  if (creators?.users?.length === 0) {
    return "";
  }

  return (
    <section className={"section-dark"}>
      <div className="row mb-3">
        <div className="col-12 mb-2 d-flex justify-content-between">
          <h4 className="section-main-title text-capitalize mb-0">
            Featured Professionals
          </h4>
          <Link href="/professionals">
            <a
              className={`text-capitalize text-font nowrap d-flex font-size-12 align-items-center`}
            >
              See All
            </a>
          </Link>
        </div>
      </div>
      {isLoading && <SpinnerLoader />}
      <div className="section-creator pb-4">
        <Splide
          ref={refSlide}
          options={OPTIONS_SPLIDE_CREATOR}
          hasTrack={false}
        >
          <SplideTrack>
            {creators &&
              creators.users.length > 0 &&
              creators.users &&
              creators.users.map((creator) => (
                <SplideSlide key={creator.id}>
                  <CreatorCardNew creator={creator} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>
    </section>
  );
}

export default SectionCreator;
