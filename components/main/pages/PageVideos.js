import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import ScrollTags from "@components/shared/slider/ScrollTags";
import useDebounce from "@hooks/useDebounce";
import { genericFetch, getFetchPublic } from "@request/creator";
import Head from "next/head";
import React, { useContext, useState } from "react";
import useSWRImmutable from "swr/immutable";
import VideoCardNew from "@components/main/card/VideoCardNew";
import { FILTERS_POST } from "@utils/constant";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
import { chuckSize } from "@utils/chuckSize";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import ButtonCategory from "@components/main/ui/ButtonCategory";
import { ChannelContext } from "@context/ChannelContext";

const videoUrl = `${process.env.apiV2}/video?all=true`;
const categoriesUrl = `${process.env.apiV2}/video/categories?hide=true`;

function PageVideos() {
  const limit = 20;
  const [category, setCategory] = useState("");

  const { debounceTerm } = useContext(ChannelContext);

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

  const all = {
    name: "All",
    id: "",
  };

  const { data: cat } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const categories = cat ? chuckSize([all, ...cat], 2) : [];

  return (
    <>
      <div className="mb-4">
        <Splide
          options={{
            perPage: 5,
            gap: "0rem",
            pagination: false,
            arrows: false,
            breakpoints: {
              575: {
                perPage: 2,
              },
              767: {
                perPage: 3,
                arrows: true,
              },
              992: {
                perPage: 4,
                arrows: true,
              },
              1024: {
                perPage: 5,
                arrows: true,
              },
            },
          }}
          hasTrack={false}
        >
          <SplideTrack>
            {categories?.map((value, index) => (
              <SplideSlide key={index}>
                {value.map((item) => (
                  <ButtonCategory
                    setCat={() => setCategory(item.id)}
                    text={item.name}
                    active={category === item.id}
                  />
                ))}
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </div>
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
                <ButtonCategory
                  setCat={() => setFilter(fil.value)}
                  text={fil.label}
                  active={filter === fil.value}
                />
              </div>
            ))}
          </ScrollTags>
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
            <div key={video.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <VideoCardNew video={video} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default PageVideos;
