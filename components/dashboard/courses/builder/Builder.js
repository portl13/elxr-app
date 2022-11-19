import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv5 } from "uuid";
import AddIcon from "@material-ui/icons/Add";
import {
  genericDelete,
  genericFetch,
  genericFetchPost,
} from "@request/dashboard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import LessonPopup from "./LessonPopup";

import NonSsrWrapper from "../../../no-ssr-wrapper/NonSSRWrapper";
import LessonsLists from "./LessonsLists";
import { BuilderStyle } from "./Builder.style";
import { TIMEOUT } from "@utils/constant";
import { useAlert } from "react-alert";
import { Spinner } from "reactstrap";
import { UserContext } from "@context/UserContext";
import useSWRImmutable from "swr/immutable";

const urlLessons = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-lessons/`;
const sectionsUrl = `${process.env.baseUrl}/wp-json/course-api/v1/course/sections`;

function Builder({ courseID, setLessonList }) {
  const alert = useAlert();

  const { user } = useContext(UserContext);

  const token = user?.token;

  const [lessonForm, setLessonForm] = useState({
    isOpen: false,
    id: null,
    title: "",
    description: "",
  });
  const [addLesson, setAddLesson] = useState(false);
  const [addHeading, setAddHeading] = useState(false);

  const [lesson, setLesson] = useState("");
  const [heading, setHeading] = useState("");
  const [lessonRemoved, setLessonRemoved] = useState([]);

  const [lessons, setLessons] = useState([]);

  // loadings
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingHeadings, setIsLoadingHeadings] = useState(false);
  const [editHeading, setEditHeading] = useState(false);
  const [idHeading, setIdHeading] = useState(null);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newLessons = reorder(
      lessons,
      result.source.index,
      result.destination.index
    );

    setLessons(newLessons);
  }

  const addNewHeading = async () => {
    setIsLoadingHeadings(true);
    const newHeading = {
      order: lessons.length,
      ID: uuidv5(),
      post_title: heading,
      type: "section-heading",
    };

    const newHeadings = [
      ...lessons.filter((l) => l.type === "section-heading"),
      newHeading,
    ];
    try {
      await genericFetchPost(`${sectionsUrl}/${courseID}`, token, {
        sections: newHeadings,
      });
      setLessons([...lessons, newHeading]);
    } catch (e) {
      alert.error("Error when creating the section", TIMEOUT);
    } finally {
      setHeading("");
      setAddHeading(false);
      setIsLoadingHeadings(false);
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    result.forEach((lesson, index) => {
      lesson.order = index;
    });
    return result;
  };

  // move up one lesson
  const moveUp = (index) => {
    const newLessons = [...lessons];
    const [removed] = newLessons.splice(index, 1);
    newLessons.splice(index - 1, 0, removed);
    newLessons.forEach((lesson, index) => {
      lesson.order = index;
    });
    setLessons(newLessons);
  };
  // move down one lesson
  const moveDown = (index) => {
    const newLessons = [...lessons];
    const [removed] = newLessons.splice(index, 1);
    newLessons.splice(index + 1, 0, removed);
    newLessons.forEach((lesson, index) => {
      lesson.order = index;
    });
    setLessons(newLessons);
  };

  const cancelAndCleanHeading = () => {
    setAddHeading(false);
    setHeading("");
  };

  const { data: sections, error } = useSWRImmutable(
    courseID && token ? [`${sectionsUrl}/${courseID}`, token] : null,
    genericFetch
  );

  useEffect(() => {
    if (sections){
      setIsLoading(false);
      setLessons(
          sections.lessons.map((section, index) => ({
            order: index,
            ID: String(section.ID),
            post_title: section.post_title,
            type: section.type,
          }))
      );
    }
  }, [sections]);

  // useEffect(async () => {
  //   if (courseID && token) {
  //     setIsLoading(true);
  //     await getSections(courseID);
  //   }
  // }, [courseID, token]);

  useEffect(() => {
    if (lessons) {
      setLessonList(lessons);
    }
  }, [lessons]);

  const showNewLesson = () => {
    if (courseID) {
      setLessonForm({
        isOpen: true,
        id: null,
        title: "",
        description: "",
      });
    }
  };

  const handleLessonModel = async (e) => {
    const details = { ...lessonForm };
    if (e) {
      const newLessons = {
        order: lessons.length,
        ID: "-1",
        post_title: e.title,
        post_description: e.description,
        type: "sfwd-lessons",
      };
      if (courseID) {
        const saveLesson = {
          title: e.title,
          menu_order: lessons.length + 1,
          course: courseID,
          status: "publish",
          author: user?.id,
        };
        let lessonObj = await genericFetchPost(
          urlLessons,
          user?.token,
          saveLesson
        );
        if (lessonObj?.id) {
          newLessons.ID = String(lessonObj.id);

          let lessonDetails = {
            content: e.description,
            title: e.title,
          };
          await genericFetchPost(
            `${urlLessons}${lessonObj.id}`,
            user?.token,
            lessonDetails
          );
        }
      }
      setLessons([...lessons, newLessons]);
    }
    details.isOpen = false;
    setLessonForm(details);
  };

  const editLesson = async (heading) => {
    setEditHeading(true);
    setIdHeading(heading.ID);
    setHeading(heading.post_title);
  };

  const saveHeading = async () => {
    setIsLoadingHeadings(true);
    console.log("idHeading", idHeading);
    const editLessons = lessons.map((lesson) => {
      if (lesson.ID === idHeading) {
        lesson.post_title = heading;
      }
      return lesson;
    });
    const filterHeading = editLessons.filter(
      (l) => l.type === "section-heading"
    );
    try {
      await genericFetchPost(`${sectionsUrl}/${courseID}`, token, {
        sections: filterHeading,
      });
      setLessons([...editLessons]);
    } catch (e) {
      alert.error("Error updating the section", TIMEOUT);
    } finally {
      setHeading("");
      setEditHeading(false);
      setIdHeading(null);
      setIsLoadingHeadings(false);
    }
  };

  const cancelEditHeading = () => {
    setEditHeading(false);
    setIdHeading(null);
    setHeading("");
  };

  const deleteLesson = async (lessonParam) => {
    const newLessonsOrders = lessons.filter(
      (lesson) => lesson.ID !== lessonParam.ID
    );
    newLessonsOrders.forEach((lesson, index) => {
      lesson.order = index;
    });

    const newHeadings = lessons.filter((l) => l.type === "section-heading");

    try {
      if (lessonParam.type === "sfwd-lessons") {
        await genericDelete(`${urlLessons}${lessonParam.ID}`, user?.token);
      }

      await genericFetchPost(`${sectionsUrl}/${courseID}`, token, {
        sections: newHeadings,
      });

      setLessons(newLessonsOrders);
    } catch (e) {
      alert.error("Error when updating", TIMEOUT);
    }

    // await genericDelete(`${urlLessons}${lessonParam.ID}`, user?.token);
    //
    // const newLessons = lessons.filter((lesson) => lesson.ID !== lessonParam.ID);
    //
    // newLessons.forEach((lesson, index) => {
    //   lesson.order = index;
    // });
    //
    // setLessons(newLessons);
  };

  return (
    <NonSsrWrapper>
      {isLoading && <SpinnerLoader />}
      {!isLoading && (
        <div className="row mt-5 builder-container" css={BuilderStyle}>
          <div className="col-12">
            {lessons.length === 0 && (
              <div className="w-100">
                <div className="w-100 text-center p-5 no-lessons">
                  <h4 className="mb-0">Course has no content yet.</h4>
                </div>
              </div>
            )}
            <DragDropContext className="builder-inner" onDragEnd={onDragEnd}>
              <Droppable isDropDisabled={isLoadingHeadings} droppableId="list">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <LessonsLists
                      moveUp={moveUp}
                      moveDown={moveDown}
                      lessons={lessons}
                      editLesson={editLesson}
                      deleteLesson={deleteLesson}
                      courseID={courseID}
                      user={user}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {editHeading && (
              <div className="add-lesson mt-3 d-flex flex-column">
                <input
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  className="w-100 input-search"
                  type="text"
                />
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-link btn-sm ml-2"
                    onClick={() => saveHeading()}
                  >
                    {!isLoadingHeadings ? (
                      "Save Section Heading"
                    ) : (
                      <Spinner size={"sm"} />
                    )}
                  </button>
                  <button
                    className="btn btn-link text-danger btn-sm"
                    onClick={cancelEditHeading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {addHeading && (
              <div className="add-lesson mt-3 d-flex flex-column">
                <input
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  className="w-100 input-search"
                  type="text"
                />
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-link btn-sm ml-2"
                    onClick={() => addNewHeading()}
                  >
                    {!isLoadingHeadings ? (
                      "Add Section Heading"
                    ) : (
                      <Spinner size={"sm"} />
                    )}
                  </button>
                  <button
                    className="btn btn-link text-danger btn-sm"
                    onClick={cancelAndCleanHeading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <div className="mt-3 add-button-container">
              {!addHeading && (
                <button
                  onClick={() => {
                    if (!courseID) return;
                    setAddHeading(true);
                  }}
                  className={
                    "btn btn-link py-3 px-0 " + (!courseID ? "text-muted" : "")
                  }
                >
                  <AddIcon />
                  <span className="d-flex ml-2">New Section Heading</span>
                </button>
              )}
              {!addLesson && (
                <div
                  onClick={showNewLesson}
                  className={
                    "btn btn-link py-3 px-0 " + (!courseID ? "text-muted" : "")
                  }
                >
                  <AddIcon />
                  <span className="d-flex ml-2">Add New Lesson</span>
                </div>
              )}

              {lessonForm?.isOpen && (
                <LessonPopup
                  isOpen={lessonForm.isOpen}
                  lessonForm={lessonForm}
                  handleClose={handleLessonModel}
                />
              )}
            </div>

            {!courseID && (
              <div className={"alert alert-danger"}>
                Please save the course before adding lessons
              </div>
            )}
          </div>
        </div>
      )}
    </NonSsrWrapper>
  );
}

export default Builder;
