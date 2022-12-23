import React from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import MediaLibraryVideoItem from "@components/MediaLibraryVideo/MediaLibraryVideoItem";

function MediaLibraryVideoList({
  mediaSelected,
  setMediaSelected,
  selectVideoItem,
  selectedVideoItems,
  selectToDelete,
  videos,
}) {
  return (
    <>
      {!videos && <SpinnerLoader />}
      <div>
        {videos &&
          videos.result &&
          videos.result?.videos.map((video) => (
            <MediaLibraryVideoItem
              key={video.uid}
              video={video}
              mediaSelected={mediaSelected}
              setMediaSelected={setMediaSelected}
              selectVideoItem={selectVideoItem}
              selectedVideoItems={selectedVideoItems}
              selectToDelete={selectToDelete}
            />
          ))}
      </div>
    </>
  );
}

export default MediaLibraryVideoList;
