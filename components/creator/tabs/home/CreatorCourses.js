
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import React from 'react'
import CourseCard from '../../cards/CourseCard'



function CreatorCourses({ courses, isLoading }) {

  if (courses && courses.length === 0) {
    return ''
  }

  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14 mb-3">COURSES</h4>
      </div>
      {isLoading && <SpinnerLoader />}
      {courses &&
        courses.length > 0 &&
        courses.map((course) => (
          <div key={course.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <CourseCard course={course} />
          </div>
        ))}
    </div>
  )
}

export default CreatorCourses
