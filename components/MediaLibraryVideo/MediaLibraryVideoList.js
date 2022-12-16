import React from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import useSWR from "swr";
import { format } from 'date-fns';
import { genericFetch } from "@request/dashboard";

const VideoListItemReady = ({ video }) => {
  return(
    <>
      <article
        style={{
          backgroundImage: `url(${video.thumbnail}?time=2s)`,
        }}
        className={`ratio ratio-16x9 bg-cover col-4`}
      ></article>

      <VideoMetadata video={video} />
    </>
  );
}

const VideoListItemLoading = () => {
  return(
    <>
      <article className={`ratio ratio-16x9 bg-cover media-item bg-gray col-4`}>
        <div className={"indicator-video"}>
          <SpinnerLoader width={"1.5rem"} height={"1.5rem"} pd={"p-0"} />
        </div>
      </article>

      <div className="media-metadata col-8 d-flex justify-content-center align-items-center">
        <p className={"text-center font-size-12 m-0"}>
          Processing Media, Please Wait...
        </p>
      </div>
    </>
  );
}

const VideoListItem = ({ video, mediaSelected, setMediaSelected }) => {

  return (
    <div
      onClick={() => setMediaSelected(video)}
      className={`media-item ${
        mediaSelected?.uid === video.uid ? "active" : ""
      }`}
    >
      <div className="selected-image row mx-0">

        {video.status.state === "ready" && <VideoListItemReady video={video} />}

        {(video.status.state === "queued" ||
          video.status.state === "inprogress" ||
          video.status.state === "pendingupload") && <VideoListItemLoading />}

      </div>
    </div>
  );

  // return (
  //   <article className={`ratio ratio-16x9 bg-cover media-item bg-gray`}>
  //     <div className={"indicator-video"}></div>
  //   </article>
  // );
};

const VideoMetadata = ({ video }) => {
  return(
    <div className='media-metadata col-8'>
      <h6 className='media-metadata-title'>
        {video?.meta?.name || ''}
      </h6>
      <div className='media-metadata-minor'>
        <span>{video?.uploaded ? format(new Date(video.uploaded), 'dd MMMM yyyy') : ''}</span>
      </div>
      <span className='media-metadata-url'>{video?.preview || ''}</span>
    </div>
  )
}

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
      <div>
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
