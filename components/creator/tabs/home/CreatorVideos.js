import React, { useRef } from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import {
  OPTIONS_SPLIDE_BID_CARD
} from "@utils/constant";
import VideoCardNew from "@components/main/card/VideoCardNew";

function CreatorVideos({ videos, isLoading }) {
  const refSlide = useRef();

  const next = () => {
    refSlide.current?.splide.go(">");
  };

  const prev = () => {
    refSlide.current?.splide.go("<");
  };

  if (videos && videos.videos && videos.videos.length === 0) {
    return "";
  }

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-between mb-2">
          <h4 className="section-main-title">VIDEOS</h4>
          <span>
            {videos?.videos.length > OPTIONS_SPLIDE_BID_CARD.perPage && (
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
            <Link href={"/videos"}>
              <a className="font-size-14 text-white">See all</a>
            </Link>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <div className="section-video">
        <Splide
          ref={refSlide}
          options={OPTIONS_SPLIDE_BID_CARD}
          hasTrack={false}
        >
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
    </>
  );
}

export default CreatorVideos;
