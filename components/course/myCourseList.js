import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { getCourses, getCourseImage, getAuthorDetail } from "../../pages/api/course/course.api";
import Link from "next/link";
import moment from "moment";
import { getProfileRoute } from "../../utils/constant";
import { Spinner } from "reactstrap";
import { stringToSlug } from "../../lib/stringToSlug";


function MyCourseList({ item, id, authorId, itemId }) {
    const { user } = useContext(UserContext);
    const [author, setAuthor] = useState();

    useEffect(() => getAuthorData(), [id]);
    function getAuthorData() {
        getAuthorDetail(user, id).then((res) => {
            setAuthor(res.data.data);
        });
    }


    return (
        <>
            <div className="bb-li-tag">
                <div className="bb-course-paid">
                    <Link href={`/course-detail/${item.slug}/${itemId}`}>
                        <div className="bb-cover-wrap">
                            {item.course_status === "not enrolled" &&
                                <div className="entitled-div">Not Enrolled </div>

                            }
                            {item.course_status === "In Progress" &&
                                <div className={(item.course_status === "In Progress" ? "progress-div" : "")} >In Progress </div>

                            }
                            {item.course_status === "Not Started" &&
                                <div className={(item.course_status === "Not Started" ? "start-course" : "")}> Start Course </div>

                            }
                            {item.course_status === "Completed" &&
                                <div className={(item.course_status === "Completed" ? "course-complete" : "")}> Completed </div>

                            }

                            {item?.course_img && <img src={item?.course_img} alt="images" />}
                        </div>
                    </Link>
                    <div className="inner-panel">
                        <div className="lessom-tag">{item.lessons}  Lesson</div>
                        <Link href={`/course-detail/${item.slug}/${itemId}`}>
                            <h2>
                                {item.title.rendered.length > 35
                                    ? item.title.rendered.slice(0, 35).concat("...")
                                    : item.title.rendered}
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
                                            stringToSlug(author?.display_name),
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

                        <div className="progress-bar-section">
                            {(item.progress.percentage !== 0 || item.price_type === "open") &&
                                <>
                                    <div className="grey-bar">
                                        <div className="w3-grey" style={{ height: '4px', width: `${item?.progress.percentage}%` }} > </div>
                                    </div>
                                    {item?.progress.percentage} % Complete
                                </>
                            }

                            {(item.course_price === "" || item?.price_type === "open") &&
                                <>
                                    <span>Last activity on  {moment(item?.modified).format("MMMM DD, YYYY")}</span>
                                </>
                            }

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default MyCourseList;