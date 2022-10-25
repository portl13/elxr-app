import React, { useRef } from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import CardAudio from "../../cards/CardAudio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import {
  OPTIONS_SPLIDE_MULTI,
  OPTIONS_SPLIDE_SMALL_CARD,
} from "@utils/constant";
import PodcastCardNew from "@components/main/card/PodcastCardNew";

function CreatorPodcasts({ audios, isLoading }) {
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
        <div className="col-12 d-flex justify-content-between mb-3">
          <h4 className="section-main-title">PODCASTS</h4>
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
            <Link href={"/podcasts"}>
              <a className="font-size-14 text-white">See all</a>
            </Link>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>

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
    </>
  );
}

export default CreatorPodcasts;
