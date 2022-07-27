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

const coursesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/courses?all=true`;

const baseUrl = `${process.env.baseUrl}/wp-json/course-api/v1/course`;

const categoriesUrl = `${baseUrl}/course-categories`;

function PageCourses() {
  const limit = 12;
  const [category, setCategory] = useState("");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const debounceTerm = useDebounce(search, 500);

  const { data: courses, error } = useSWR(
    `${coursesUrl}&page=${page}&per_page=${limit}&ld_course_category=${category}&search=${debounceTerm}`,
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
  

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Courses</h4>
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
      <div className="row">
        {isLoading && <SpinnerLoader />}
        {courses &&
          courses.data &&
          courses.data.length > 0 &&
          courses.data.map((course) => (
            <div key={course.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <CourseCard course={course} />
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
