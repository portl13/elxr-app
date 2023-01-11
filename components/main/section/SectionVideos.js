import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";

import React, { useRef, useState } from "react";
import useSWR from "swr";
import VideoCardNew from "../card/VideoCardNew";
import {FILTERS_POST, OPTIONS_SPLIDE_EVENTS, OPTIONS_SPLIDE_VIDEO} from "@utils/constant";
import useSWRImmutable from "swr/immutable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const videoUrl = `${process.env.apiV2}/video?all=true`;
const categoriesUrl = `${process.env.apiV2}/video/categories?hide=true`;

function SectionVideos({ search }) {
  const [filter, setFilter] = useState("desc");
  const [category, setCategory] = useState("");

  const refSlide = useRef();

  const next = () => {
    refSlide.current?.splide.go(">");
  };

  const prev = () => {
    refSlide.current?.splide.go("<");
  };

  const { data: videos, error } = useSWR(
    `${videoUrl}&page=1&per_page=5&order=${filter}&search=${search}&category=${category}`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const all = () => {
    setCategory("");
  };

  const isLoading = !videos && !error;

  if (videos?.videos?.length === 0) {
    return "";
  }

  return (
    <>
      <section>
        <div className="row mt-5 mb-5">
          <div className="col-12 mb-3">
            <h4 className="section-main-title text-capitalize">
              Latest popular videos from our creators
            </h4>
          </div>

          <div className="col-12 mb-3">
            <div className={"d-none d-md-flex mb-4"}>
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

            <div className="row mx-0 d-flex justify-content-between">
              <div className="row mx-0">
                <div className="p-1">
                  <span
                    onClick={all}
                    className={`text-capitalize section-category nowrap pointer ${
                      category === "" ? "active" : ""
                    }`}
                  >
                    All
                  </span>
                </div>
                {categories?.map((value) => (
                  <div key={value.label} className="p-1">
                    <span
                      onClick={() => setCategory(value.value)}
                      className={`text-capitalize section-category nowrap pointer ${
                        category === value.value ? "active" : ""
                      }`}
                    >
                      {value.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isLoading && <SpinnerLoader />}

        <div className="section-creator">
          <Splide
            ref={refSlide}
            options={OPTIONS_SPLIDE_VIDEO}
            hasTrack={false}
          >
            <SplideTrack>
              {videos?.videos &&
                videos?.videos.map((video) => (
                  <SplideSlide key={video.id}>
                    <VideoCardNew video={video} />
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
            <FontAwesomeIcon
              className="center-absolute"
              icon={faChevronRight}
            />
          </button>
        </div>
      </section>
    </>
  );
}

export default SectionVideos;
