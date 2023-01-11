import React, { useRef } from "react";
import Link from "next/link";
import useSWR from "swr";
import { css } from "@emotion/core";
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

const creatorsSectionStyle = css`
  background-color: var(--bg);
`;

function SectionCreator() {
  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: creators, error } = useSWR(url, getFetchPublic, {
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

  return (
    <section css={creatorsSectionStyle}>
      <div className="row mt-5 mb-5">
        <div className="col-12 mb-3">
          <h4 className="section-main-title text-capitalize">
            Explore our creators
          </h4>
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

            <Link href="#">
              <button className={`text-capitalize section-more-btn nowrap`}>
                Discover more creators
              </button>
            </Link>
          </div>
        </div>
      </div>

      {isLoading && <SpinnerLoader />}

      <div className="section-main section-creator">
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
