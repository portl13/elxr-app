import CourseCard from "@components/creator/cards/CourseCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import CourseCardNew from "../card/CourseCardNew";

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
        <div className="col-12 d-flex justify-content-between mb-2">
          <h4 className="font-size-14">COURSES</h4>
          <Link href={'/courses'}>
            <a className="font-size-14 text-white">See all</a>
          </Link>
        </div>
        {isLoading && <SpinnerLoader />}
        {courses &&
          courses.length > 0 &&
          courses.map((course) => (
            <div key={course.id} className="col-12 col-md-6 col-lg-2 mb-4">
              {/* <CourseCard course={course} /> */}
              <CourseCardNew course={course} />
            </div>
          ))}
      </div>
    </>
  );
}

export default SectionCourses;
