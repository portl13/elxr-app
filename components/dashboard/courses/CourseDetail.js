import React from 'react'
import CourseLessonItem from '@components/dashboard/courses/CourseLessonItem'

function CourseDetail({course, lessons}) {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${course?.course_img})`,
        }}
        className="bg-gray ratio ratio-16x9 bd-radius cover-bg"
      ></div>
      <div className="text-left my-4">
        <span className="badge badge-primary">{course?.lessons} Lessons</span>
      </div>
      <div className="course-detail-body">
        <h3 className="course-detail-title mb-3">{course?.title?.rendered}</h3>
        <div className="course-detail-description">
          {course?.short_description ? (
            <p dangerouslySetInnerHTML={{ __html: course.short_description }} />
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html: course?.content?.rendered,
              }}
            />
          )}
        </div>
        <div className="border-white mt-5">
          <h4 className="text-uppercase mb-3">all lessons</h4>
          {lessons &&
            lessons.map((lesson) => (
              <CourseLessonItem key={lesson.id} lesson={lesson} />
            ))}
        </div>
      </div>
    </>
  )
}

export default CourseDetail
