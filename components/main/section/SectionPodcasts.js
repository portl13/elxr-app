import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, {useRef, useState} from "react";
import useSWR from "swr";
import PodcastCardNew from "../card/PodcastCardNew";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import {FILTERS_POST, OPTIONS_SPLIDE_MULTI} from "@utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const podcastslUrl = `${process.env.apiV2}/podcasts?all=true`;

function SectionPodcasts({search, category}) {
  const [filter, setFilter] = useState("desc");

  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: audios, error } = useSWR(
    `${podcastslUrl}&page=1&per_page=8&order=${filter}&search=${search}&category=${category}`,
    getFetchPublic
  );

  const isLoading = !audios && !error;

  if (audios?.audios?.length === 0){
    return ''
  }

  return (
    <section className={"section-home"}>
      <div className="row">
        <div className="col-12 d-flex justify-content-between mb-md-3">
          <div className={"d-flex align-items-center mb-3"}>
            <h4 className="section-main-title text-capitalize mb-0 mr-5">
              Podcasts
            </h4>
            <div className={"d-none d-md-flex"}>
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
            <Link href={"/podcasts"}>
              <a className="font-size-14 color-font">See all</a>
            </Link>
          </span>
        </div>
        <div className="col-12 d-md-none mb-3">
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
    </section>
  );
}

export default SectionPodcasts;
