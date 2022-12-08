import React from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";

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
      <div className="py-3 px-0 courses">
        <h3 className="font-size-12  m-0">
          <Link
            href={`/course-detail/${stringToSlug(course.title?.rendered)}/${
              course.id
            }`}
          >
            <a className="color-font text-ellipsis">{course.title?.rendered}</a>
          </Link>
        </h3>
        <div className="d-flex flex-column">
          <span className="color-font-grey font-size-13">
            Intructor: {course && course.author && course.author.display_name}
          </span>

          <span className="color-font-grey font-size-13">
            {course.lesson_count} Lessons
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseCardNew;
