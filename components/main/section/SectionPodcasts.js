import CardAudio from "@components/creator/cards/CardAudio";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, { useRef } from "react";
import useSWR from "swr";
import PodcastCardNew from "../card/PodcastCardNew";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { OPTIONS_SPLIDE_MULTI } from "@utils/constant";
import EventCardNew from "@components/main/card/EventCardNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const podcastslUrl = `${process.env.apiV2}/podcasts?all=true`;

function SectionPodcasts() {
  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: audios, error } = useSWR(
    `${podcastslUrl}&page=1&per_page=8`,
    getFetchPublic
  );
  const isLoading = !audios && !error;

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-between mb-3">
          <h4 className="section-main-title">PODCASTS</h4>
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
            <Link href={"/podcasts"}>
              <a className="font-size-14 text-white">See all</a>
            </Link>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <Splide ref={refSlide} options={OPTIONS_SPLIDE_MULTI} hasTrack={false}>
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

export default SectionPodcasts;
