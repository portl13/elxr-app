import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import CourseCardNew from "../card/CourseCardNew";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { OPTIONS_SPLIDE_COURSES } from "@utils/constant";
import { useCategories } from "@context/EventsContext";
import SeeAllButton from "@components/main/ui/SeeAllButton";

const coursesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/courses`;

const FILTERS = [
  {
    value: "date",
    label: "Recently",
  },
  {
    value: "popular",
    label: "Popular",
  },
  {
    value: "title",
    label: "Alphabetical",
  },
];

function SectionCourses({ search }) {
  const refSlide = useRef();

  const [filter, setFilter] = useState("date");
  const [popular, setPopular] = useState("");
  const { cat: category } = useCategories();

  const { data: courses, error } = useSWR(
    `${coursesUrl}?page=1&per_page=6&cat=${
      category.slug
    }&search=${search}&bypopular=${popular}${
      popular === "popular" ? "" : `&orderby=${filter}`
    }`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  const postFilter = (value) => {
    setPopular(value === "popular" ? "popular" : "");
    setFilter(value);
  };

  const isLoading = !courses && !error;

  if (courses?.length === 0) {
    return "";
  }

  return (
    <>
      <section className={"section-dark"}>
        <div className="row">
          <div className="col-12 mb-2 d-flex justify-content-between">
            <div className="d-flex flex-column flex-lg-row w-100">
              <h4 className="section-main-title text-capitalize d-flex align-items-center justify-content-between">
                Popular Courses
                <SeeAllButton
                  path={"/courses"}
                  className={"d-lg-none d-flex"}
                />
              </h4>
              <div className={"filter-contents ml-lg-3 mb-2"}>
                {FILTERS.map((fil) => (
                  <button
                    key={fil.value}
                    onClick={() => setFilter(fil.value)}
                    className={`category-btn ${
                      filter === fil.value ? "active" : null
                    }`}
                  >
                    {fil.label}
                  </button>
                ))}
              </div>
            </div>
            <SeeAllButton path={"/courses"} className={"d-none d-lg-flex"} />
          </div>
        </div>

        {isLoading && <SpinnerLoader />}

        <div className="section-creator">
          <Splide
            ref={refSlide}
            options={OPTIONS_SPLIDE_COURSES}
            hasTrack={false}
          >
            <SplideTrack>
              {courses &&
                courses.length > 0 &&
                courses.map((course) => (
                  <SplideSlide key={course.id}>
                    <CourseCardNew course={course} />
                  </SplideSlide>
                ))}
            </SplideTrack>
          </Splide>
        </div>
      </section>
    </>
  );
}

export default SectionCourses;
