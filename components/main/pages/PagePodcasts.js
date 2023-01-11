import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import ScrollTags from "@components/shared/slider/ScrollTags";
import useDebounce from "@hooks/useDebounce";
import { genericFetch, getFetchPublic } from "@request/creator";
import React, { useState } from "react";
import useSWRImmutable from "swr/immutable";
import PodcastCardNew from "@components/main/card/PodcastCardNew";
import SongCard from "@components/main/card/SongCard";
import { FILTERS_POST } from "@utils/constant";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";

const podcastslUrl = `${process.env.apiV2}/podcasts?all=true`;
const episodeslUrl = `${process.env.apiV2}/episodes?all=true`;
const categoriesUrl = `${process.env.apiV2}/podcasts/categories`;
const episodesCategoriesUrl = `${process.env.apiV2}/episodes/categories`;

const tags = [
  {
    id: "series",
    name: "SERIES",
  },
  {
    id: "episodes",
    name: "EPISODES",
  },
];

function PagePodcasts() {
  const limit = 12;
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  const [type, setType] = useState("series");
  const [filter, setFilter] = useState("desc");

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${
        type === "series" ? podcastslUrl : episodeslUrl
      }&page=${index + 1}&per_page=${limit}&order=${filter}&search=${debounceTerm}&category=${category}&single=true`,
    genericFetch
  );

  const audios = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  const { data: categories } = useSWRImmutable(
    type === "series" ? categoriesUrl : episodesCategoriesUrl,
    getFetchPublic
  );

  const all = () => {
    setCategory("");
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Podcasts</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 mb-3">
          <ScrollTags>
            {tags?.map((value) => (
              <div key={value.id} className="p-1">
                <button
                  onClick={() => setType(value.id)}
                  className={`custom-pills pills-gray nowrap ${
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
                  className={`custom-pills pills-gray nowrap ${
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
              <button
                onClick={all}
                className={`custom-pills nowrap ${
                  category === "" ? "active" : ""
                }`}
              >
                All
              </button>
            </div>
            {type === "series" &&
              categories?.map((value) => (
                <div key={value.id} className="p-1">
                  <button
                    onClick={() => setCategory(value.id)}
                    className={`custom-pills nowrap ${
                      category === value.id ? "active" : ""
                    }`}
                  >
                    {value.name}
                  </button>
                </div>
              ))}
            {type === "episodes" &&
              categories?.map((value) => (
                <div key={value.value} className="p-1">
                  <button
                    onClick={() => setCategory(value.value)}
                    className={`custom-pills nowrap ${
                      category === value.value ? "active" : ""
                    }`}
                  >
                    {value.label}
                  </button>
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
        dataLength={audios.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={!isLoadingInitialData ? <SpinnerLoading /> : null}
      >
        {audios &&
          audios.map((audio) => (
            <>
              {type === "series" ? (
                <div key={audio.id} className="col-6 col-md-6 col-lg-3 mb-4">
                  <PodcastCardNew audio={audio} />
                </div>
              ) : (
                <div className={"col-6 col-md-6 col-lg-3 mb-4"} key={audio.id}>
                  <SongCard tipo={"episode"} item={audio} />
                </div>
              )}
            </>
          ))}
      </InfinitScroll>
    </>
  );
}

export default PagePodcasts;
