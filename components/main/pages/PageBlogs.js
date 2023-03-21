import React, { useContext, useState } from "react";
import useSWRImmutable from "swr/immutable";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import ScrollTags from "@components/shared/slider/ScrollTags";
import { genericFetch, getFetchPublic } from "@request/creator";
import BlogCardNew from "@components/main/card/BlogCardNew";
import { FILTERS_POST } from "@utils/constant";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
import { ChannelContext } from "@context/ChannelContext";
import { chuckSize } from "@utils/chuckSize";
import useMediaQuery from "@hooks/useMediaQuery";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import ButtonCategory from "@components/main/ui/ButtonCategory";

const url = `${process.env.apiV2}/blogs?all=true`;
const categoriesUrl = `${process.env.apiV2}/blogs/categories?hide=true`;

function PageBlogs() {
  const limit = 20;
  const match = useMediaQuery("(max-width: 767px)");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("desc");

  const { debounceTerm } = useContext(ChannelContext);

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${url}&page=${
        index + 1
      }&per_page=${limit}&order=${filter}&search=${debounceTerm}&category=${category}&single=true`,
    genericFetch
  );

  const blogs = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  const all = {
    label: "All",
    value: "",
  };

  const { data: cat } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const categories =
    Boolean(cat) && match
      ? chuckSize([all, ...cat], 2)
      : Boolean(cat)
      ? [all, ...cat]
      : [];

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
                {match &&
                  value.map((item) => (
                    <ButtonCategory
                      setCat={() => setCategory(item.value)}
                      text={item.label}
                      active={category === item.value}
                    />
                  ))}
                {!match ? (
                  <ButtonCategory
                    setCat={() => setCategory(value.value)}
                    text={value.label}
                    active={category === value.value}
                  />
                ) : null}
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </div>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Writings</h4>
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
        dataLength={blogs.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={!isLoadingInitialData ? <SpinnerLoading /> : null}
      >
        {blogs &&
          blogs.map((blog) => (
            <div key={blog.id} className="col-6 col-md-6 col-lg-3 mb-4">
              <BlogCardNew blog={blog} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default PageBlogs;
