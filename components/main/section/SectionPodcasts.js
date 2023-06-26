import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { FILTERS_POST, OPTIONS_SPLIDE_GENERAL_MUSIC } from "@utils/constant";
import CardHomeMusic from "../card/CardHomeMusic";
import { useCategories } from "@context/EventsContext";
import SeeAllButton from "@components/main/ui/SeeAllButton";

const podcastslUrl = `${process.env.apiV2}/podcasts?all=true&single=true`;

function SectionPodcasts({ search }) {
  const [filter, setFilter] = useState("featured");
  const { cat: category } = useCategories();

  const refSlide = useRef();

  const { data: audios, error } = useSWR(
    `${podcastslUrl}&page=1&per_page=8&order=${filter}&search=${search}&category=${category.slug}`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  const isLoading = !audios && !error;

  if (audios?.length === 0) {
    return "";
  }

  return (
    <section className={"section-dark"}>
      <div className="row">
        <div className="col-12 mb-2 d-flex justify-content-between">
          <div className="d-flex flex-column w-100 flex-lg-row">
            <h4 className="section-main-title text-capitalize d-flex align-items-center justify-content-between">
              Trending Podcasts
              <SeeAllButton path={"/podcasts"} className={"d-lg-none d-flex"} />
            </h4>
            <div className={"filter-contents mb-2 ml-lg-3"}>
              {FILTERS_POST.map((fil) => (
                <button
                  key={fil.value}
                  onClick={() => setFilter(fil.value)}
                  className={`category-btn ${
                    filter === fil.value ? "active" : null
                  }`}
                >
                  {fil.label}
                </button>
              ))}
            </div>
          </div>
          <SeeAllButton path={"/podcasts"} className={"d-none d-lg-flex"} />
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
            {audios?.map((audio, index) => (
              <SplideSlide key={index}>
                <CardHomeMusic key={audio.id} type={"podcasts"} audio={audio} />
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </div>
    </section>
  );
}

export default SectionPodcasts;
