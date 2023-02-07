import Link from "next/link";
import React from "react";
import { stringToSlug } from "@lib/stringToSlug";

function CourseCard({ course }) {
  const { id, title, course_img, short_description, content, lessons } = course;
  return (
    <div className="card-general w-100">
      <div
        style={{
          backgroundImage: `url(${course_img})`,
        }}
        className="ratio ratio-16x9 bg-gray card-head cover-bg border-radius-17"
      >
        <div className="text-right p-3">
          <span className="badge badge-primary">{lessons} Lessons</span>
        </div>
      </div>
      <div className=" courses mt-3">
        <h3 className="card-title">
          <Link href={`/course-detail/${stringToSlug(title?.rendered)}/${id}`}>
            <a className="color-font card-title-courses text-ellipsis">
              {title?.rendered}
            </a>
          </Link>
        </h3>
        <div className="card-body-courses line-clamp-2 my-2">
          {short_description ? (
            <p dangerouslySetInnerHTML={{ __html: short_description }} />
          ) : (
            <p dangerouslySetInnerHTML={{ __html: content?.rendered }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
