import React, { useState, useContext, useEffect } from 'react'
import Layout from '../../../components/layout/Layout'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../../context/UserContext'
import {
  getCourseContent,
  getCourseDetail,
  getCourseAuthor,
  courseStatusUpdate,
  getCourseLessions,
  getLessions,
  getParticipantsList,
} from '../../api/course/course.api'
import moment from 'moment'
import { Spinner } from 'reactstrap'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import { getProfileRoute } from '../../../utils/constant'
import { stringToSlug } from '../../../lib/stringToSlug'
import { css } from '@emotion/core'
import Loader from '../../../components/loader'

const courseLessions = () => {
  const { user } = useContext(UserContext)
  const [courseContent, setContent] = useState()
  const [result, setCourseResult] = useState()
  const [authorCourseList, setAuthorCourse] = useState()
  const [courseLessons, setCourselessons] = useState()
  const [lessonsData, setlessonsData] = useState()
  const [lessonsResult, setLessonresult] = useState()
  const [progress, setProgress] = useState()
  const [heading, setHeading] = useState()
  const [isComplete, setComplete] = useState(false)
  const [participants, setParticipantslist] = useState()
  const [completedLoading, setCompletedLoading] = useState(false)

  const course_id = lessonsData?.map((item) => item.course)?.[0]
  const courseDetails = lessonsData?.map((item) => item.slug)?.[0]

  const router = useRouter()
  const query = router.query
  const id = parseInt(query.id)

  useEffect(() => {
    let courseResult = JSON.parse(localStorage.getItem('course-progress'))
    setProgress(courseResult.courseProgress)
    setHeading(courseResult.courseHeading)
  }, [])

  useEffect(() => {
    let courseResult = JSON.parse(localStorage.getItem('course-content'))
    setlessonsData(courseResult)
  }, [])

  useEffect(() => {
    if (id) {
      getParticularLessons(id)
    }
  }, [id])
  function getParticularLessons() {
    getLessions(user, id).then(({data: lesson}) => {
      setLessonresult(lesson)
      setComplete(lesson.completed === "completed")
    })
  }

  useEffect(() => {
    if (course_id) {
      participantsList()
    }
  }, [course_id])

  function participantsList() {
    getParticipantsList(user, course_id).then((res) => {
      setParticipantslist(res.data.data)
    })
  }

  useEffect(() => {
    if (id) {
      getCourseAuthorList(id)
    }
  }, [id])

  function getCourseAuthorList() {
    getCourseAuthor(user, id)
      .then((res) => {
        setAuthorCourse(res.data.data)
      })
      .catch(() => {})
  }

  const getUpdatevalue = (id) => {
    setCompletedLoading(true)
    courseStatusUpdate(user, id).then((res) => {
      setComplete(true)
      //setlessonsData(courseResult);
      // setContent(res.data)
    })
    .catch(()=>{

    })
    .finally(() => setCompletedLoading(false))
    
    markCompleted(id)
  }

  const markCompleted = (id) => {
    let lessonsUpdate = lessonsData.map(lesson => {
      if (lesson.id === id) {
        lesson.completed = "completed"
      }
      return lesson
    })

    setlessonsData(lessonsUpdate)
    localStorage.setItem('course-content', JSON.stringify(lessonsUpdate))
  }

  return (
    <Layout noMenu={true}>
      <Head>
        <title>WeShare | Course</title>
      </Head>
      {!authorCourseList && (
        <Spinner
          style={{
            width: '3.2rem',
            height: '3.2rem',
            zIndex: '10',
            margin: 'auto',
            position: 'absolute',
            left: '50%',
            top: '35%',
          }}
          color="primary"
        />
      )}
      <div
        css={css`
          position: fixed;
          .lms-topic-sidebar-data,
          .learndash-page-content {
            overflow-y: scroll;
            height: 100vh;
            padding-bottom: 3rem;
          }
        `}
        className="lesson-section  bg-black bd-radius"
      >
        <div className="lms-topic-sidebar-data">
          <div className="ld-course-navigation">
            <a
              className="back-btn"
              onClick={() =>
                Router.push(`/course-detail/${courseDetails}/${course_id}`)
              }
            >
              <FontAwesomeIcon icon={faAngleLeft} /> Back to Course
            </a>
            <h2> {heading} </h2>
          </div>
          <div className="progress-bar-section">
            <div className="grey-bar">
              <div
                className="w3-grey"
                style={{ height: '4px', width: `${progress?.percentage}%` }}
              >
                {' '}
              </div>
            </div>
            {progress?.percentage} % Complete
            <span>
              {' '}
              {progress?.completed}/{progress?.total} Steps
            </span>
          </div>
          <div className="lms-lessions-list">
            {lessonsData?.map((item) => {
              return (
                <div
                  key={item.id}
                  className={
                    'bb-lesson-head ' +
                    (item.id === lessonsResult?.id ? 'routerActive ' : '') +
                    (item?.completed === 'completed' ? 'isActive' : '')
                  }
                >
                  {item.type === 'section-lesson' && (
                    <>
                      <Link
                        title={item.title}
                        href={`/lessons/${stringToSlug(item.title)}/${item.id}`}
                      >
                        {item.title.length > 35
                          ? item.title.slice(0, 35).concat('...')
                          : item.title}
                      </Link>
                      <span>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    </>
                  ) } 
                  
                  {item.type !== 'section-lesson' &&(
                    
                      <div style={{
                        padding: '15px 50px 15px 30px',
                      }}>
                        {item.title.length > 35
                          ? item.title.slice(0, 35).concat('...')
                          : item.title}
                      </div>
                    
                  )}
                </div>
              )
            })}
          </div>
          <div className="participants-section">
            <h4>
              Participants{' '}
              <span className="lms-count"> {participants?.enrolled_users}</span>
            </h4>
            <div className="course-members-list">
              {participants?.users?.map((item) => {
                return (
                  <div key={item.id}>
                    <Link
                      className="mr-1"
                      href={getProfileRoute(
                        item?.display_name,
                        item?.id,
                        'timeline',
                        'personal'
                      )}
                    >
                      <a>
                        <img src={item.avatar} alt="image" />
                        <span>{item.display_name}</span>
                      </a>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="learndash-page-content">
          <div className="ld-breadcrumbs">
            <a href="/"> {heading}</a>
            <a href="/">{lessonsResult && lessonsResult.title.rendered}</a>
          </div>
          <div className="lessons-tag">
            <div className="lessons-number-tag">
              LESSON {lessonsResult?.menu_order}{' '}
              <span>OF {progress?.total}</span>
            </div>
            <div className="lesson-progress-tag">
              {isComplete ? (
                <button
                  className={
                    isComplete
                      ? 'complete-btns'
                      : ''
                  }
                >
                  {isComplete
                    ? 'Complete'
                    : 'In Progress'}
                </button>
              ) : (
                <button
                  className={
                    !isComplete
                      ? 'progress-btn'
                      : ''
                  }
                >
                  In Progress
                </button>
              )}
            </div>
            {/* <button className="previous" onClick={() => setPrevoius()}> Previous</button>
            <button className="next" onClick={() => setNext()}> Next</button> */}
          </div>
          <div className="lms-header-title">
            {/* {!lessonsResult && (
              <Spinner
                style={{ width: "1.2rem", height: "1.2rem" }}
                color="primary"
              />
            )} */}

            {lessonsResult && <h1> {lessonsResult.title.rendered}</h1>}

            <div className="name-tag">
              {/* {!authorCourseList && (
                <Spinner
                  style={{ width: "1.2rem", height: "1.2rem" }}
                  color="primary"
                />
              )} */}
              {authorCourseList && (
                <>
                  <img src={authorCourseList?.avatar} alt="image" />
                  <a href="">{authorCourseList?.display_name} </a>
                </>
              )}

              <div className="bb-instructor-date">
                {moment(result?.date).format('MMMM DD, YYYY')}
              </div>
            </div>
          </div>

          <div
            target="_blank"
            className="video-section"
            dangerouslySetInnerHTML={{
              __html: lessonsResult?.content.rendered,
            }}
          ></div>

          {!isComplete && (
            <button 
            disabled={completedLoading}
            className="btn-tag" onClick={() =>  getUpdatevalue(id)}>
               {completedLoading ? <Loader /> : 'Mark Completed'}
            </button>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default courseLessions
