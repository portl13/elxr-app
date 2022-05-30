import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import Link from "next/link";

function CourseContent({ item, id, courseId, error }) {
    console.log("item", item);
    // console.log("id", id);
    // console.log("courseId", courseId);
    return (
        <>

            <p className={item?.completed === "completed" ? "courses-lessons-panel active" : "courses-lessons-panel"}  >

                <Link href={`/lessons/${item.title}/${item.course}`} >{item.title}</Link>

                {item.type !== "section-heading" &&
                    <span className="status-div"></span>
                }
            </p>
        </>
    )
}

export default CourseContent;