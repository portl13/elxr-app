import React from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { Progress } from "reactstrap";

const VideoListItem = ({ video, mediaSelected, setMediaSelected }) => {
  if (video.status.state === "ready") {
    return (
      <article
        onClick={() => setMediaSelected(video)}
        style={{
          backgroundImage: `url(${video.thumbnail})`,
        }}
        className={`ratio ratio-16x9 bg-cover media-item ${
          mediaSelected?.uid === video.uid ? "active" : ""
        }`}
      ></article>
    );
  }

  return (
    <article className={`ratio ratio-16x9 bg-cover media-item`}>
      <div>
        <SpinnerLoader />
        <p className={"text-center font-size-12"}>
          Processing Media, Please Wait...
        </p>
        <Progress animated value={video.status.pctComplete} />
      </div>
    </article>
  );
};

function MediaLibraryVideoList({ videos, mediaSelected, setMediaSelected }) {
  return (
    <>
      {!videos && <SpinnerLoader />}
      <div className={"grid-video-media"}>
        {videos &&
          videos.result &&
          videos.result?.videos.map((video) => (
            <VideoListItem
              key={video.uid}
              video={video}
              mediaSelected={mediaSelected}
              setMediaSelected={setMediaSelected}
            />
          ))}
      </div>
    </>
  );
}

export default MediaLibraryVideoList;
