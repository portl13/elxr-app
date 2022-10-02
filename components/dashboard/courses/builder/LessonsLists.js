import React from "react";
import Lesson from "./Lesson";

const LessonsLists = React.memo(function LessonsLists({
  lessons,
  moveUp,
  moveDown,
  editLesson,
  deleteLesson,
  courseID,
  user,
}) {
  return lessons.map((lesson, index) => (
    <Lesson
      moveDown={moveDown}
      moveUp={moveUp}
      index={index}
      key={lesson.ID}
      lesson={lesson}
      editLesson={editLesson}
      deleteLesson={deleteLesson}
      courseID={courseID}
      user={user}
    />
  ));
});

export default LessonsLists;
