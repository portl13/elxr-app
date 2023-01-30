import React from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import CourseCardNew from "@components/main/card/CourseCardNew";
import useSWRInfinite from "swr/infinite";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
import InfinitScroll from "react-infinite-scroll-component";

const coursesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/courses?author=`;

function CoursesTab({ creator_id }) {
  const limit = 20;

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `${coursesUrl}${creator_id}&page=${index + 1}&per_page=${limit}`,
    getFetchPublic
  );

  const courses = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-12">
          <h4 className="color-font font-size-14">COURSES</h4>
        </div>
        {isLoadingInitialData && <SpinnerLoader />}
      </div>
      <InfinitScroll
        className={"row"}
        dataLength={courses.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={!isLoadingInitialData ? <SpinnerLoading /> : null}
      >
        {courses &&
          courses?.map((course) => (
            <div key={course.id} className="col-12 col-md-6 col-lg-3">
              <CourseCardNew course={course} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default CoursesTab;
