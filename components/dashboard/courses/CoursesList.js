import React from "react";
import PlusIcon from "@icons/PlusIcon";
import Link from "next/link";
import { useState } from "react";
import CoursesItem from "./CoursesItem";

function CoursesList() {
  // const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
        <CoursesItem />
      </div>
    </div>
  );
}

export default CoursesList;
