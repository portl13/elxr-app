import React from 'react'
import LockIcon from '@icons/LockIcon'
import { lessonItem } from './CourseLessonItem.style'

function CourseLessonItem({ lesson }) {
  return (
    <article
      css={lessonItem}
      className={`${
        lesson.type === 'section-heading' ? 'p-0 border-none' : ''
      } lesson-container`}
    >
      <div className="lesson-content">
        {lesson.type !== 'section-heading' && (
          <span className="lesson-meta">Lesson {lesson.number}</span>
        )}
        <h3 className="lesson-title">{lesson.title}</h3>
      </div>
      <div className="lesson-content-icon d-flex justify-content-center align-items-center">
        {lesson.type !== 'section-heading' && (
          <LockIcon className="lesson-icon" />
        )}
      </div>
    </article>
  )
}

export default CourseLessonItem
