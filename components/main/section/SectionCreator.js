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

const url = `${process.env.apiV2}/creator?page=1&per_page=12`;


function SectionCreator({search}) {
  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: creators, error } = useSWR(`${url}&search=${search}`, getFetchPublic, {
    revalidateOnFocus: false,
  });

  const isLoading = !creators && !error;

  const initialCategories = [
    { label: "All" },
    { label: "Activism" },
    { label: "Community" },
    { label: "Music" },
    { label: "Theatre" },
  ];

  if (creators?.users?.length === 0){
    return ''
  }

  return (
    <section className={"section-dark"} >
      <div className="row mt-2 mb-2">
        <div className="col-12 mb-3 d-flex justify-content-between">
          <h4 className="section-main-title text-white text-capitalize mb-0">
            Explore our creators
          </h4>
          <Link href="/creators">
            <a className={`text-capitalize text-font nowrap d-flex d-lg-none font-size-12 align-items-center`}>
              See All
            </a>
          </Link>
        </div>

        <div className="col-12 mb-3">
          <div className="row mx-0 d-flex justify-content-between">
            <div className="row mx-0">
              {initialCategories?.map((value) => (
                <div key={value.label} className="p-1">
                  <a
                    onClick={() => console.log("category ", value.label)}
                    className={`text-capitalize section-category nowrap pointer`}
                  >
                    {value.label}
                  </a>
                </div>
              ))}
            </div>

            <Link href="/creators">
              <a className={`text-capitalize section-more-btn nowrap d-none d-lg-block`}>
                Discover more creators
              </a>
            </Link>
          </div>
        </div>
      </div>
      {isLoading && <SpinnerLoader />}
      <div className="section-creator">
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
      <div className="row mx-0 d-flex justify-content-end mt-4">
        <button onClick={prev} className="arrow-slide section-arrow-btn mr-3">
          <FontAwesomeIcon className="center-absolute" icon={faChevronLeft} />
        </button>
        <button onClick={next} className="arrow-slide section-arrow-btn mr-4">
          <FontAwesomeIcon className="center-absolute" icon={faChevronRight} />
        </button>
      </div>
    </section>
  );
}

export default SectionCreator;
