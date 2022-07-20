import React, { useState } from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import useSWR from 'swr'
import { getFetchPublic } from '@request/creator'
import CourseCard from '@components/creator/cards/CourseCard'

const coursesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/courses?author=`

function CoursesTab({ creator_id }) {
  const [page, setPage] = useState(1)
  const { data: courses, error } = useSWR(
    `${coursesUrl}${creator_id}&page=${page}&per_page=12`,
    getFetchPublic
  )

  const isLoading = !courses && !error

  return (
    <div className="row mt-5">
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

export default CoursesTab
