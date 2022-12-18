import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import CourseCardNew from "../card/CourseCardNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { OPTIONS_SPLIDE_MULTI } from "@utils/constant";

const coursesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/courses`;

const FILTERS = [
  {
    value: "date",
    label: "Recently Uploaded",
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

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: courses, error } = useSWR(
    `${coursesUrl}?page=1&per_page=6&search=${search}&bypopular=${popular}${popular === "popular" ? "":`&orderby=${filter}`}`,
    getFetchPublic
  );

  const postFilter = (value) => {
    setPopular(  value === 'popular' ? "popular" : '')
    setFilter(value)
  }

  const isLoading = !courses && !error;

  if(courses?.length === 0){
    return ''
  }

  return (
    <section className={"section-home"}>
      <div className="row">
        <div className="col-12 d-flex justify-content-between mb-3">
          <div className={"d-flex align-items-center mb-3"}>
            <h4 className="section-main-title text-capitalize mb-0 mr-5">
              Courses
            </h4>
            <div className={"d-flex"}>
              {FILTERS.map((fil) => (
                <button
                  key={fil.value}
                  onClick={ () => postFilter(fil.value) }
                  className={`custom-pills nowrap ${
                    filter === fil.value ? "active" : null
                  }`}
                >
                  {fil.label}
                </button>
              ))}
            </div>
          </div>
          <span>
            <button onClick={prev} className="arrow-slide btn-icon-header mr-3">
              <FontAwesomeIcon
                className="center-absolute"
                icon={faChevronLeft}
              />
            </button>
            <button onClick={next} className="arrow-slide btn-icon-header mr-4">
              <FontAwesomeIcon
                className="center-absolute"
                icon={faChevronRight}
              />
            </button>
            <Link href={"/courses"}>
              <a className="font-size-14 color-font">See all</a>
            </Link>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <Splide ref={refSlide} options={OPTIONS_SPLIDE_MULTI} hasTrack={false}>
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
    </section>
  );
}

export default SectionCourses;
