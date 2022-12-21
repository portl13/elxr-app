import React from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { format } from 'date-fns';

const VideoItemReady = ({ video }) => {
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

const VideoItemLoading = () => {
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

const VideoMetadata = ({ video }) => {
  return(
    <div className='media-metadata col-8'>
      <h4 className='media-metadata-title'>
        {video?.meta?.name || ''}
      </h4>
      <div className='media-metadata-minor'>
        <span>{video?.uploaded ? format(new Date(video.uploaded), 'dd MMMM yyyy') : ''}</span>
      </div>
      <span className='media-metadata-url'>{video?.preview || ''}</span>
    </div>
  )
}

const MediaLibraryVideoItem = ({ 
  video, 
  mediaSelected, 
  setMediaSelected, 
  selectVideoItem,
  selectedVideoItems,
  selectToDelete
}) => {

  const checkInActive = (videoItems, videoItem) => {
    const index = videoItems.findIndex((e) => videoItem?.uid === e?.uid);
    return index >= 0;
  };

  const isActive = checkInActive(selectedVideoItems, video);

  return (
    <div
      onClick={selectToDelete ? () => selectVideoItem(video) : () => setMediaSelected(video)}
      className={`media-item ${mediaSelected?.uid === video?.uid ? "active" : ""}`}
    >
      <div className={`selected-image row mx-0 ${isActive ? ' active' : ''}`}>

        {video.status.state === "ready" && <VideoItemReady video={video} />}

        {(video.status.state === "queued" ||
          video.status.state === "inprogress" ||
          video.status.state === "pendingupload") && <VideoItemLoading />}

      </div>
    </div>
  );
};

export default MediaLibraryVideoItem;
