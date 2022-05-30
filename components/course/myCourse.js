import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { getCourses, getCourseImage, getMyCourses } from "../../pages/api/course/course.api";
import MyCourseList from "./myCourseList";

function MyCourse() {
    const { user } = useContext(UserContext);
    const [loader, setLoader] = useState(true);
    const [result, setResult] = useState();
    const [myCount, setMyCount] = useState(null)
    

    const formData = {
        page: 1,
        per_page: 20,
    };

    useEffect(() => {
        getMyCourseList();
    }, []);

    function getMyCourseList() {
        setLoader(true);
        getMyCourses(user, formData, user?.id)
            .then((res) => {
                setLoader(false);
                setResult(res.data);
                setMyCount(res.data.length);
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            {result?.map((item) => {
                return (
                    <>
                        <MyCourseList
                            item={item}
                            id={item.featured_media}
                            authorId={item.author}
                            itemId = {item.id}
                        />
                    </>
                )
            })

            }


        </>
    )

}
export default MyCourse;