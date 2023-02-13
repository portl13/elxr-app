import React, { useState } from "react";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import useDebounce from "@hooks/useDebounce";
import { genericFetch, getFetchPublic } from "@request/creator";
import ChannelCardNew from "@components/main/card/ChannelCardNew";
import ScrollTags from "@components/shared/slider/ScrollTags";
import { FILTERS_POST } from "@utils/constant";
import useSWRImmutable from "swr/immutable";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
const channelUrl = `${process.env.apiV2}/channels?all=true`;

const categoriesUrl = `${process.env.apiV2}/channels/categories?hide=true`;

function PageChannels() {
  const limit = 20;
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  const [filter, setFilter] = useState("desc");
  const [category, setCategory] = useState("");


  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${channelUrl}&page=${
        index + 1
      }&per_page=${limit}&order=${filter}&search=${debounceTerm}&category=${category}&single=true`,
    genericFetch
  );

  const channels = data ? [].concat(...data) : [];

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
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Channels</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 mb-3">
          <ScrollTags>
            {FILTERS_POST?.map((fil) => (
              <div key={fil.value} className="p-0">
                <button
                  onClick={() => setFilter(fil.value)}
                  className={`custom-pills nowrap invert ${
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
      <div className="row d-flex  justify-content-end">
        <div className={"col-12 col-md-9 mb-4 mb-md-0"}>
          <ScrollTags>
            <div className="p-1">
              <span
                onClick={all}
                className={`text-capitalize section-category nowrap pointer ${
                  category === "" ? "active" : ""
                }`}
              >
                All
              </span>
            </div>
            {categories?.map((value) => (
              <div key={value.slug} className="p-1">
                <span
                  onClick={() => setCategory(value.slug)}
                  className={`text-capitalize section-category nowrap pointer ${
                    category === value.slug ? "active" : ""
                  }`}
                >
                  {value.label}
                </span>
              </div>
            ))}
          </ScrollTags>
        </div>
        <div className="col-12 col-md-3 mb-4 mb-md-5">
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
        dataLength={channels.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={!isLoadingInitialData ? <SpinnerLoading /> : null}
      >
        {channels &&
          channels.map((channel) => (
            <div className="col-6 col-md-6 col-lg-3 mb-4" key={channel.id}>
              <ChannelCardNew channel={channel} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default PageChannels;
