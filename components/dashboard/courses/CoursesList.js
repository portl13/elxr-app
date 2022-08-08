import React, { useContext, useEffect } from 'react'
import PlusIcon from '@icons/PlusIcon'
import Link from 'next/link'
import { useState } from 'react'
import CoursesItem from './CoursesItem'
import { UserContext } from '@context/UserContext'
import useSWR from 'swr'
import { genericFetchWithHeader } from '@request/dashboard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import Pagination from '@components/shared/pagination/Pagination'

const url = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-courses/`

function CoursesList() {
  const { user } = useContext(UserContext)

  const token = user?.token

  const [status, setStatus] = useState('publish')
  const limit = 20
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const { data: courses, mutate } = useSWR(
    token
      ? [
          `${url}?author=${user?.id}&status=${status}&page=${page}&per_page=${limit}`,
          token,
        ]
      : null,
    genericFetchWithHeader
  )

  const isLoading = !courses

  const mutateCourse = async () => {
    mutate()
  }

  useEffect(() => {
    if (courses && courses.headers && courses.headers['x-wp-total']) {
      setTotal(courses.headers['x-wp-total'])
    }
  }, [courses])

  return (
    <div className="container">
      <div className="d-flex  flex-column flex-md-row  justify-content-between">
        <div>
          <h2 className="title-dashboard">Courses</h2>
        </div>
        <div className="d-flex justify-content-between align-items-left align-items-md-center">
          <div className="btn-create-client w-100">
            <Link href={'/dashboard/courses/add-course'}>
              <a className="btn w-100 btn-create">
                <i>
                  <PlusIcon className="btn-create-icon" />
                </i>
                <span>Add New Course</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="d-flex mt-3">
        <button
          onClick={() => setStatus('publish')}
          className={`btn btn-transparent ${
            status === 'publish' ? 'active' : ''
          }`}
        >
          Published
        </button>
        <button
          onClick={() => setStatus('draft')}
          className={`btn btn-transparent ${
            status === 'draft' ? 'active' : ''
          }`}
        >
          Drafted
        </button>
      </div>
      <div className="mt-2 mt-md-5">
        <div className="d-none table-header-grid">
          <span>Course Name</span>
          <span className="text-md-center">Price</span>
          <span className="text-md-center">Category</span>
          <span className="text-md-center">Date</span>
          <span className="text-md-center">Status</span>
          <span className="text-md-center">Action</span>
        </div>
        {isLoading && <SpinnerLoader />}
        {courses &&
          courses.data &&
          courses.data?.map((course) => (
            <CoursesItem
              mutateCourse={mutateCourse}
              course={course}
              key={course.id}
            />
          ))}
        {courses?.length === 0 && (
          <h3 className="col display-4 text-center mt-4">
            You have not created any course yet
          </h3>
        )}
      </div>
      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-end">
          <Pagination
            totalCount={total || 0}
            onPageChange={setPage}
            currentPage={page}
            pageSize={limit}
          />
        </div>
      </div>
    </div>
  )
}

export default CoursesList
