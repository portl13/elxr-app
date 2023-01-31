import React, { useState } from "react";
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import GalleryCard from "@components/main/card/GalleryCard";
import useSWRInfinite from "swr/infinite";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
import InfinitScroll from "react-infinite-scroll-component";

const galleriesUrl = `${process.env.apiV2}/gallery?author=`;

function GalleriesTab({ creator_id }) {
  const limit = 20;

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${galleriesUrl}${creator_id}&page=${
        index + 1
      }&per_page=${limit}&single=true`,
    getFetchPublic
  );

  const galleries = data ? [].concat(...data) : [];

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
        <div className="col-12">
          <h4 className="color-font font-size-14">GALLERIES</h4>
        </div>
        {isLoadingInitialData && <SpinnerLoader />}
      </div>
      <InfinitScroll
        className={"row"}
        dataLength={galleries.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={!isLoadingInitialData ? <SpinnerLoading /> : null}
      >
        {galleries &&
          galleries?.map((gallery) => (
            <div key={gallery.id} className="col-12 col-md-6 col-lg-3">
              <GalleryCard gallery={gallery} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default GalleriesTab;
