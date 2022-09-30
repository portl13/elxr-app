import React, {useContext} from "react";
import { UserContext } from "@context/UserContext";
import CourseCard from "@components/dashboard/courses/CourseCard";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
const courseApi = process.env.courseUrl;

function MyCourse() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const { data: course } = useSWR(
    token ? [`${courseApi}/ldlms/v2/users/${user.id}/courses`, token] : null,
    genericFetch
  );
  return (
    <div className={"row"}>
      {!course && (
          <SpinnerLoader />
      )}
      {course && course.map((item) => {
        return (
          <div className={"col-12 col-md-6 col-lg-4"}>
            <CourseCard key={item.id} course={item} />
          </div>
        );
      })}
    </div>
  );
}
export default MyCourse;
