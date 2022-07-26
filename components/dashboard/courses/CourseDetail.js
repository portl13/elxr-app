import React, { useState } from 'react'
import CourseLessonItem from '@components/dashboard/courses/CourseLessonItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalBody } from 'reactstrap'
import ReactPlayer from 'react-player'
import PlayerYouTube from 'react-player/youtube'
import PlayerVimeo from 'react-player/vimeo'

function CourseDetail({ course, lessons }) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${course?.course_img || course?.cover})`,
        }}
        className="bg-gray ratio ratio-16x9 bd-radius cover-bg"
      >
        {course && course.course_video && (
          <div
            onClick={() => setOpenModal(!openModal)}
            className="cover-bg-overlay pointer"
          >
            <div className="cover-bg-overlay-content">
              <h1 className="text-white text-center font-size-12">
                <span className="icon-course-play">
                  <FontAwesomeIcon className="icon-play" icon={faPlay} />
                </span>
                Preview this Course
              </h1>
            </div>
          </div>
        )}
      </div>
      <div className="text-left my-4">
        <span className="badge badge-primary">{course?.lessons} Lessons</span>
      </div>
      <div className="course-detail-body">
        <h3 className="course-detail-title mb-3">{course?.title?.rendered}</h3>
        <div className="course-detail-description">
          {course?.short_description ? (
            <p dangerouslySetInnerHTML={{ __html: course.short_description }} />
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html: course?.content?.rendered,
              }}
            />
          )}
        </div>
        <div className="border-white mt-5">
          <h4 className="text-uppercase mb-3">all lessons</h4>
          {lessons &&
            lessons.map((lesson) => (
              <CourseLessonItem key={lesson.id} lesson={lesson} />
            ))}
        </div>
      </div>
      {openModal && course?.course_video && (
        <Modal
          isOpen={openModal}
          toggle={() => setOpenModal(!openModal)}
          centered
          size="lg"
        >
          <ModalBody className='p-0  overflow-hidden'>
            {course.course_video.includes('youtu') && (
              <div className="ratio ratio-16x9">
                <PlayerYouTube
                  width={'100%'}
                  height={'100%'}
                  url={course.course_video}
                  config={{
                    youtube: {
                      playerVars: {
                        controls: 1,
                        showinfo: 0,
                        fs: 0,
                        disablekb: 1,
                        rel: 0,
                        modestbranding: 1,
                      },
                    },
                  }}
                />
              </div>
            )}

            {!course.course_video.includes('youtu') &&
              !course.course_video.includes('vimeo') && (
                <ReactPlayer
                  url={course.course_video}
                  width="100%"
                  height="100%"
                  controls={true}
                  muted={true}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload', //<- this is the important bit
                      },
                    },
                  }}
                />
              )}

            {course.course_video.includes('vimeo') && (
              <div className="ratio ratio-16x9">
                <PlayerVimeo
                  width={'100%'}
                  height={'100%'}
                  url={course.course_video}
                  config={{
                    vimeo: {
                      playerOptions: {
                        title: 1,
                        controls: 1,
                        showinfo: 1,
                      },
                    },
                  }}
                />
              </div>
            )}
          </ModalBody>
        </Modal>
      )}
    </>
  )
}

export default CourseDetail
