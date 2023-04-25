import React, {useState, useContext} from "react";
import useSWRImmutable from "swr/immutable";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import ScrollTags from "@components/shared/slider/ScrollTags";
import { genericFetch, getFetchPublic } from "@request/creator";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
import useMediaQuery from "@hooks/useMediaQuery";
import { chuckSize } from "@utils/chuckSize";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import ButtonCategory from "@components/main/ui/ButtonCategory";
import {ChannelContext} from "@context/ChannelContext";
import MainEventCard from "@components/main/card/MainEventCard";

const eventlUrl = `${process.env.apiV2}/channel-event?all=true`;
const categoriesUrl = `${process.env.apiV2}/channel-event/categories?hide=true`;

function PageEvents() {
  const limit = 20;
  const match = useMediaQuery("(max-width: 767px)");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("desc");
  const [filterTime, setFilterTime] = useState("upcoming");

  const { debounceTerm } = useContext(ChannelContext);

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${eventlUrl}&page=${
        index + 1
      }&per_page=${limit}&category=${category}&search=${debounceTerm}&date_filter=${filterTime}&order=${filter}&single=true`,
    genericFetch
  );

  const events = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  const all = {
    name: "All",
    slug: "",
  };

  const { data: cat } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const categories =
    Boolean(cat) && match
      ? chuckSize([all, ...cat], 2)
      : Boolean(cat)
      ? [all, ...cat]
      : [];

  // const all = () => {
  //   setCategory("");
  // };

  return (
    <>
      <div className="mb-4">
        <Splide
          options={{
            perPage: 9,
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
                {match &&
                  value.map((item) => (
                    <ButtonCategory
                      setCat={() => setCategory(item.slug)}
                      text={item.name}
                      active={category === item.slug}
                    />
                  ))}

                {!match && (
                  <ButtonCategory
                    setCat={() => setCategory(value.slug)}
                    text={value.name}
                    active={category === value.slug}
                  />
                )}
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </div>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Events</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 mb-3">
          <ScrollTags>
            <button
              onClick={() => {
                setFilter("desc");
                setFilterTime("upcoming");
              }}
              className={`category-btn nowrap invert ${
                filter === "desc" ? "active" : ""
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => {
                setFilter("popular");
                setFilterTime("upcoming");
              }}
              className={`category-btn nowrap invert ${
                filter === "popular" ? "active" : ""
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => {
                setFilter("alphabetical");
                setFilterTime("upcoming");
              }}
              className={`category-btn nowrap invert ${
                filter === "alphabetical" ? "active" : ""
              }`}
            >
              Alphabetical
            </button>
            <button
              onClick={() => {
                setFilterTime("past");
                setFilter("");
              }}
              className={`category-btn nowrap invert ${
                filterTime === "past" ? "active" : ""
              }`}
            >
              Past Events
            </button>
          </ScrollTags>
        </div>
      </div>
      <div className="row">{isLoadingInitialData && <SpinnerLoader />}</div>
      <InfinitScroll
        className={"row"}
        dataLength={events.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={!isLoadingInitialData ? <SpinnerLoading /> : null}
      >
        {events &&
          events.map((event) => (
            <div key={event.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <MainEventCard event={event} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default PageEvents;
