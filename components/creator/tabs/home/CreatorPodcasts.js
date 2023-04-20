import React, { useRef } from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { FILTERS_POST, OPTIONS_SPLIDE_GENERAL_MUSIC } from "@utils/constant";
import CardHomeMusic from "@components/main/card/CardHomeMusic";
import CreatorSectionHeader from "@components/creator/tabs/home/CreatorSectionHeader";

function CreatorPodcasts({ audios, isLoading, setTab, filter, setFilter }) {
  const refSlide = useRef();

  if (audios && audios.audios && audios.audios.length === 0) {
    return "";
  }

  return (
    <>
      <CreatorSectionHeader
        title={"Podcasts"}
        setTab={() => setTab("podcasts")}
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
            {audios &&
              audios.audios &&
              audios.audios.length > 0 &&
              audios.audios.map((audio) => (
                <SplideSlide key={audio.id}>
                  <CardHomeMusic
                    key={audio.id}
                    type={"podcasts"}
                    audio={audio}
                  />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>
    </>
  );
}

export default CreatorPodcasts;
