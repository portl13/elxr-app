import React, { useContext, useState } from "react";
import { UserContext } from "@context/UserContext";
import useDebounce from "@hooks/useDebounce";
import useSWR from "swr";
import { getCourses } from "@request/dashboard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import CardCourse from "@components/manage/card/CardCourse";

const courseApi = process.env.courseUrl;
const coursesUrl = `${courseApi}/ldlms/v2/users/`;

function ManageCourses() {
  const limit = 20;

  const { user } = useContext(UserContext);

  const [search, setSearch] = useState("");

  const debounceTerm = useDebounce(search, 500);

  const [page, setPage] = useState(1);

  const { token = null, id = null } = user?.token ? user : {};

  const { data: courses, error } = useSWR(
    token
      ? [
          `${coursesUrl}${id}/courses?page=${page}&per_page=${limit}&search=${debounceTerm}`,
          token,
        ]
      : null,
    getCourses
  );

  const isLoading = !courses && !error;
  return (
    <div className="container ">
      <div className="row d-flex  justify-content-between mb-5">
        <div className="col-12 col-md-6">
          <h4 className="list-nav-item-title pl-0">Courses</h4>
        </div>
        <div className="col-12 col-md-3">
          <InputDashSearch
            value={search}
            name={"search"}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="row mt-5">
        {isLoading && <SpinnerLoader />}
        {courses &&
          courses.map((course) => (
            <div className="col-12 col-md-6 col-lg-3 mb-4">
              <CardCourse course={course} key={course.id} />
            </div>
          ))}
        {courses && courses.length === 0 && (
          <h3 className="col display-4">You have not created any events yet</h3>
        )}
      </div>
    </div>
  );
}

export default ManageCourses;
