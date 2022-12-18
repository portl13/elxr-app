import React, { useRef } from "react";
import Link from "next/link";
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import CreatorCardNew from "../card/CreatorCardNew";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { OPTIONS_SPLIDE_CREATOR } from "@utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const url = `${process.env.apiV2}/creator?page=1&per_page=12`;

function SectionCreator() {
  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: creators, error } = useSWR(url, getFetchPublic);

  const isLoading = !creators && !error;

  return (
    <>
      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-between mb-3">
          <h4 className="section-main-title text-capitalize">Creators</h4>
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
            <Link href={"/creators"}>
              <a className="font-size-14 color-font">See all</a>
            </Link>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <div className="section-main section-creator">
        <Splide ref={refSlide} options={OPTIONS_SPLIDE_CREATOR} hasTrack={false}>
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
    </>
  );
}

export default SectionCreator;
