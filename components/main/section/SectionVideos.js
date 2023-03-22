import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import VideoCardNew from "../card/VideoCardNew";
import { FILTERS_POST, OPTIONS_SPLIDE_VIDEO } from "@utils/constant";
import { useCategories } from "@context/EventsContext";
import SeeAllButton from "@components/main/ui/SeeAllButton";

const videoUrl = `${process.env.apiV2}/video?all=true`;

function SectionVideos({ search }) {
  const [filter, setFilter] = useState("desc");
  const { cat: category } = useCategories();

  const refSlide = useRef();

  const { data: videos, error } = useSWR(
    `${videoUrl}&page=1&per_page=5&order=${filter}&search=${search}&category=${category.slug}&single=true`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  const isLoading = !videos && !error;

  if (videos?.length === 0) {
    return "";
  }

  return (
    <>
      <section className={"section-dark"}>
        <div className="row">
          <div className="col-12 mb-2 d-flex justify-content-between">
            <div className="d-flex flex-column w-100 flex-lg-row">
              <h4 className="section-main-title text-capitalize d-flex align-items-center justify-content-between">
                Popular Videos
                <SeeAllButton path={"/videos"} className={"d-lg-none d-flex"} />
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

            <SeeAllButton path={"/videos"} className={"d-none d-lg-flex"} />
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
              {videos &&
                videos.map((video) => (
                  <SplideSlide key={video.id}>
                    <VideoCardNew video={video} />
                  </SplideSlide>
                ))}
            </SplideTrack>
          </Splide>
        </div>
      </section>
    </>
  );
}

export default SectionVideos;
