import React from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";

function CourseCardNew({ course, titleCss = "color-font" }) {
  const { creator = null } = course;
  return (
    <div className="card-general-new w-100">
      <Link
        href={`/course-detail/${stringToSlug(course.title?.rendered)}/${
          course.id
        }`}
      >
        <a>
          <div
            style={{
              backgroundImage: `url(${
                course.cover_media?.large || course.cover_media?.small
              })`,
            }}
            className="ratio ratio-1x1 bg-gray border-radius-12 card-head cover-bg"
          ></div>
        </a>
      </Link>
      <div className="py-3 px-0 courses">
        <h3 className="title-even-home line-clamp-2 m-0">
          <Link
            href={`/course-detail/${stringToSlug(course.title?.rendered)}/${
              course.id
            }`}
          >
            <a className={`${titleCss}`}>{course.title?.rendered}</a>
          </Link>
        </h3>
        <div className="d-flex flex-column">
          {creator ? (
            <span className="subtitle-even-home color-font-grey ">
              <Link
                href={`/creator/${stringToSlug(creator.name)}/${creator.id}`}
              >
                <a className={"color-font-grey"}>by {creator.name}</a>
              </Link>
            </span>
          ) : null}
          <span className="date-even-home color-font">
            {course.lesson_count} Lessons
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseCardNew;
