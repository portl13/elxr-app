import React from "react";
import PlusIcon from "@icons/PlusIcon";
import Link from "next/link";
import { useState } from "react";
import CoursesAction from "./CoursesAction";
import CoursesAddModal from "./CoursesAddModal";

function CoursesList() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div className="container ">
      <div className="d-flex  justify-content-between">
        <div>
          <h2 className="title-dashboard">Courses</h2>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-create-client">
            <Link href={"/dashboard/courses/add-course"}>
              <a className="btn btn-create">
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
        <div>
          <button className="btn btn-transparent">Published</button>
        </div>
        <div>
          <button className="btn btn-transparent">Drafted</button>
        </div>
      </div>
      <div className="mt-2 mt-md-5">
        <div className="d-none d-md-flex justify-content-between">
          <div>
            <span>Course Name</span>
          </div>
          <div>
            <span>Price</span>
          </div>
          <div>
            <span>Category</span>
          </div>
          <div>
            <span>Date</span>
          </div>
          <div>
            <span>Status</span>
          </div>
          <div>
            <span>Action</span>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between py-4 border-bottom table-responsive-row">
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
    </div>
  );
}

export default CoursesList;
