import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import React, { useRef } from "react";
import CourseCard from "../../cards/CourseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { OPTIONS_SPLIDE_SMALL_CARD } from "@utils/constant";
import CourseCardNew from "@components/main/card/CourseCardNew";

function CreatorCourses({ courses, isLoading, setTab, match }) {
  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  if (courses && courses.length === 0) {
    return "";
  }

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-between mb-3 align-items-baseline">
          <h4 className="section-main-title">Courses</h4>
          <span>
            {courses && courses.length > OPTIONS_SPLIDE_SMALL_CARD.perPage && (
              <>
                <button
                  onClick={prev}
                  className="arrow-slide btn-icon-header mr-3"
                >
                  <FontAwesomeIcon
                    className="center-absolute"
                    icon={faChevronLeft}
                  />
                </button>
                <button
                  onClick={next}
                  className="arrow-slide btn-icon-header mr-4"
                >
                  <FontAwesomeIcon
                    className="center-absolute"
                    icon={faChevronRight}
                  />
                </button>
              </>
            )}
            <button className={"no-btn"} onClick={() => setTab("courses")}>
              <span className="font-size-14 color-font">See all</span>
            </button>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <div className="section-main section-events">
        <Splide
          ref={refSlide}
          options={OPTIONS_SPLIDE_SMALL_CARD}
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
    </>
  );
}

export default CreatorCourses;
