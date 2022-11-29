import React, { useState } from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import CoursesDeleteModal from "@components/dashboard/courses/CoursesDeleteModal";

function CardCourse({ course, mutateCourse }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  return (
    <>
      <div className="card-general-new w-100">
        <Link
          href={`/course-detail/${stringToSlug(course.title?.rendered)}/${
            course.id
          }`}
        >
          <a>
            <div
              style={{
                backgroundImage: `url(${course.cover})`,
              }}
              className="ratio ratio-1x1 bg-gray border-radius-17 card-head cover-bg"
            ></div>
          </a>
        </Link>
        <div className="py-3 px-0 courses">
          <h3 className="font-size-12  m-0">
            <Link
              href={`/course-detail/${stringToSlug(course.title?.rendered)}/${
                course.id
              }`}
            >
              <a className="text-white text-ellipsis">
                {course.title?.rendered}
              </a>
            </Link>
          </h3>
          <div className="d-flex flex-column">
            <span className="text-grey font-size-13">
              {course.lessons} Lessons
            </span>
          </div>
        </div>
        <div className="card-footer-actions">
          <Link href={`/dashboard/courses/edit-course/${course.id}`}>
            <a className="btn btn-action">Edit</a>
          </Link>
          <button onClick={()=>setOpenDeleteModal(!openDeleteModal)} className="btn btn-action">Delete</button>
          <Link
            href={`/course-detail/${stringToSlug(course.title?.rendered)}/${
              course.id
            }`}
          >
            <a className="btn btn-action">View</a>
          </Link>
        </div>
      </div>
      <CoursesDeleteModal
        mutateCourse={mutateCourse}
        course={course}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      />
    </>
  );
}

export default CardCourse;
