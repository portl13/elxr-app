import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { FILTERS_POST, OPTIONS_SPLIDE_COURSES } from "@utils/constant";
import GalleryCard from "@components/main/card/GalleryCard";
import { useCategories } from "@context/EventsContext";

const url = `${process.env.apiV2}/gallery?all=true`;

function SectionGalleries({ search }) {
  const [filter, setFilter] = useState("featured");
  const { cat } = useCategories();

  const refSlide = useRef();

  const { data: galleries, error } = useSWR(
    `${url}&page=1&per_page=6&order=${filter}&search=${search}&category=${cat.slug}&single=true`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  const isLoading = !galleries && !error;

  if (galleries?.length === 0) {
    return "";
  }

  return (
    <>
      <section className={"section-dark"}>
        <div className="row">
          <div className="col-12 mb-2 d-flex justify-content-between">
            <div className="d-flex flex-column flex-lg-row w-100">
              <h4 className="section-main-title text-capitalize d-flex align-items-center justify-content-between">
                Image Galleries
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
          </div>
        </div>

        {isLoading && <SpinnerLoader />}

        <div className="section-creator">
          <Splide
            ref={refSlide}
            options={OPTIONS_SPLIDE_COURSES}
            hasTrack={false}
          >
            <SplideTrack>
              {galleries &&
                galleries?.map((gallery) => (
                  <SplideSlide key={gallery.id}>
                    <GalleryCard gallery={gallery} />
                  </SplideSlide>
                ))}
            </SplideTrack>
          </Splide>
        </div>
      </section>
    </>
  );
}

export default SectionGalleries;
