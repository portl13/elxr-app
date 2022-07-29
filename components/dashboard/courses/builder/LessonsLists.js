import React from "react"
import Lesson from './Lesson'

const LessonsLists = React.memo(function LessonsLists({
    lessons,
    moveUp,
    moveDown,
    removeLesson,
    editLesson,
    token,
    removeLessonFromList
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
        token={token}
        removeLessonFromList={removeLessonFromList}
      />
    ))
  })

  export default LessonsLists