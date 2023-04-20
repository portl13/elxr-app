import React, { useRef } from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { FILTERS_POST, OPTIONS_SPLIDE_VIDEO } from "@utils/constant";
import VideoCardNew from "@components/main/card/VideoCardNew";
import CreatorSectionHeader from "@components/creator/tabs/home/CreatorSectionHeader";

function CreatorVideos({ videos, isLoading, setTab, filter, setFilter }) {
  const refSlide = useRef();

  if (videos && videos.videos && videos.videos.length === 0) {
    return "";
  }

  return (
    <>
      <CreatorSectionHeader title={"Videos"} setTab={() => setTab("videos")}>
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
      <div className="section-video">
        <Splide ref={refSlide} options={OPTIONS_SPLIDE_VIDEO} hasTrack={false}>
          <SplideTrack>
            {videos &&
              videos.videos &&
              videos.videos.length > 0 &&
              videos.videos.map((video) => (
                <SplideSlide key={video.id}>
                  <VideoCardNew video={video} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>
    </>
  );
}

export default CreatorVideos;
