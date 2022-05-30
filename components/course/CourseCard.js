import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import {
  getCourseImage,
  getAuthorDetail,
} from "../../pages/api/course/course.api";
import Link from "next/link";
import { getProfileRoute } from "../../utils/constant";
import moment from "moment";

function CourseCard({ index, course, id, user, authorId, view, courseId, status }) {

  const [author, setAuthor] = useState();

  useEffect(() => getAuthorData(), [course]);
  function getAuthorData() {
    if (!course) return;
    getAuthorDetail(user, course.id).then(({data}) => {
      setAuthor(data.data);
    });
  }
  const extractContent = (s) => {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };

  return (
    <>

      <li className={`col-12 col-md-6 col-lg-3 ${view === "list" ? "list-view" : ""}`}>
        <div className="bb-course-paid">
          <Link href={`/course-detail/${course.slug}/${courseId}`}>
            <div className="bb-cover-wrap">
              {course.course_status === "not enrolled" &&
                <div className="entitled-div">Not Enrolled </div>

              }
              {course.course_status === "In Progress" &&
                <div className={(course.course_status === "In Progress" ? "progress-div" : "")} >In Progress </div>

              }
              {course.course_status === "Not Started" &&
                <div className={(course.course_status === "Not Started" ? "start-course" : "")}> Start Course </div>

              }
              {course.course_status === "Completed" &&
                <div className={(course.course_status === "Completed" ? "course-complete" : "")}> Completed </div>

              }

              {course?.course_img && <img src={course?.course_img} alt="images" />}
            </div>
          </Link>
          <div className="inner-panel">
            <div className="lessom-tag">{course.lessons}  Lesson</div>
            <Link href={`/course-detail/${course.slug}/${courseId}`}>
              <h2 className="bb-course-title">
                {course.title.rendered.length > 35
                  ? course.title.rendered.slice(0, 35).concat("...")
                  : course.title.rendered}
              </h2>
            </Link>
            <div className="name-tag">
              {!author && (
                <Spinner
                  style={{ width: "1.2rem", height: "1.2rem" }}
                  color="primary"
                />
              )}
              {author && (
                <>
                  <Link
                    className="mr-1"
                    href={getProfileRoute(
                      author?.display_name,
                      author?.id,
                      "timeline",
                      "personal"
                    )}
                  >
                    <div className="name-tag">
                      <img src={author?.avatar} alt="image" />
                      <span>{author?.display_name}</span>
                    </div>
                  </Link>
                </>
              )}
            </div>
            {/* Progress bar */}
            <div className="progress-bar-section">
              {(course.progress.percentage !== 0 || course.course_price_type === "open") &&
                <>
                  <div className="grey-bar">
                    <div className="w3-grey" style={{ height: '4px', width: `${course?.progress.percentage}%` }} > </div>
                  </div>
                  {course?.progress.percentage} % Complete
                </>
              }

              {(course.course_price === "" || course?.course_status === "Completed") &&
                <>
                  <span>Last activity on  {moment(course?.modified).format("MMMM DD, YYYY")}</span>
                </>
              }

              {course.course_status !== "Completed" &&
                <>
                  <span> {course?.progress.completed}/{course?.progress.total} Steps</span>
                </>
              }


            </div>
            {course.course_price_type !== "open" &&
              <>
                <div className="description-tag">
                  {extractContent(course.content.rendered)}
                </div>
              </>
            }

            {(course.course_price !== "" && status === "all") && (
              <div className="dollar-tag">${course.course_price}</div>
            )}
          </div>

        </div>
      </li>


    </>
  );
}
export default CourseCard;
