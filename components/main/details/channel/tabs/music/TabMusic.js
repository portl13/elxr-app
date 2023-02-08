import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Pagination from "@components/shared/pagination/Pagination";
import SongCard from "@components/main/card/SongCard";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
import VideoCardNew from "@components/main/card/VideoCardNew";
import useSWRInfinite from "swr/infinite";

const baseUrl = process.env.apiV2;
const musicUrl = `${baseUrl}/albums?channel_id=`;

function TabMusic({ channel_id }) {
  const limit = 20;

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${musicUrl}${channel_id}&page=${
        index + 1
      }&per_page=${limit}&single=true`,
    getFetchPublic
  );

  const music = data ? [].concat(...data) : [];

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
        dataLength={music.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={!isLoadingInitialData ? <SpinnerLoading /> : null}
      >
        {music &&
          music.map((album) => (
            <div key={album.id} className="col-6 col-md-6 col-lg-3 mb-4">
              <SongCard tipo="album" item={album} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default TabMusic;
