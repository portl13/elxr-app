import VideoCard from "@components/creator/cards/VideoCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";

import React, {useRef, useState} from "react";
import useSWR from "swr";
import VideoCardNew from "../card/VideoCardNew";
import {FILTERS_POST, OPTIONS_SPLIDE_GENERAL, OPTIONS_SPLIDE_MULTI} from "@utils/constant";
import EventCardNew from "@components/main/card/EventCardNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const videoUrl = `${process.env.apiV2}/video?all=true`;

function SectionVideos({search, category}) {
  const [filter, setFilter] = useState("desc");

  const refSlide = useRef();

  const next = () => {
    refSlide.current?.splide.go(">");
  };

  const prev = () => {
    refSlide.current?.splide.go("<");
  };

  const { data: videos, error } = useSWR(
    `${videoUrl}&page=1&per_page=6&order=${filter}&search=${search}&category=${category}`,
    getFetchPublic
  );

  const isLoading = !videos && !error;

  if (videos?.videos?.length === 0){
    return ''
  }

  return (
    <section className={"section-home"}>
      <div className="row">
        <div className="col-12 d-flex justify-content-between mb-3">
          <div className={"d-flex align-items-center mb-3"}>
            <h4 className="section-main-title text-capitalize mb-0 mr-5">
              Videos
            </h4>
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
            <Link href={"/videos"}>
              <a className="font-size-14 color-font">See all</a>
            </Link>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <div className="section-video">
        <Splide ref={refSlide} options={OPTIONS_SPLIDE_GENERAL} hasTrack={false}>
          <SplideTrack>
            {videos &&
              videos.videos &&
              videos.videos.length > 0 &&
              videos.videos.map((video) => (
                <SplideSlide key={video.id}>
                  <VideoCardNew video={video} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>
    </section>
  );
}

export default SectionVideos;
