import React from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";

function MediaLibraryVideoList({ videos, mediaSelected, setMediaSelected }) {
  return (
    <>
      {!videos && <SpinnerLoader />}
      <div className={"grid-video-media"}>
        {videos &&
          videos.result &&
          videos.result?.videos.map((video) => (
            <article
                onClick={()=>setMediaSelected(video)}
              style={{
                backgroundImage: `url(${video.thumbnail})`,
              }}
              className={`ratio ratio-16x9 bg-cover media-item ${
                mediaSelected?.uid === video.uid ? "active" : ""
              }`}
              key={video.uid}
            ></article>
          ))}
      </div>
    </>
  );
}

export default MediaLibraryVideoList;
