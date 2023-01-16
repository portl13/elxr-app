import React from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";

function InstructorCard({ course }) {
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
            className="ratio ratio-1x1 bg-gray border-radius-50 card-head cover-bg"
          ></div>
        </a>
      </Link>
      <div className="py-3 px-0 courses">
        <h3 className="font-size-24  m-0">
          <Link
            href={`/course-detail/${stringToSlug(course.title?.rendered)}/${
              course.id
            }`}
          >
            <a className="color-font line-clamp-2 font-weight-700">
              {course.title?.rendered}
            </a>
          </Link>
        </h3>
        <div className="d-flex flex-column">
          <h4 className="color-font-grey font-size-14">
            Instructor: {course && course.author && course.author.display_name}
            <span className={"circle-dot d-inline-block"}></span>
            {course.lesson_count} Lessons
          </h4>
        </div>
        <p
          className={"text-lowercase line-clamp-2 mt-4 font-size-14"}
          dangerouslySetInnerHTML={{ __html: course?.excerpt?.rendered }}
        />
      </div>
    </div>
  );
}

export default InstructorCard;
