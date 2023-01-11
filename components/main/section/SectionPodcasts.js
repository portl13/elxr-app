import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import PodcastCardNew from "../card/PodcastCardNew";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { FILTERS_POST, OPTIONS_SPLIDE_GENERAL_MUSIC } from "@utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useSWRImmutable from "swr/immutable";
import CardHomeMusic from "../card/CardHomeMusic";

const podcastslUrl = `${process.env.apiV2}/podcasts?all=true`;
const categoriesUrl = `${process.env.apiV2}/podcasts/categories?hide=true`;

function SectionPodcasts({ search }) {
  const [filter, setFilter] = useState("desc");
  const [category, setCategory] = useState("");

  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: audios, error } = useSWR(
    `${podcastslUrl}&page=1&per_page=8&order=${filter}&search=${search}&category=${category}`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const isLoading = !audios && !error;

  const all = () => {
    setCategory("");
  };

  if (audios?.audios?.length === 0) {
    return "";
  }

  return (
    <section className={"section-home"}>
      <div className="row mt-5 mb-5">
        <div className="col-12 mb-3">
          <h4 className="section-main-title text-capitalize ">
            Trending podcasts and episodes
          </h4>
        </div>

        <div className="col-12 mb-3">
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

        <div className="col-12 mb-3">
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

            <Link href={"/podcasts"}>
              <a className={`text-capitalize section-more-btn nowrap`}>
                Discover more podcasts
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="section-podcasts">
        {isLoading && <SpinnerLoader />}
        <Splide ref={refSlide} options={OPTIONS_SPLIDE_GENERAL_MUSIC} hasTrack={false}>
          <SplideTrack>
            {audios &&
              audios.audios &&
              audios.audios.length > 0 &&
              audios.audios.map((audio) => (
                <SplideSlide key={audio.id}>
                  {/* <PodcastCardNew audio={audio} /> */}
                  <CardHomeMusic audio={audio} />
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

export default SectionPodcasts;
