import { stringToSlug } from '@lib/stringToSlug'
import Link from 'next/link'
import React from 'react'

function CourseCard({ course }) {
  return (
    <div className="card-general w-100">
      <Link
        href={`/course-detail/${stringToSlug(course.title?.rendered)}/${course.id}`}
      >
        <a>
          <div
            style={{
              backgroundImage: `url(${
                course.cover_media?.large || course.cover_media?.small
              })`,
            }}
            className="ratio ratio-16x9 bg-gray card-head cover-bg"
          >
            <div className="text-right p-3">
              <span className="badge badge-primary">
                {course.lesson_count} Lessons
              </span>
            </div>
          </div>
        </a>
      </Link>
      <div className="card-info courses">
        <h3 className="card-title">
          <Link
            href={`/course-detail/${stringToSlug(course.title?.rendered)}/${course.id}`}
          >
            <a className="color-font card-title-courses text-ellipsis">
              {course.title?.rendered}
            </a>
          </Link>
        </h3>
        <div className="card-body-courses line-clamp-2 my-2"></div>
        <div className="card-footer-courses">
          Participants Enrolled {course.enrolled_members}
        </div>
      </div>
    </div>
  )
}

export default CourseCard
