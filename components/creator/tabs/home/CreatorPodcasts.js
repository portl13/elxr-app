import React, { useRef } from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { OPTIONS_SPLIDE_SMALL_CARD } from "@utils/constant";
import PodcastCardNew from "@components/main/card/PodcastCardNew";

function CreatorPodcasts({ audios, isLoading, setTab, match }) {
  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  if (audios && audios.audios && audios.audios.length === 0) {
    return "";
  }

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-between mb-3 align-items-baseline">
          <h4 className="section-main-title">Podcasts</h4>
          <span>
            {audios?.audios.length > OPTIONS_SPLIDE_SMALL_CARD.perPage && (
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
            <button className={"no-btn"} onClick={() => setTab("podcasts")}>
              <span className="font-size-14 color-font">See all</span>
            </button>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <div className="section-main section-events">
        <Splide
          ref={refSlide}
          options={OPTIONS_SPLIDE_SMALL_CARD}
          hasTrack={false}
        >
          <SplideTrack>
            {audios &&
              audios.audios &&
              audios.audios.length > 0 &&
              audios.audios.map((audio) => (
                <SplideSlide key={audio.id}>
                  <PodcastCardNew audio={audio} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>
    </>
  );
}

export default CreatorPodcasts;
