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

function CreatorVideos({ videos, isLoading, setTab, match }) {
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
        <div className="col-12 d-flex justify-content-between mb-2 align-items-baseline">
          <h4 className="section-main-title">VIDEOS</h4>
          <span>
            {!match && videos?.videos.length > OPTIONS_SPLIDE_BID_CARD.perPage && (
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
            <button className={"no-btn"} onClick={()=>setTab('videos')}>
              <span className="font-size-14 text-white">See all</span>
            </button>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <div className="section-video">
        {!match ? <Splide
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
                      <VideoCardNew video={video}/>
                    </SplideSlide>
                ))}
          </SplideTrack>
        </Splide> : null}

            {match && videos &&
              videos.videos &&
              videos.videos.length > 0 &&
              videos.videos.map((video) => (
                  <VideoCardNew  key={video.id} video={video} />
              ))}
      </div>
    </>
  );
}

export default CreatorVideos;
