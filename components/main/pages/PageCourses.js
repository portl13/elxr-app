import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import ScrollTags from "@components/shared/slider/ScrollTags";
import useDebounce from "@hooks/useDebounce";
import { genericFetch, getFetchPublic } from "@request/creator";
import React, {useContext, useState} from "react";
import useSWRImmutable from "swr/immutable";
import CourseCardNew from "@components/main/card/CourseCardNew";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
import { chuckSize } from "@utils/chuckSize";
import useMediaQuery from "@hooks/useMediaQuery";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import ButtonCategory from "@components/main/ui/ButtonCategory";
import {ChannelContext} from "@context/ChannelContext";

const coursesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/courses`;

const categoriesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/course-categories`;

const FILTERS = [
  {
    value: "date",
    label: "Recently Uploaded",
  },
  {
    value: "popular",
    label: "Popular",
  },
  {
    value: "title",
    label: "Alphabetical",
  },
];

const PAGE_SIZE = 20;

function PageCourses() {
  const match = useMediaQuery("(max-width: 767px)");
  const [category, setCategory] = useState("");
  const { debounceTerm } = useContext(ChannelContext);
  const [filter, setFilter] = useState("date");
  const [popular, setPopular] = useState("");

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${coursesUrl}?page=${
        index + 1
      }&per_page=${PAGE_SIZE}&cat=${category}&search=${debounceTerm}&bypopular=${popular}${
        popular === "popular" ? "" : `&orderby=${filter}`
      }`,
    genericFetch
  );

  const courses = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

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

  const postFilter = (value) => {
    setPopular(value === "popular" ? "popular" : "");
    setFilter(value);
  };

  return (
    <>
      <div className="mb-4">
        <Splide
          options={{
            perPage: 7,
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
                {!match ? (
                  <ButtonCategory
                    setCat={() => setCategory(value.slug)}
                    text={value.name}
                    active={category === value.slug}
                  />
                ) : null}
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </div>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Courses</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 mb-3">
          <ScrollTags>
            {FILTERS.map((fil) => (
              <ButtonCategory
                setCat={() => postFilter(fil.value)}
                text={fil.label}
                active={filter === fil.value}
              />
            ))}
          </ScrollTags>
        </div>
      </div>

      <div className="row">{isLoadingInitialData && <SpinnerLoader />}</div>
      <InfinitScroll
        className={"row"}
        dataLength={courses.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={!isLoadingInitialData ? <SpinnerLoading /> : null}
      >
        {courses &&
          courses.map((course) => (
            <div key={course.id} className="col-6 col-md-6 col-lg-3 mb-4">
              <CourseCardNew course={course} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default PageCourses;
