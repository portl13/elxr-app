import React, { useEffect, useState } from "react";
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

import axios from "axios";
import LessonsLists from "./LessonsLists";
import { BuilderStyle } from "./Builder.style";
import { TIMEOUT } from "@utils/constant";
import { useAlert } from "react-alert";
import { Spinner } from "reactstrap";

const urlLessons = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-lessons/`;
const sectionsUrl = `${process.env.baseUrl}/wp-json/course-api/v1/course/sections`;
const courseApi = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/lessons`;

function Builder({ user, courseID, setLessonList }) {
  const alert = useAlert();
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLessons, setIsLoadingLessons] = useState(false);
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

  const addNewLesson = async () => {
    setIsLoadingLessons(true);

    const saveLesson = {
      title: lesson,
      menu_order: lessons.length === 0 ? 1 : lessons.length,
      course: courseID,
      status: "publish",
      author: user.id,
    };

    try {
      const data = await genericFetchPost(urlLessons, token, saveLesson);

      const newLessons = {
        order: lessons.length,
        ID: String(data.id),
        post_title: lesson,
        type: "sfwd-lessons",
      };

      setLessons([...lessons, newLessons]);
    } catch (error) {
      console.log(error);
    } finally {
      setLesson("");
      setAddLesson(false);
      setIsLoadingLessons(false);
    }
  };

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

  // remove element from the list by id and reassign order
  const removeLesson = (id) => {
    const newLessons = lessons.filter((lesson) => lesson.ID !== id);
    newLessons.forEach((lesson, index) => {
      lesson.order = index;
    });
    setLessons(newLessons);
  };

  // remove element from the list by id and save in lessonRemoved
  const removeLessonFromList = (id) => {
    const newLessons = lessons.filter((lesson) => lesson.ID !== id);
    newLessons.forEach((lesson, index) => {
      lesson.order = index;
    });
    setLessons(newLessons);
    setLessonRemoved([...lessonRemoved, id]);
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

  // edit post title of a lesson
  // const editLesson = (id, title) => {
  //   const newLessons = lessons.map((lesson) => {
  //     if (lesson.ID === id) {
  //       lesson.post_title = title;
  //     }
  //     return lesson;
  //   });
  //   setLessons(newLessons);
  // };

  const cancelAndCleanLesson = () => {
    setAddLesson(false);
    setLesson("");
  };

  const cancelAndCleanHeading = () => {
    setAddHeading(false);
    setHeading("");
  };

  const updateLessonsAndSections = async () => {
    setIsLoadingHeadings(true);

    if (lessonRemoved.length > 0) {
      const requestsRemove = lessonRemoved.map((id) => {
        return genericDelete(`${urlLessons}${id}`, token);
      });

      await axios.all(requestsRemove);
    }

    const newLessons = lessons.filter(
      (lesson) => lesson.type !== "section-heading"
    );

    if (newLessons.length > 0) {
      const requests = newLessons.map((lesson) => {
        return genericFetchPost(`${urlLessons}${lesson.ID}`, token, {
          title: lesson.post_title,
          menu_order: lesson.order,
        });
      });
      await axios.all(requests);
    }

    const newHeadings = lessons.filter(
      (lesson) => lesson.type === "section-heading"
    );

    if (newHeadings.length > 0) {
      await genericFetchPost(`${sectionsUrl}/${courseID}`, token, {
        sections: newHeadings,
      });
    }

    await getSections(courseID);

    setIsLoadingHeadings(false);
  };

  const getSections = async (courseID) => {
    const { lessons } = await genericFetch(`${sectionsUrl}/${courseID}`, token);
    setIsLoading(false);
    setLessons(
      lessons.map((section, index) => ({
        order: index,
        ID: String(section.ID),
        post_title: section.post_title,
        type: section.type,
      }))
    );
  };

  useEffect(async () => {
    if (courseID) {
      setIsLoading(true);
      await getSections(courseID);
    }
  }, [courseID]);

  useEffect(async () => {
    setLessonList(lessons);
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

        // const newLessons = lessons.map((lesson) => {
        //   if (lesson.ID === e.id) {
        //     lesson.post_title = e.title;
        //     lesson.post_description = e.description;
        //   }
        //   return lesson;
        // });
        // setLessons(newLessons);

        // if (lessonId) {
        // let lessonObj = await genericFetchPost(
        //   `${urlLessons}${lessonId}`,
        //   user?.token,
        //   lessonDetails
        // );
        // }
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
    <>
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

            {/* {addLesson && (
              <div className="add-lesson mt-3 d-flex">
                <input
                  value={lesson}
                  onChange={(e) => setLesson(e.target.value)}
                  className="w-100 input-add"
                  type="text"
                  disabled={isLoadingLessons}
                />
                <button
                  className="btn btn-primary btn-sm ml-2"
                  onClick={() => addNewLesson()}
                >
                  {!isLoadingLessons ? (
                    "Add Lesson"
                  ) : (
                    <SpinnerLoader
                      pd=""
                      width="1rem"
                      height="1rem"
                      color="white"
                    />
                  )}
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={cancelAndCleanLesson}
                >
                  Cancel
                </button>
              </div>
            )} */}
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
      {/* <div className="row">
        <div className="col-12 mt-1">
          <div className="d-flex justify-content-end ">
            <button
              onClick={() => updateLessonsAndSections()}
              type="submit"
              className="btn btn-create py-3 px-5"
            >
              {isLoadingHeadings ? "Saving" : "Update"}
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Builder;
