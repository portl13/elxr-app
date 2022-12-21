import CourseCard from "@components/creator/cards/CourseCard";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Pagination from "@components/shared/pagination/Pagination";
import ScrollTags from "@components/shared/slider/ScrollTags";
import useDebounce from "@hooks/useDebounce";
import { genericFetchPublicWithHeader, getFetchPublic } from "@request/creator";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import CourseCardNew from "@components/main/card/CourseCardNew";

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

function PageCourses() {
  const limit = 12;
  const [category, setCategory] = useState("");

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  const [filter, setFilter] = useState('date');
  const [popular, setPopular] = useState("");


  const { data: courses, error } = useSWR(
      `${coursesUrl}?page=1&per_page=6&cat=${category}&search=${debounceTerm}&bypopular=${popular}${popular === "popular" ? "":`&orderby=${filter}`}`,
    genericFetchPublicWithHeader
  );

  const isLoading = !courses && !error;

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const all = () => {
    setCategory("");
  };
 
  useEffect(() => {
    if(courses && courses.headers && courses.headers["x-wp-total"]) {
      setTotal(courses.headers["x-wp-total"])
    }
  }, [courses])

  const postFilter = (value) => {
    setPopular(  value === 'popular' ? "popular" : '')
    setFilter(value)
  }

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
                    onClick={ () => postFilter(fil.value) }
                    className={`custom-pills pills-gray nowrap ${
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
              <button
                onClick={all}
                className={`custom-pills nowrap ${
                  category === "" ? "active" : ""
                }`}
              >
                All
              </button>
            </div>
            {categories?.map((value) => (
              <div key={value.id} className="p-1">
                <button
                  onClick={() => setCategory(value.slug)}
                  className={`custom-pills nowrap ${
                    category === value.slug ? "active" : ""
                  }`}
                >
                  {value.name}
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
      <div className="row">
        {isLoading && <SpinnerLoader />}
        {courses &&
          courses.data &&
          courses.data.length > 0 &&
          courses.data.map((course) => (
            <div key={course.id} className="col-6 col-md-6 col-lg-3 mb-4">
              <CourseCardNew course={course} />
            </div>
          ))}
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <Pagination
            totalCount={total || 0}
            onPageChange={setPage}
            currentPage={page}
            pageSize={limit}
          />
        </div>
      </div>
    </>
  );
}

export default PageCourses;
