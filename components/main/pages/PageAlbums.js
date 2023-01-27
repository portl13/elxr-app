import React, { useState, useEffect } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import ScrollTags from "@components/shared/slider/ScrollTags";
import useDebounce from "@hooks/useDebounce";
import { genericFetch, getFetchPublic } from "@request/creator";
import Pagination from "@components/shared/pagination/Pagination";
import SongCard from "../card/SongCard";
import { FILTERS_POST } from "@utils/constant";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
import BlogCardNew from "@components/main/card/BlogCardNew";

const url = `${process.env.apiV2}/albums?all=true`;
const categoriesUrl = `${process.env.apiV2}/albums/categories?hide=true`;
const urlSong = `${process.env.apiV2}/songs?all=true`;
const categoriesUrlSong = `${process.env.apiV2}/songs/categories?hide=true`;

const tags = [
  {
    id: "album",
    name: "ALBUMS",
  },
  {
    id: "song",
    name: "SONGS",
  },
];

function PageAlbums() {
  const limit = 20;
  const [category, setCategory] = useState("");
  const [type, setType] = useState("album");
  const [filter, setFilter] = useState("desc");
  const [search, setSearch] = useState("");

  const debounceTerm = useDebounce(search, 500);

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${type === "album" ? url : urlSong}&page=${
        index + 1
      }&per_page=${limit}&order=${filter}&search=${debounceTerm}&category=${category}&single=true`,
    genericFetch
  );

  const albums = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  const { data: categories } = useSWRImmutable(
    type === "album" ? categoriesUrl : categoriesUrlSong,
    getFetchPublic
  );

  const all = () => {
    setCategory("");
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Music</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 mb-3">
          <ScrollTags>
            {tags?.map((value) => (
              <div key={value.id} className="p-1">
                <button
                  onClick={() => setType(value.id)}
                  className={`custom-pills nowrap ${
                    type === value.id ? "active" : ""
                  }`}
                >
                  {value.name}
                </button>
              </div>
            ))}
          </ScrollTags>
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
        <div className="col-12 col-md-9 mb-4 mb-md-5">
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
              <div key={value.value} className="p-1">
                <span
                  onClick={() => setCategory(value.value)}
                  className={`text-capitalize section-category nowrap pointer  ${
                    category === value.value ? "active" : ""
                  }`}
                >
                  {value.label}
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
        dataLength={albums.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={!isLoadingInitialData ? <SpinnerLoading /> : null}
      >
        {albums &&
          albums.map((item) => (
            <div key={item.id} className="col-6 col-md-6 col-lg-3 mb-4">
              <SongCard tipo={type} item={item} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default PageAlbums;
