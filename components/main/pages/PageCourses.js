import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import ScrollTags from "@components/shared/slider/ScrollTags";
import useDebounce from "@hooks/useDebounce";
import {
  genericFetch,
  getFetchPublic,
} from "@request/creator";
import React, { useState } from "react";
import useSWRImmutable from "swr/immutable";
import CourseCardNew from "@components/main/card/CourseCardNew";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";

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
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
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

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const all = () => {
    setCategory("");
  };

  const postFilter = (value) => {
    setPopular(value === "popular" ? "popular" : "");
    setFilter(value);
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Courses</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 mb-3">
          <ScrollTags>
            {FILTERS.map((fil) => (
              <button
                key={fil.value}
                onClick={() => postFilter(fil.value)}
                className={`custom-pills invert nowrap ${
                  filter === fil.value ? "active" : null
                }`}
              >
                {fil.label}
              </button>
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
              <div key={value.id} className="p-1">
                <span
                  onClick={() => setCategory(value.slug)}
                  className={`text-capitalize section-category nowrap pointer ${
                    category === value.slug ? "active" : ""
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
        dataLength={courses.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={ !isLoadingInitialData ? <SpinnerLoading /> : null}
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
