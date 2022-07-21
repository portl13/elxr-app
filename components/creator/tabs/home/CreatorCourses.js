
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getCreator } from '@request/creator'
import React from 'react'
import useSWR from 'swr'
import CourseCard from '../../cards/CourseCard'

const coursesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/courses?author=`

function CreatorCourses({ creator_id }) {
  const { data: courses, error } = useSWR(
    `${coursesUrl}${creator_id}&page=1&per_page=4`,
    getCreator
  )

  const isLoading = !courses && !error
  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14 mb-3">COURSES</h4>
      </div>
      {isLoading && <SpinnerLoader />}
      {courses &&
        courses.length > 0 &&
        courses.map((course) => (
          <div key={course.id} className="col-12 col-md-6 col-lg-3">
            <CourseCard course={course} />
          </div>
        ))}
    </div>
  )
}

export default CreatorCourses
