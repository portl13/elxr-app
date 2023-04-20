import React, { useRef } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { FILTERS_POST, OPTIONS_SPLIDE_GENERAL_MUSIC } from "@utils/constant";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import GalleryCard from "@components/main/card/GalleryCard";
import CreatorSectionHeader from "@components/creator/tabs/home/CreatorSectionHeader";

function CreatorGalleries({ galleries, isLoading, setTab, setFilter, filter }) {
  const refSlide = useRef();

  if (galleries && galleries.galleries.length === 0) {
    return "";
  }

  return (
    <>
      <CreatorSectionHeader
        title={"Galleries"}
        setTab={() => setTab("galleries")}
      >
        {FILTERS_POST.map((fil) => (
          <button
            key={fil.value}
            onClick={() => setFilter(fil.value)}
            className={`category-btn ${filter === fil.value ? "active" : null}`}
          >
            {fil.label}
          </button>
        ))}
      </CreatorSectionHeader>
      {isLoading && (
        <div className={"row"}>
          <SpinnerLoader />
        </div>
      )}
      <div className="section-events">
        <Splide
          ref={refSlide}
          options={OPTIONS_SPLIDE_GENERAL_MUSIC}
          hasTrack={false}
        >
          <SplideTrack>
            {galleries &&
              galleries.galleries.length > 0 &&
              galleries.galleries.map((gallery) => (
                <SplideSlide key={gallery.id}>
                  <GalleryCard gallery={gallery} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>
    </>
  );
}

export default CreatorGalleries;
