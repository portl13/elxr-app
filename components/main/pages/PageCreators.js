import React, { useState } from "react";
import useDebounce from "@hooks/useDebounce";
import { genericFetch } from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import CreatorCardNew from "@components/main/card/CreatorCardNew";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";

const url = `${process.env.apiV2}/creator`;

function PageCreators() {
  const limit = 20;

  const [search, setSearch] = useState("");

  const debounceTerm = useDebounce(search, 500);

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${url}?page=${
        index + 1
      }&per_page=${limit}&search=${debounceTerm}&single=true`,
    genericFetch
  );

  const creators = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Featured Professionals</h4>
        </div>
      </div>
      <div className="row d-flex  justify-content-md-end">
        <div className="col-12 col-md-3 mb-4 mb-md-5 ">
          <InputDashSearch
            value={search}
            name={"search"}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="row">{isLoadingInitialData && <SpinnerLoader />}</div>
      <InfinitScroll
        className={"row"}
        dataLength={creators.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={
          !isLoadingInitialData ? (
            <div className={"col-12"}>
              <SpinnerLoading />
            </div>
          ) : null
        }
      >
        {creators &&
          creators.map((creator) => (
            <div key={creator.id} className="col-6 col-md-6 col-lg-2 mb-4">
              <CreatorCardNew creator={creator} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default PageCreators;
