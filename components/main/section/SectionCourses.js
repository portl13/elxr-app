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
import {OPTIONS_SPLIDE_COURSES, OPTIONS_SPLIDE_EVENTS} from "@utils/constant";
import useSWRImmutable from "swr/immutable";
import InstructorCard from "@components/main/card/InstructorCard";

const coursesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/courses`;
const categoriesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/course-categories`;
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
  const [category, setCategory] = useState("");

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: courses, error } = useSWR(
    `${coursesUrl}?page=1&per_page=6&cat=${category}&search=${search}&bypopular=${popular}${
      popular === "popular" ? "" : `&orderby=${filter}`
    }`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  const postFilter = (value) => {
    setPopular(value === "popular" ? "popular" : "");
    setFilter(value);
  };

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const all = () => {
    setCategory("");
  };

  const isLoading = !courses && !error;

  if (courses?.length === 0) {
    return "";
  }

  return (
    <>
      <section>
        <div className="row mt-5 mb-5">
          <div className="col-12 mb-3">
            <h4 className="section-main-title text-capitalize">
              Explore masterclasses from our instructors
            </h4>
          </div>

          <div className="col-12 mb-3">
            <div className={"d-none d-md-flex mb-4"}>
              {FILTERS.map((fil) => (
                <button
                  key={fil.value}
                  onClick={() => postFilter(fil.value)}
                  className={`custom-pills nowrap ${
                    filter === fil.value ? "active" : null
                  }`}
                >
                  {fil.label}
                </button>
              ))}
            </div>

            <div className="row mx-0 d-flex justify-content-between">
              <div className="row mx-0">
                <div className="p-1">
                  <span
                    onClick={all}
                    className={`text-capitalize section-category nowrap pointer ${
                      category === "" ? "active" : ""
                    }`}
                  >
                    All
                  </span>
                </div>
                {categories?.map((value) => (
                  <div key={value.label} className="p-1">
                    <span
                      onClick={() => setCategory(value.slug)}
                      className={`text-capitalize section-category nowrap pointer ${
                        category === value.slug ? "active" : ""
                      }`}
                    >
                      {value.name}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/courses">
                <a className={`text-capitalize section-more-btn nowrap`}>
                  View all courses
                </a>
              </Link>
            </div>
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
                    <InstructorCard course={course} />
                  </SplideSlide>
                ))}
            </SplideTrack>
          </Splide>
        </div>

        <div className="row mx-0 d-flex justify-content-end mt-4">
          <button onClick={prev} className="arrow-slide section-arrow-btn mr-3">
            <FontAwesomeIcon className="center-absolute" icon={faChevronLeft} />
          </button>
          <button onClick={next} className="arrow-slide section-arrow-btn mr-4">
            <FontAwesomeIcon
              className="center-absolute"
              icon={faChevronRight}
            />
          </button>
        </div>
      </section>
    </>
  );
}

export default SectionCourses;
