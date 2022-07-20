import React, { useState } from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import VideoCard from "@components/creator/cards/VideoCard";

const videoUrl = `${process.env.apiV2}/video?author=`;

function VideosTab({ creator_id }) {
  const [page, setPage] = useState(1);
  const { data: videos, error } = useSWR(
    `${videoUrl}${creator_id}&page=${page}&per_page=12`,
    getFetchPublic
  );
  const isLoading = !videos && !error;
  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14">VIDEOS</h4>
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
  );
}

export default VideosTab;
