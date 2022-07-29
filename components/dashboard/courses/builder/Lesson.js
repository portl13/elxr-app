import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronUp,
  faEdit,
  faGripHorizontal
} from '@fortawesome/free-solid-svg-icons'

const Lesson = ({
  lesson,
  index,
  moveDown,
  moveUp,
  removeLesson,
  editLesson,
}) => {
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
                  <button
                    onClick={() => editThisLesson(lesson.post_title)}
                    className="none-button b-remove b-edit ml-3"
                  >
                    <FontAwesomeIcon className="text-info" icon={faEdit} />
                  </button>
                </h4>
                <span>
                  <button
                    onClick={() => removeLesson(lesson.ID)}
                    className="text-primary none-button  b-remove"
                  >
                    Remove
                  </button>
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
