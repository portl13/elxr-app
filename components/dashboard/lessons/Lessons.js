import React, { useContext, useState } from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { UserContext } from '@context/UserContext'
import LupaIcon from '@icons/LupaIcon'
import PlusIcon from '@icons/PlusIcon'
import Link from 'next/link'
import useSWR from 'swr'
import { genericFetch } from '@request/dashboard'
import LessonItem from './LessonItem'

const url = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/lessons`
const urlNew = `${process.env.baseUrl}/wp-json/ldlms/v1/sfwd-lessons`



function Lessons() {
  const { user } = useContext(UserContext)

  const token = user?.token

  const [status, setStatus] = useState('publish')

  const { data: lessons, mutate } = useSWR(
    token ? [`${url}?author=${user?.id}`, token] : null,
    genericFetch
  )

  const isLoading = !lessons

  const mutateLessons = async () => {
    mutate()
  }

  return (
    <div className="container ">
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <div>
          <h2 className="title-dashboard">Lessons</h2>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-create-client w-100">
            <Link href={'/dashboard/courses/add-course'}>
              <a className="btn btn-create w-100">
                <i>
                  <PlusIcon className="btn-create-icon" />
                </i>
                <span>Create a Course</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-2 mt-md-5">
        <div className="d-none table-header-grid lessons">
          <span>Lesson Name</span>
          <span className="text-md-center">Course</span>
          <span className="text-md-center">Date</span>
          <span className="text-md-center">Status</span>
          <span className="text-md-center">Action</span>
        </div>
        {isLoading && <SpinnerLoader />}
        {lessons &&
          lessons.map((lesson) => (
            <LessonItem
              mutateLessons={mutateLessons}
              lesson={lesson}
              key={lesson.id}
            />
          ))}
        {lessons && lessons.length === 0 && (
          <h3 className="col display-4 mt-3">
            You have not created any lesson yet
          </h3>
        )}
      </div>
    </div>
  )
}

export default Lessons
