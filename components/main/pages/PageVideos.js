import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import ScrollTags from "@components/shared/slider/ScrollTags";
import useDebounce from "@hooks/useDebounce";
import { genericFetch, getFetchPublic } from "@request/creator";
import Head from "next/head";
import React, { useState } from "react";
import useSWRImmutable from "swr/immutable";
import VideoCardNew from "@components/main/card/VideoCardNew";
import { FILTERS_POST } from "@utils/constant";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";

const videoUrl = `${process.env.apiV2}/video?all=true`;
const categoriesUrl = `${process.env.apiV2}/video/categories?hide=true`;

function PageVideos() {
  const limit = 12;
  const [category, setCategory] = useState("");

  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);

  const [filter, setFilter] = useState("desc");

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${videoUrl}&page=${
        index + 1
      }&per_page=${limit}&order=${filter}&search=${debounceTerm}&category=${category}&single=true`,
    genericFetch
  );

  const videos = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };


  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const all = () => {
    setCategory("");
  };


  return (
    <>
      <Head>
        <title>Videos</title>
      </Head>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Videos</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 mb-3">
          <ScrollTags>
            {FILTERS_POST?.map((fil) => (
              <div key={fil.value} className="p-1">
                <button
                  onClick={() => setFilter(fil.value)}
                  className={`custom-pills nowrap ${
                    filter === fil.value ? "active" : ""
                  }`}
                >
                  {fil.label}
                </button>
              </div>
            ))}
          </ScrollTags>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 mb-4  mb-md-5">
          <ScrollTags>
            <div className="p-1">
              <span
                onClick={all}
                className={`text-capitalize section-category nowrap pointer  ${
                  category === "" ? "active" : ""
                }`}
              >
                All
              </span>
            </div>
            {categories?.map((value) => (
              <div key={value.id} className="p-1">
                <span
                  onClick={() => setCategory(value.id)}
                  className={`text-capitalize section-category nowrap pointer  ${
                    category === value.id ? "active" : ""
                  }`}
                >
                  {value.name}
                </span>
              </div>
            ))}
          </ScrollTags>
        </div>
        <div className="col-12 col-md-3 mb-4 mb-md-5">
          <div className="d-flex  justify-content-md-end">
            <InputDashSearch
              value={search}
              name={"search"}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">{isLoadingInitialData && <SpinnerLoader />}</div>
      <InfinitScroll
        className={"row"}
        dataLength={videos.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={!isLoadingInitialData ? <SpinnerLoading /> : null}
      >
        {videos &&
          videos.map((video) => (
            <div key={video.id} className="col-6 col-md-6 col-lg-3 mb-4">
              <VideoCardNew video={video} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default PageVideos;
