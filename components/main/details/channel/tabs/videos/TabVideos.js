import React, { useEffect, useState } from "react";
import useDebounce from "@hooks/useDebounce";
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import useSWRImmutable from "swr/immutable";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import VideoCardNew from "@components/main/card/VideoCardNew";
import Pagination from "@components/shared/pagination/Pagination";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";

const baseUrl = process.env.apiV2;
const videoUrl = `${baseUrl}/video?channel_id=`;

function TabVideos({ channel_id }) {
  const limit = 20;


  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${videoUrl}${channel_id}&page=${
        index + 1
      }&per_page=${limit}&single=true`,
    getFetchPublic
  );

  const videos = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  return (
    <>
      <div className="row mt-5">
        {isLoadingInitialData && <SpinnerLoader />}
      </div>
      <InfinitScroll
        className={"row"}
        dataLength={videos.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={!isLoadingInitialData ? <SpinnerLoading /> : null}
      >
        {videos &&
          videos?.map((video) => (
            <div key={video.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <VideoCardNew video={video} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default TabVideos;
