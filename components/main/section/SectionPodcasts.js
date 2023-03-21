import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { FILTERS_POST, OPTIONS_SPLIDE_GENERAL_MUSIC } from "@utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useSWRImmutable from "swr/immutable";
import CardHomeMusic from "../card/CardHomeMusic";
import { chuckSize } from "@utils/chuckSize";
import ScrollTags from "@components/shared/slider/ScrollTags";
import {useCategories} from "@context/EventsContext";

const podcastslUrl = `${process.env.apiV2}/podcasts?all=true&single=true`;
const categoriesUrl = `${process.env.apiV2}/podcasts/categories?hide=true`;

function SectionPodcasts({ search }) {
  const [filter, setFilter] = useState("desc");
  //const [category, setCategory] = useState("");
  const { cat: category } = useCategories();
  const [podcasts, setPodcasts] = useState([]);

  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: audios, error } = useSWR(
    `${podcastslUrl}&page=1&per_page=8&order=${filter}&search=${search}&category=${category.slug}&with_author=true`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  //const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const isLoading = !audios && !error;

  // const all = () => {
  //   setCategory("");
  // };

  useEffect(() => {
    if (audios?.length) {
      setPodcasts(chuckSize(audios, 2));
    }
  }, [audios]);

  if (audios?.length === 0) {
    return "";
  }

  return (
    <section className={"section-dark"}>
      <div className="row mb-2">
        <div className="col-12 mb-3">
          <h4 className="section-event-title text-capitalize d-flex justify-content-between">
          Trending episodes
          </h4>
          <span className='sub-title-event'>
          The most popular podcasts overall now. Last updated 2 hours ago</span>
          <Link href="/podcasts">
            <a
              className={`text-capitalize text-font nowrap d-flex d-lg-none font-size-12 align-items-center`}
            >
              See All
            </a>
          </Link>
        </div>
{/* 
        <div className="col-12 mb-3">
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
        </div> */}

        <div className="col-12 mb-3">
          <div className="row mx-0 d-flex justify-content-between">
            <div className="col-12 col-lg-10 p-0 mx-0">
              {/*<ScrollTags>*/}
              {/*  <div className="p-1">*/}
              {/*    <span*/}
              {/*      onClick={all}*/}
              {/*      className={`text-capitalize section-category color-font-grey nowrap pointer ${*/}
              {/*        category === "" ? "active" : ""*/}
              {/*      }`}*/}
              {/*    >*/}
              {/*      All*/}
              {/*    </span>*/}
              {/*  </div>*/}
              {/*  {categories?.map((value) => (*/}
              {/*    <div key={value.label} className="p-1">*/}
              {/*      <span*/}
              {/*        onClick={() => setCategory(value.value)}*/}
              {/*        className={`text-capitalize section-category nowrap pointer ${*/}
              {/*          category === value.value ? "active" : ""*/}
              {/*        }`}*/}
              {/*      >*/}
              {/*        {value.label}*/}
              {/*      </span>*/}
              {/*    </div>*/}
              {/*  ))}*/}
              {/*</ScrollTags>*/}
            </div>

            <Link href={"/podcasts"}>
              <a
                className={`section-more-btn-light nowrap  d-none d-lg-block mr-md-0 text-center`}
              >
                Discover more podcasts 
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="section-podcasts">
        {isLoading && <SpinnerLoader />}
        <Splide
          ref={refSlide}
          options={OPTIONS_SPLIDE_GENERAL_MUSIC}
          hasTrack={false}
        >
          <SplideTrack>
            {podcasts?.map((audio, index) => (
              <SplideSlide key={index}>
                {audio.map((p) => (
                  <CardHomeMusic key={p.id} type={"podcasts"} audio={p} />
                ))}
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
