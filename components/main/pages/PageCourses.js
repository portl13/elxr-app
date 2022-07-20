import CourseCard from '@components/creator/cards/CourseCard';
import InputDashSearch from '@components/shared/form/InputDashSearch';
import SpinnerLoader from '@components/shared/loader/SpinnerLoader';
import { getFetchPublic } from '@request/creator';
import React, { useState } from 'react'
import useSWR from 'swr';


const coursesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/courses?all=true`;

const tabs = [
  {
    tab: "all",
    label: "All",
  },
  {
    tab: "art",
    label: "Art",
  },
  {
    tab: "food",
    label: "Food",
  },
  {
    tab: "music",
    label: "Music",
  },
  {
    tab: "yoga",
    label: "Yoga",
  },
];


function PageCourses() {

  const [tab, setTab] = useState("");
  const { data: courses, error } = useSWR(
    `${coursesUrl}&page=1&per_page=12`,
    getFetchPublic
  );

  const isLoading = !courses && !error;

  return (
    <>
       <div className="row mt-5">
       <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Courses</h4>
        </div>
        <div className="col-12 col-md-6 mb-5">
          {tabs.map((item) => (
            <button
              key={item.tab}
              onClick={() => setTab(item.tab)}
              className={`${
                tab === item.tab ? "active" : ""
              }btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="col-12 col-md-6 mb-5">
          <div className="d-flex  justify-content-md-end">
            <InputDashSearch />
          </div>
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
  )
}

export default PageCourses