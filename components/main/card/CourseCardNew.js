import React from "react";
import { stringToSlug } from "@lib/stringToSlug";
import Link from "next/link";

function CourseCardNew({ course }) {
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
            className="ratio ratio-1x1 bg-gray border-radius-17 card-head cover-bg"
          ></div>
        </a>
      </Link>
      <div className="card-info px-0 courses">
        <h3 className="font-weight-bold  m-0">
          <Link
            href={`/course-detail/${stringToSlug(course.title?.rendered)}/${
              course.id
            }`}
          >
            <a className="text-white card-title-courses text-ellipsis">
              {course.title?.rendered}
            </a>
          </Link>
        </h3>
        <div className="d-flex flex-column">
        <span className="text-grey font-size-13">Intructor:</span>

        <span className="text-grey font-size-13">{course.lesson_count} Lessons</span>
        </div>
      </div>
    </div>
  );
}

export default CourseCardNew;
