import React, { useState } from 'react'
import { css } from '@emotion/core'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { v4 as uuidv5 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronUp,
  faEdit,
  faGripHorizontal,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'

const style = css`
  .lesson-item {
    border: 1px solid #ccc;
    border-bottom: 0.5px solid #ccc;
    padding: 0 10px;
  }
  .lesson-item:last-child {
    border-bottom: 0.5px solid #ccc;
  }
  .section-heading {
    text-transform: uppercase;
    background-color: #1a1a1a;
  }
  .section-heading h4 {
    text-transform: uppercase;
  }
  .section-lesson {
    background-color: var(--bg);
  }
  .move-actions {
    width: 50px;
    margin-right: 20px;
  }
  .none-button {
    background-color: transparent;
    border: 0;
    color: var(--typo);
    outline: none;
  }
  .move-actions-up,
  .move-actions-down {
    width: 15px;
    height: 25px;
  }

  .no-pointer {
    cursor: default;
  }
  .move-actions-grip {
    height: 25px;
    height: 13px;
  }
  .section-edit {
    align-items: center;
    justify-content: space-between;
    padding-right: 20px !important;
  }
  .section-edit:hover .b-remove {
    opacity: 1;
  }
  .b-remove {
    opacity: 0;
  }
  .b-edit {
    width: 30px;
  }
  .plus-icon {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .plus-container {
    align-items: center;
    border: 1px solid;
    border-radius: 50%;
    padding: 3px;
  }
  .no-lessons {
    border: 1px solid #ccc;
  }
  .input-add {
    background-color: var(--bg);
    color: var(--typo);
    border: 1px solid #ccc;
  }
`

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
              : 'section-lesson'
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

const LessonsLists = React.memo(function LessonsLists({
  lessons,
  moveUp,
  moveDown,
  removeLesson,
  editLesson,
}) {
  return lessons.map((lesson, index) => (
    <Lesson
      moveDown={moveDown}
      moveUp={moveUp}
      removeLesson={removeLesson}
      index={index}
      key={lesson.ID}
      lesson={lesson}
      editLesson={editLesson}
    />
  ))
})

function Builder() {
  const [addLesson, setAddLesson] = useState(false)
  const [addHeading, setAddHeading] = useState(false)

  const [lesson, setLesson] = useState('')
  const [heading, setHeading] = useState('')

  const [lessons, setLessons] = useState([])
  console.log('🚀 ~ file: Builder.js ~ line 188 ~ Builder ~ lessons', lessons)

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

  const addNewLesson = () => {
    const newLessons = {
      order: lessons.length,
      ID: uuidv5(),
      post_title: lesson,
      url: '',
      edit_link: '',
      tree: [],
      expanded: false,
      type: 'section-lesson',
    }

    setLessons([...lessons, newLessons])
    setLesson('')
    setAddLesson(false)
  }

  const addNewHeading = () => {
    const newHeading = {
      order: lessons.length,
      ID: uuidv5(),
      post_title: heading,
      url: '',
      edit_link: '',
      tree: [],
      expanded: false,
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
    result.forEach((quote, index) => {
      quote.order = index
    })
    return result
  }

  // remove element from the list by id and reassign order
  const removeLesson = (id) => {
    const newLessons = lessons.filter((lesson) => lesson.ID !== id)
    newLessons.forEach((quote, index) => {
      quote.order = index
    })
    setLessons(newLessons)
  }

  // move up one lesson
  const moveUp = (index) => {
    const newLessons = [...lessons]
    const [removed] = newLessons.splice(index, 1)
    newLessons.splice(index - 1, 0, removed)
    newLessons.forEach((quote, index) => {
      quote.order = index
    })
    setLessons(newLessons)
  }
  // move down one lesson
  const moveDown = (index) => {
    const newLessons = [...lessons]
    const [removed] = newLessons.splice(index, 1)
    newLessons.splice(index + 1, 0, removed)
    newLessons.forEach((quote, index) => {
      quote.order = index
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

  return (
    <div css={style}>
      {lessons.length === 0 && (
        <div className="w-100">
          <div className="w-100 text-center p-5 no-lessons">
            <h4 className="mb-0">Course has no content yet.</h4>
          </div>
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <LessonsLists
                moveUp={moveUp}
                moveDown={moveDown}
                removeLesson={removeLesson}
                lessons={lessons}
                editLesson={editLesson}
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
            onClick={() => setAddHeading(false)}
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
          />
          <button
            className="btn btn-primary btn-sm ml-2"
            onClick={() => addNewLesson()}
          >
            Add Lesson
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setAddLesson(false)}
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
          className="none-button py-3 px-5 d-flex align-items-center">
            <span className="d-flex plus-container">
              <FontAwesomeIcon className="plus-icon" icon={faPlus} />
            </span>
            <span className="d-flex ml-2">New Section Heading</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Builder
