import CourseCard from "@components/creator/cards/CourseCard";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import ScrollTags from "@components/shared/slider/ScrollTags";
import { getFetchPublic } from "@request/creator";
import React, { useState } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

const coursesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/courses?all=true`;

const baseUrl = `${process.env.baseUrl}/wp-json/course-api/v1/course`;

const categoriesUrl = `${baseUrl}/course-categories`;

function PageCourses() {
  const [category, setCategory] = useState("");

  const { data: courses, error } = useSWR(
    `${coursesUrl}&page=1&per_page=16&ld_course_category=${category}`,
    getFetchPublic
  );

  const isLoading = !courses && !error;

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const all = () => {
    setCategory("");
  };

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
            <InputDashSearch />
          </div>
        </div>
      </div>
      <div className="row">
        {isLoading && <SpinnerLoader />}
        {courses &&
          courses.length > 0 &&
          courses.map((course) => (
            <div key={course.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <CourseCard course={course} />
            </div>
          ))}
      </div>
    </>
  );
}

export default PageCourses;
