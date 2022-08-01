import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { v4 as uuidv5 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {
  genericDelete,
  genericFetch,
  genericFetchPost,
} from '@request/dashboard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'


import axios from 'axios'
import LessonsLists from './LessonsLists'
import { BuilderStyle } from './Builder.style'

const urlLessons = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-lessons/`
const sectionsUrl = `${process.env.baseUrl}/wp-json/course-api/v1/course/sections`

function Builder({ user, courseID }) {
  const token = user?.token
  const [addLesson, setAddLesson] = useState(false)
  const [addHeading, setAddHeading] = useState(false)

  const [lesson, setLesson] = useState('')
  const [heading, setHeading] = useState('')
  const [lessonRemoved, setLessonRemoved] = useState([])

  const [lessons, setLessons] = useState([])

  // loadings
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingLessons, setIsLoadingLessons] = useState(false)
  const [isLoadingHeadings, setIsLoadingHeadings] = useState(false)

  function onDragEnd(result) {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const newLessons = reorder(
      lessons,
      result.source.index,
      result.destination.index
    )

    setLessons(newLessons)
  }

  const addNewLesson = async () => {
    setIsLoadingLessons(true)

    const saveLesson = {
      title: lesson,
      menu_order: lessons.length === 0 ? 1 : lessons.length,
      course: courseID,
      status: 'publish',
      author: user.id,
    }

    try {
      const data = await genericFetchPost(urlLessons, token, saveLesson)

      const newLessons = {
        order: lessons.length,
        ID: String(data.id),
        post_title: lesson,
        type: 'sfwd-lessons',
      }

      setLessons([...lessons, newLessons])
    } catch (error) {
      console.log(error)
    } finally {
      setLesson('')
      setAddLesson(false)
      setIsLoadingLessons(false)
    }
  }

  const addNewHeading = () => {
    const newHeading = {
      order: lessons.length,
      ID: uuidv5(),
      post_title: heading,
      type: 'section-heading',
    }
    setLessons([...lessons, newHeading])
    setHeading('')
    setAddHeading(false)
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    result.forEach((lesson, index) => {
      lesson.order = index
    })
    return result
  }

  // remove element from the list by id and reassign order
  const removeLesson = (id) => {
    const newLessons = lessons.filter((lesson) => lesson.ID !== id)
    newLessons.forEach((lesson, index) => {
      lesson.order = index
    })
    setLessons(newLessons)
  }

  // remove element from the list by id and save in lessonRemoved
  const removeLessonFromList = (id) => {
    const newLessons = lessons.filter((lesson) => lesson.ID !== id)
    newLessons.forEach((lesson, index) => {
      lesson.order = index
    })
    setLessons(newLessons)
    setLessonRemoved([...lessonRemoved, id])
  }

  // move up one lesson
  const moveUp = (index) => {
    const newLessons = [...lessons]
    const [removed] = newLessons.splice(index, 1)
    newLessons.splice(index - 1, 0, removed)
    newLessons.forEach((lesson, index) => {
      lesson.order = index
    })
    setLessons(newLessons)
  }
  // move down one lesson
  const moveDown = (index) => {
    const newLessons = [...lessons]
    const [removed] = newLessons.splice(index, 1)
    newLessons.splice(index + 1, 0, removed)
    newLessons.forEach((lesson, index) => {
      lesson.order = index
    })
    setLessons(newLessons)
  }

  // edit post title of a lesson
  const editLesson = (id, title) => {
    const newLessons = lessons.map((lesson) => {
      if (lesson.ID === id) {
        lesson.post_title = title
      }
      return lesson
    })
    setLessons(newLessons)
  }

  const cancelAndCleanLesson = () => {
    setAddLesson(false)
    setLesson('')
  }

  const cancelAndCleanHeading = () => {
    setAddHeading(false)
    setHeading('')
  }

  const updateLessonsAndSections = async () => {
    setIsLoadingHeadings(true)

    if (lessonRemoved.length > 0) {
      const requestsRemove = lessonRemoved.map((id) => {
        return genericDelete(`${urlLessons}${id}`, token)
      })

      await axios.all(requestsRemove)
    }

    const newLessons = lessons.filter(
      (lesson) => lesson.type !== 'section-heading'
    )

    if (newLessons.length > 0) {
      const requests = newLessons.map((lesson) => {
        return genericFetchPost(`${urlLessons}${lesson.ID}`, token, {
          title: lesson.post_title,
          menu_order: lesson.order,
        })
      })

      await axios.all(requests)
    }

    const newHeadings = lessons.filter(
      (lesson) => lesson.type === 'section-heading'
    )

    if (newHeadings.length > 0) {
      await genericFetchPost(`${sectionsUrl}/${courseID}`, token, {
        sections: newHeadings,
      })
    }

    await getSections(courseID)

    setIsLoadingHeadings(false)
  }

  const getSections = async (courseID) => {
    const { lessons } = await genericFetch(`${sectionsUrl}/${courseID}`, token)
    setIsLoading(false)
    setLessons(
      lessons.map((section, index) => ({
        order: index,
        ID: String(section.ID),
        post_title: section.post_title,
        type: section.type,
      }))
    )
  }

  useEffect(async () => {
    if (courseID) {
      await getSections(courseID)
    }
  }, [courseID])

  return (
    <>
      {isLoading && <SpinnerLoader />}
      {!isLoading && (
        <div className="row mt-5" css={BuilderStyle}>
          <div className="col-12">
            {lessons.length === 0 && (
              <div className="w-100">
                <div className="w-100 text-center p-5 no-lessons">
                  <h4 className="mb-0">Course has no content yet.</h4>
                </div>
              </div>
            )}
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable isDropDisabled={isLoadingHeadings} droppableId="list">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <LessonsLists
                      moveUp={moveUp}
                      moveDown={moveDown}
                      removeLesson={removeLesson}
                      lessons={lessons}
                      editLesson={editLesson}
                      token={token}
                      removeLessonFromList={removeLessonFromList}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {addHeading && (
              <div className="add-lesson mt-3 d-flex">
                <input
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  className="w-100 input-add"
                  type="text"
                />
                <button
                  className="btn btn-primary btn-sm ml-2"
                  onClick={() => addNewHeading()}
                >
                  Add Section Heading
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={cancelAndCleanHeading}
                >
                  Cancel
                </button>
              </div>
            )}
            {addLesson && (
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
                    'Add Lesson'
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
            )}
            <div className="mt-3 w-100 d-flex">
              {!addLesson && (
                <button
                  onClick={() => setAddLesson(true)}
                  className="none-button py-3 px-0 d-flex align-items-center"
                >
                  <span className="d-flex plus-container">
                    <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                  </span>
                  <span className="d-flex ml-2">New Lesson</span>
                </button>
              )}
              {!addHeading && (
                <button
                  onClick={() => setAddHeading(true)}
                  className="none-button py-3 px-5 d-flex align-items-center"
                >
                  <span className="d-flex plus-container">
                    <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                  </span>
                  <span className="d-flex ml-2">New Section Heading</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-12 mt-1">
          <div className="d-flex justify-content-end ">
            <button
              onClick={() => updateLessonsAndSections()}
              type="submit"
              className="btn btn-create py-3 px-5"
            >
              {isLoadingHeadings ? 'Saving' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Builder
