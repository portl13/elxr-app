import React from 'react'

function CourseCard({ course }) {
  const { id, title, course_img, short_description, content, lessons } = course
  return (
    <div className="col-12 col-md-6 col-lg-3 d-flex mb-4">
      <div className="card-general w-100">
        <div
          style={{
            backgroundImage: `url(${course_img})`,
          }}
          className="ratio ratio-16x9 bg-gray card-head cover-bg"
        >
            <div className='text-right p-3'>
                <span className='badge badge-primary'>{lessons} Lessons</span>
            </div>
        </div>
        <div className="card-info courses">
          <h3 className="card-title">
            <a className="text-white card-title-courses" href="">
              {title?.rendered}
            </a>
          </h3>
          <div className="card-body-courses line-clamp-2 my-2">
            {short_description ? (
              <p dangerouslySetInnerHTML={{ __html: short_description }} />
            ) : (
              <p dangerouslySetInnerHTML={{ __html: content?.rendered }} />
            )}
          </div>
          <div className="card-footer-courses">
                Participants Enrolled
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
