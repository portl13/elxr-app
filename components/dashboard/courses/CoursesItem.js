import { getFormat } from '@utils/dateFromat'
import React from 'react'
import { useState } from 'react'
import CoursesAction from './CoursesAction'
import CoursesDeleteModal from './CoursesDeleteModal'

function CoursesItem({ course, status = 'publish', mutateCourse }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  return (
    <div className="border-bottom ">
      <div className="d-flex flex-column flex-md-row justify-content-between py-4 table-header-grid">
        <div
          className="d-flex justify-content-between py-2 py-md-0 course-name"
          data-label="Course Name"
        >
          <span>{course.title.rendered}</span>
        </div>
        <div
          className="d-flex justify-content-between justify-content-md-center py-2 py-md-0 course-price"
          data-label="Price"
        >
          <span>${course.price_type_closed_price}</span>
        </div>
        <div
          className="d-flex justify-content-between justify-content-md-center py-2 py-md-0 course-category"
          data-label="Category"
        >
          {course.course_category?.map((category) => (
            <span>{category}</span>
          ))}
        </div>
        <div
          className="d-flex justify-content-between justify-content-md-center py-2 py-md-0 course-date"
          data-label="Date"
        >
          <span>{getFormat(course.date, 'MM-dd-yyyy')}</span>
        </div>
        <div
          className="d-flex justify-content-between justify-content-md-center py-2 py-md-0 course-status"
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
          <CoursesAction
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            course_id={course?.id}
          />
        </div>
      </div>
      <CoursesDeleteModal mutateCourse={mutateCourse} course={course} open={openDeleteModal} setOpen={setOpenDeleteModal} />
    </div>
  )
}

export default CoursesItem
