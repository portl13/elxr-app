import React, { useContext, useState } from "react";
import { genericFetch, getFetchPublic } from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import CreatorCardNew from "@components/main/card/CreatorCardNew";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
import { ChannelContext } from "@context/ChannelContext";
import useSWRImmutable from "swr/immutable";
import ButtonCategory from "@components/main/ui/ButtonCategory";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import useMediaQuery from "@hooks/useMediaQuery";
import { chuckSize } from "@utils/chuckSize";

const url = `${process.env.apiV2}/creator`;
const categoriesUrl = `${process.env.apiV2}/creator/categories`;

function PageCreators() {
  const limit = 100;
  const { debounceTerm } = useContext(ChannelContext);
  const [category, setCategory] = useState("");

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${url}?page=${
        index + 1
      }&per_page=${limit}&search=${debounceTerm}&category=${category}&single=true`,
    genericFetch
  );

  const all = {
    label: "All",
    value: "",
  };

  const { data: cat } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const categories = cat ? chuckSize([all, ...cat], 2) : [];

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
      <div className="mb-4">
        <Splide
          options={{
            perPage: 8,
            gap: "0rem",
            pagination: false,
            arrows: true,
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
                      setCat={() => setCategory(item.value)}
                      text={item.label}
                      active={category === item.value}
                    />
                  ))}
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </div>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Featured Professionals</h4>
        </div>
      </div>
      <div className="row d-flex  justify-content-md-end">
        <div className="col-12 col-md-3 mb-4 mb-md-5 ">
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
            <div key={creator.id} className="col-6 col-md-4 col-lg-1-2 mb-4">
              <CreatorCardNew creator={creator} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default PageCreators;
