import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronUp,
  faEdit,
  faGripHorizontal,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

const Lesson = ({
  lesson,
  index,
  moveDown,
  moveUp,
  removeLesson,
  editLesson,
  token,
  removeLessonFromList,
}) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(lesson.post_title)

  const updateLesson = () => {
    editLesson(lesson.ID, newTitle)
    setIsEditing(false)
  }

  const editThisLesson = (title) => {
    setNewTitle(title)
    setIsEditing(true)
  }

  const redirectEdit = (id) => {
    router.push(`/dashboard/lessons/edit-lesson/${id}`)
  }

  const removeApiLesson = async (lesson) => {
    if (lesson.type === 'section-heading') {
      removeLesson(lesson.ID)
      return
    }
    removeLessonFromList(lesson.ID)
  }

  return (
    <Draggable isDragDisabled={false} draggableId={lesson.ID} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`lesson-item d-flex pr-0 ${
            lesson.type === 'section-heading'
              ? 'section-heading'
              : 'sfwd-lessons'
          }`}
        >
          <div className="d-flex flex-column move-actions align-items-center">
            <button
              className="move-actions-up none-button d-flex p-0 align-items-center"
              onClick={() => moveUp(index)}
            >
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
            <FontAwesomeIcon
              className="d-block move-actions-grip"
              icon={faGripHorizontal}
            />
            <button
              className="move-actions-down none-button d-flex p-0 align-items-center"
              onClick={() => moveDown(index)}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
          <button className="section-edit w-100 none-button no-pointer p-0 d-flex">
            {!isEditing && (
              <>
                <h4 className="mb-0 d-flex align-items-center">
                  {lesson.post_title}
                  <span
                    onClick={() => editThisLesson(lesson.post_title)}
                    className="none-button b-remove b-edit ml-3 pointer"
                  >
                    <FontAwesomeIcon className="text-info" icon={faEdit} />
                  </span>
                </h4>
                <span className="d-flex">
                  {lesson.type === 'sfwd-lessons' && (
                    <span
                      onClick={() => redirectEdit(lesson.ID)}
                      className="text-info none-button  b-remove pointer d-flex mr-2"
                    >
                      Edit
                    </span>
                  )}
                  <span
                    onClick={() => removeApiLesson(lesson)}
                    className="text-primary none-button  b-remove pointer"
                  >
                    Remove
                  </span>
                </span>
              </>
            )}

            {isEditing && (
              <div className="add-lesson d-flex w-100 align-items-center">
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-100 input-add"
                  type="text"
                />
                <button
                  onClick={updateLesson}
                  className="btn btn-primary btn-sm ml-2"
                >
                  Save
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </button>
        </div>
      )}
    </Draggable>
  )
}

export default Lesson
