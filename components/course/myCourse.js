import { Spinner } from "reactstrap";
import React, { useContext } from "react";
import useSWRInfinite from "swr/infinite";
import { genericFetch } from "@request/dashboard";
import { UserContext } from "@context/UserContext";
import InfinitScroll from "react-infinite-scroll-component";
import CourseCard from "@components/dashboard/courses/CourseCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { LoadingBtn } from "@components/livefeed/livefeed.style";

const courseApi = process.env.courseUrl;

function MyCourse({ profileId }) {
  const limit = 20;
  const { user } = useContext(UserContext);
  const token = user?.token;

  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index) =>
      profileId
        ? [
            `${courseApi}/ldlms/v2/users/${profileId}/courses?per_page=${limit}&page=${
              index + 1
            }`,
            token,
          ]
        : null,
    genericFetch
  );

  const courses = data ? [].concat(...data) : [];

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  return (
    <>
      {isLoading && <SpinnerLoader />}

      {!isLoading ? (
        <InfinitScroll
          dataLength={courses.length}
          next={loadMore}
          hasMore={!isReachingEnd}
          className={"row"}
          loader={
            !isLoading ? (
              <LoadingBtn>
                Loading ...{" "}
                <Spinner
                  style={{ width: "1.2rem", height: "1.2rem" }}
                  color="primary"
                />
              </LoadingBtn>
            ) : null
          }
        >
          {courses &&
            courses.map((item) => {
              return (
                <div key={item.id} className={"col-12 col-md-6 col-lg-3"}>
                  <CourseCard  course={item} />
                </div>
              );
            })}
        </InfinitScroll>
      ) : null}
    </>
  );
}
export default MyCourse;
