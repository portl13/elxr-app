import React from 'react';
import { useState } from 'react';
import CoursesAction from './CoursesAction';
import CoursesAddModal from './CoursesAddModal';

function CoursesItem() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  
  return (
    <div className='border-bottom '>
      <div className="d-flex flex-column flex-md-row justify-content-between py-4 ">
          <div
            className="d-flex justify-content-between py-2 py-md-0 course-name"
            data-label="Course Name"
          >
            <span>Keto Diet Course</span>
          </div>
          <div
            className="d-flex justify-content-between py-2 py-md-0 course-price"
            data-label="Price"
          >
            <span>$5.99</span>
          </div>
          <div
            className="d-flex justify-content-between py-2 py-md-0 course-category"
            data-label="Category"
          >
            <span>Science</span>
          </div>
          <div
            className="d-flex justify-content-between py-2 py-md-0 course-date"
            data-label="Date"
          >
            <span>06-03-2022</span>
          </div>
          <div
            className="d-flex justify-content-between py-2 py-md-0 course-status"
            data-label="Status"
          >
            <span className="badge-success rounded px-2">Published</span>
          </div>
          <div className="d-flex justify-content-end py-2 py-md-0">
            <CoursesAction
              openDeleteModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          </div>
        </div>
        <CoursesAddModal open={openDeleteModal} setOpen={setOpenDeleteModal} />
    </div>
  );
}

export default CoursesItem;
