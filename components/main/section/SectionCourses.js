import CourseCard from "@components/creator/cards/CourseCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React from "react";
import useSWR from "swr";

const coursesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/courses?all=true`;

function SectionCourses() {
  const { data: courses, error } = useSWR(
    `${coursesUrl}&page=1&per_page=4`,
    getFetchPublic
  );

  const isLoading = !courses && !error;

  return (
    <>
      <div className="row mt-4">
        <div className="col-12">
          <h4 className="font-size-14">COURSES</h4>
        </div>
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

export default SectionCourses;
