import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import useDebounce from "@hooks/useDebounce";
import useSWR from "swr";
import { genericFetchWithHeader, getCourses } from "@request/dashboard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import CardCourse from "@components/manage/card/CardCourse";
import Pagination from "@components/shared/pagination/Pagination";
import CoursesItem from "@components/dashboard/courses/CoursesItem";
import Link from "next/link";

const url = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-courses/`;
function ManageCourses() {
  const { user } = useContext(UserContext);

  const token = user?.token;
  const [status, setStatus] = useState("publish");
  const limit = 20;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const { data: courses, mutate } = useSWR(
    token
      ? [
          `${url}?author=${user?.id}&status=${status}&page=${page}&per_page=${limit}`,
          token,
        ]
      : null,
    genericFetchWithHeader
  );

  const isLoading = !courses;

  const mutateCourse = async () => {
    await mutate();
  };

  useEffect(() => {
    if (courses && courses.headers && courses.headers["x-wp-total"]) {
      setTotal(courses.headers["x-wp-total"]);
    }
  }, [courses]);
  return (
    <div className="container ">
      <div className="row d-flex  justify-content-between mb-3">
        <div className="col-12 col-md-6">
          <h4 className="list-nav-item-title pl-0">Courses</h4>
        </div>
        <div className="col-12 col-md-auto my-3 my-md-0">
          <Link href={"/dashboard/courses/add-course"}>
            <a className={"btn btn-primary btn-create w-100"}>Create a course</a>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex">
          <div className="p-1">
            <button
              onClick={() => setStatus("publish")}
              className={`custom-pills nowrap ${
                status === "publish" ? "active" : ""
              }`}
            >
              Published
            </button>
          </div>
          <div className="p-1">
            <button
              onClick={() => setStatus("draft")}
              className={`custom-pills nowrap ${
                status === "draft" ? "active" : ""
              }`}
            >
              Drafts
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        {isLoading && <SpinnerLoader />}
        {courses &&
          courses.data &&
          courses.data?.map((course) => (
            <div className={"col-12 col-md-6 col-lg-4 mb-4"} key={course.id}>
              <CardCourse mutateCourse={mutateCourse} course={course} />
            </div>
          ))}
      </div>
      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-end">
          <Pagination
            totalCount={total || 0}
            onPageChange={setPage}
            currentPage={page}
            pageSize={limit}
          />
        </div>
      </div>
    </div>
  );
}

export default ManageCourses;
