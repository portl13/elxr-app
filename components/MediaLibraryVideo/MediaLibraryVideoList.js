import React from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import MediaLibraryVideoItem from "@components/MediaLibraryVideo/MediaLibraryVideoItem";

function MediaLibraryVideoList({
  token,
  mediaSelected,
  setMediaSelected,
  tab,
  selectVideoItem,
  selectedVideoItems,
  selectToDelete
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
