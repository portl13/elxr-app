import React from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { Progress } from "reactstrap";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";

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
  if (
    video.status.state === "queued" ||
    video.status.state === "inprogress" ||
    video.status.state === "pendingupload"
  ) {
    return (
      <article className={`ratio ratio-16x9 bg-cover media-item bg-gray`}>
        <div className={"indicator-video"}>
          <SpinnerLoader width={"1.5rem"} height={"1.5rem"} pd={"p-0"} />
          <p className={"text-center font-size-12 m-0"}>
            Processing Media, Please Wait...
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className={`ratio ratio-16x9 bg-cover media-item bg-gray`}>
      <div className={"indicator-video"}></div>
    </article>
  );
};

function MediaLibraryVideoList({
  token,
  mediaSelected,
  setMediaSelected,
  tab,
}) {
  const { data: videos } = useSWR(
    token && tab === "media_library" ? ["/api/cloudflare/list", token] : null,
    genericFetch,
    {
      revalidateOnMount: true,
      refreshInterval: 1500,
    }
  );

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
