import VideoCard from "@components/creator/cards/VideoCard";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React, { useState } from "react";
import useSWR from "swr";

const videoUrl = `${process.env.apiV2}/video?all=true`;

const tabs = [
  {
    tab: "all",
    label: "All",
  },
  {
    tab: "art",
    label: "Art",
  },
  {
    tab: "food",
    label: "Food",
  },
  {
    tab: "music",
    label: "Music",
  },
  {
    tab: "yoga",
    label: "Yoga",
  },
];

function PageVideos() {
  const [tab, setTab] = useState("");
  const { data: videos, error } = useSWR(
    `${videoUrl}&page=1&per_page=12`,
    getFetchPublic
  );

  const isLoading = !videos && !error;

  return (
    <>
      <div className="row mt-5">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Videos</h4>
        </div>
        <div className="col-12 col-md-6 mb-5">
          {tabs.map((item) => (
            <button
              key={item.tab}
              onClick={() => setTab(item.tab)}
              className={`${
                tab === item.tab ? "active" : ""
              }btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="col-12 col-md-6 mb-5">
          <div className="d-flex  justify-content-md-end">
            <InputDashSearch />
          </div>
        </div>
        {isLoading && <SpinnerLoader />}
        {videos &&
          videos.videos &&
          videos.videos.length > 0 &&
          videos.videos.map((video) => (
            <div key={video.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <VideoCard video={video} />
            </div>
          ))}
        {videos && videos.videos && videos.videos.length === 0 && (
          <h3 className="col display-4">You have not created any videos yet</h3>
        )}
      </div>
    </>
  );
}

export default PageVideos;
