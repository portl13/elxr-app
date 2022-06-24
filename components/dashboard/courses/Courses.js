import React, { useContext, useState } from 'react'
import LupaIcon from '@icons/LupaIcon'
import PlusIcon from '@icons/PlusIcon'
import Link from 'next/link'
import { UserContext } from '@context/UserContext'
import useSWR from 'swr'
import { getCourses } from '@request/dashboard'
import CourseCard from './CourseCard'
const courseApi = process.env.courseUrl

const coursesUrl = `${courseApi}/ldlms/v2/users/`

function Courses() {
  const { user } = useContext(UserContext)
  const [page, setPage] = useState(1)
  const { token = null, id = null } = user?.token ? user : {}
  const { data: courses, error } = useSWR(
    token 
    ? [`${coursesUrl}${id}/courses?page=${page}&per_page=20`, token] : null,
    getCourses
  )
const isLoading = !courses && !error
  return (
    <div className="container ">
      <div className="d-flex  justify-content-between">
        <div>
          <h2 className="title-dashboard">Courses</h2>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <form action="">
            <div className="input-search-contain">
              <span className="input-search-icon">
                <LupaIcon className="input-search-icon-svg" />
              </span>
              <input
                className="input-search"
                type="search"
                name=""
                placeholder="Search"
              />
            </div>
          </form>
          <div className="btn-create-client">
            <span className="btn-contain-icon">
              <PlusIcon className="btn-create-icon" />
            </span>
            <Link href={'/dashboard/courses/add-course'}>
              <a className="btn btn-create">Create a Course</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        {courses && courses.map((course) => (
            <CourseCard course={course} key={course.id} />
        ))}
      </div>
    </div>
  )
}

export default Courses
