import { getFormat } from '@utils/dateFromat'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import LessonAction from './LessonAction'
import LessonDeleteModal from './LessonDeleteModal'

function LessonItem({ lesson, status = 'publish', mutateLessons }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  return (
    <div className="border-bottom ">
      <div className="d-flex flex-column flex-md-row justify-content-between py-4 table-header-grid lessons">
        <div
          className="d-flex justify-content-between py-2 py-md-0 course-name"
          data-label="Lesson Name"
        >
          <span>
            <Link href={`/dashboard/lessons/preview/${lesson?.id}`}>
              <a className='text-white'>{lesson.title.rendered}</a>
            </Link>
          </span>
        </div>
        <div
          className="d-flex justify-content-between justify-content-md-center py-2 py-md-0 course-price"
          data-label="Course"
        >
          <span>{lesson.course_title}</span>
        </div>
        <div
          className="d-flex justify-content-between justify-content-md-center py-2 py-md-0 course-date"
          data-label="Date"
        >
          <span>{getFormat(lesson.date, 'MM-dd-yyyy')}</span>
        </div>
        <div
          className="d-flex justify-content-between justify-content-md-center py-2 py-md-0 course-status align-items-center"
          data-label="Status"
        >
          {status === 'publish' && (
            <span className="badge-success rounded px-2">Published</span>
          )}
          {status === 'draft' && (
            <span className="badge-danger rounded px-2">Drafted</span>
          )}
        </div>
        <div className="d-flex justify-content-end justify-content-md-center py-2 py-md-0">
          <LessonAction
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            lesson_id={lesson?.id}
          />
        </div>
      </div>
      <LessonDeleteModal
        mutateLessons={mutateLessons}
        lesson={lesson}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      />
    </div>
  )
}

export default LessonItem
