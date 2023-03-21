import React, { useContext, useState } from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { genericFetch, getFetchPublic } from "@request/creator";
import ChannelCardNew from "@components/main/card/ChannelCardNew";
import ScrollTags from "@components/shared/slider/ScrollTags";
import { FILTERS_POST } from "@utils/constant";
import useSWRImmutable from "swr/immutable";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import ButtonCategory from "@components/main/ui/ButtonCategory";
import { chuckSize } from "@utils/chuckSize";
import { ChannelContext } from "@context/ChannelContext";

const channelUrl = `${process.env.apiV2}/channels?all=true`;
const categoriesUrl = `${process.env.apiV2}/channels/categories?hide=true`;

function PageChannels() {
  const limit = 20;
  const { debounceTerm } = useContext(ChannelContext);
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

  const { data: cat } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const all = {
    label: "All",
    slug: "",
  };

  const categories = cat ? chuckSize([all, ...cat], 2) : [];

  return (
    <>
      <div className="mb-4">
        <Splide
          options={{
            perPage: 6,
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
                perPage: 6,
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
                    setCat={() => setCategory(item.slug)}
                    text={item.label}
                    active={category === item.slug}
                  />
                ))}
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </div>
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
