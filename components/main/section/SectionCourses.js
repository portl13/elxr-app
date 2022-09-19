import CourseCard from "@components/creator/cards/CourseCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, { useRef } from "react";
import useSWR from "swr";
import CourseCardNew from "../card/CourseCardNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { OPTIONS_SPLIDE_MULTI } from "@utils/constant";
import PodcastCardNew from "@components/main/card/PodcastCardNew";

const coursesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/courses?all=true`;

function SectionCourses() {
  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: courses, error } = useSWR(
    `${coursesUrl}&page=1&per_page=6`,
    getFetchPublic
  );

  const isLoading = !courses && !error;

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-between mb-3">
          <h4 className="section-main-title">COURSES</h4>
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
              <a className="font-size-14 text-white">See all</a>
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
    </>
  );
}

export default SectionCourses;
