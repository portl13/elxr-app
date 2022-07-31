import React, { useContext, useEffect, useState } from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { UserContext } from '@context/UserContext'
import useSWR from 'swr'
import { genericFetchWithHeader } from '@request/dashboard'
import LessonItem from './LessonItem'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import useDebounce from '@hooks/useDebounce'
import Pagination from '@components/shared/pagination/Pagination'


const url = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/lessons`
const urlNew = `${process.env.baseUrl}/wp-json/course-api/v1/lessons/`

function Lessons() {
  const { user } = useContext(UserContext)
  const limit = 20
  const token = user?.token

  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const debounceTerm = useDebounce(search, 500)

  const { data: lessons, mutate } = useSWR(
    token
      ? [
          `${urlNew}?author=${user.id}&page=${page}&per_page=${limit}&search=${debounceTerm}`,
          token,
        ]
      : null,
    genericFetchWithHeader
  )

  const isLoading = !lessons
  console.log('🚀 ~ file: Lessons.js ~ line 40 ~ Lessons ~ lessons', lessons)

  const mutateLessons = async () => {
    mutate()
  }

  useEffect(() => {
    if (lessons && lessons.headers && lessons.headers['x-wp-total']) {
      setTotal(lessons.headers['x-wp-total'])
    }
  }, [lessons])

  return (
    <div className="container ">
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <div>
          <h2 className="title-dashboard">Lessons {total && total}</h2>
        </div>
        <div>
          <InputDashSearch
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Lesson"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
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
              lessons.data &&
              lessons.data.length &&
              lessons.data.map((lesson) => (
                <LessonItem
                  mutateLessons={mutateLessons}
                  lesson={lesson}
                  key={lesson.id}
                />
              ))}
            {lessons && lessons.data.length === 0 && (
              <h3 className="col display-4 mt-3">
                You have not created any lesson yet
              </h3>
            )}
          </div>
        </div>
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

export default Lessons
