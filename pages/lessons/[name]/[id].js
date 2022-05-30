import React, { useState, useContext, useEffect, useRef } from 'react'
import Layout from '../../../components/layout/Layout'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../../context/UserContext'
import {
  getCourseAuthor,
  courseStatusUpdate,
  getLessions,
  getParticipantsList,
} from '../../api/course/course.api'
import { Spinner } from 'reactstrap'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import { getProfileRoute } from '../../../utils/constant'
import { stringToSlug } from '../../../lib/stringToSlug'
import { css } from '@emotion/core'
import Loader from '../../../components/loader'

import parse, { attributesToProps } from 'html-react-parser'

const topicStyle = css`
  position: fixed;
  .lms-topic-sidebar-data,
  .learndash-page-content {
    overflow-y: scroll;
    height: 100vh;
    padding-bottom: 3rem;
  }
  .lms-topic-sidebar-data {
    padding: 15px 0;
    font-size: 15px;
    position: relative;
    flex-direction: column;
    left: 0;
    -webkit-transition: left 0.2s ease;
    transition: left 0.2s ease;
    width: 370px;
    overflow: auto;
    z-index: 0;
    display: none;
    @media (min-width: 992px) {
      display: flex;
    }
    .lms-lessions-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      .list-section-heading {
        padding: 5px 30px 5px 25px;
        display: flex;
        font-size: 14px;
        color: var(--typo);
        font-weight: 500;
        margin: 10px 0;
      }
      .bb-lesson-head {
        color: var(--typo);
        align-items: center;
        letter-spacing: -0.24px;
        margin-bottom: 1px;
        display: flex;
        width: 100%;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        cursor: pointer;
        a {
          color: var(--typo);
          padding: 15px 50px 15px 30px;
          width: 100%;
          display: flex;
        }
        &:before {
          display: none;
        }
        &.routerActive {
          background: var(--bg);
        }
        &.isActive {
          text-decoration: line-through;
          a {
            color: var(--primary-color);
            text-decoration: line-through;
          }
          span {
            background: var(--primary-color);
            border: 2px solid var(--primary-color);
            svg {
              width: 11px;
              color: #ffffff;
            }
          }
        }
        &:hover {
          a {
            background: var(--bg);
            color: var(--primary-color);
          }
        }
        span {
          border-radius: 50%;
          border: 2px solid #dedfe2;
          position: absolute;
          background: transparent;
          top: 15px;
          right: 30px;
          width: 22px;
          height: 22px;
          justify-content: center;
          align-items: center;
          display: flex;
          svg {
            width: 11px;
            color: #1c1c1c;
          }
        }
      }
    }
    .participants-section {
      width: 100%;
      display: flex;
      padding: 25px 0;
      margin: 25px 0 0 0;
      border-top: 1px solid #000000;
      flex-direction: column;
      .course-members-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0 30px;
        a {
          color: var(--typo);
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          margin: 0 0 12px 0;
          &:hover {
            color: var(--primary-color);
          }
          img {
            width: 28px;
            height: 28px;
            display: flex;
            border-radius: 100px;
            margin-right: 10px;
          }
          span {
            width: calc(100% - 28px);
            display: flex;
            padding: 0;
            font-size: 12px;
          }
        }
      }
      h4 {
        font-size: 15px;
        letter-spacing: 0.6px;
        display: flex;
        align-items: center;
        margin: 0 30px 15px;
        justify-content: space-between;
        .lms-count {
          background-color: rgba(0, 0, 0, 0.03);
          border-radius: 100px;
          font-weight: 500;
          font-size: 11px;
          padding: 0 6px;
          font-size: 11px;
          height: 20px;
          line-height: 20px;
        }
      }
    }
    .progress-bar-section {
      font-size: 12px;
      font-weight: 500;
      line-height: 1;
      letter-spacing: -0.24px;
      color: #a3a5a9;
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 0 0 10px 0;
      padding: 0 30px 25px 30px;
      border-bottom: 1px solid #000000;
      span {
        margin: 5px 0 0 0;
      }
      .grey-bar {
        width: 100%;
        display: flex;
        background: #efefef;
        height: 4px;
        position: relative;
        margin: 0 0 10px 0;
        .w3-grey {
          background: var(--primary-color);
        }
      }
    }
    .ld-course-navigation {
      margin: 15px 30px;
      display: flex;
      flex-direction: column;
      h2 {
        font-size: 14px;
        margin: 0;
        color: var(--typo);
      }
      a {
        color: var(--typo);
        display: flex;
        border-radius: 20px;
        padding: 1px 15px 1px 0;
        font-size: 12px;
        margin: 0 0 15px;
        align-items: center;
        svg {
          width: 7px;
          color: var(--typo);
          margin-right: 3px;
        }
      }
    }
  }
  .learndash-page-content {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    .ratio > * {
      height: 100%;
    }
    @media (min-width: 992px) {
      width: calc(100% - 370px);
      padding: 30px 100px 0;
    }

    .video-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      img {
        width: 100%;
        height: 100%;
      }
      video {
        width: 100%;
        height: 100%;
      }
    }
    .btn-tag {
      background-color: var(--primary-color);
      border: 1px solid var(--primary-color);
      font-weight: 400;
      font-size: 12px;
      border-radius: 100px;
      height: 30px;
      line-height: 30px;
      padding: 0 12px;
      color: #ffffff;
      display: flex;
      outline: 0;
      justify-content: center;
      align-items: center;
      margin: 30px 0;
      width: 137px;
    }
    .lms-header-title {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 30px 0 30px 0;
      h1 {
        font-size: 32px;
        line-height: 1.2;
        margin-bottom: 30px;
        color: var(--typo);
      }
      .name-tag {
        width: auto;
        display: flex;
        align-items: center;
        img {
          width: 32px;
          height: 32px;
          margin-right: 15px;
          border-radius: 100px;
        }
        .bb-instructor-date {
          color: #a3a5a9;
          margin-left: 7px;
          font-weight: 400;
          font-size: 15px;
          line-height: 1;
          &:before {
            background-color: #a3a5a9;
            content: '';
            display: inline-block;
            width: 4px;
            height: 4px;
            border-radius: 100%;
            margin-right: 10px;
            position: relative;
            bottom: 2px;
          }
        }
        a {
          font-weight: 400;
          font-size: 15px;
          color: var(--typo);
          &:hover {
            color: var(--primary-color);
          }
        }
      }
    }
    .lessons-tag {
      width: 100%;
      display: flex;
      margin: 30px 0 0 0;
      align-items: center;
      .lesson-progress-tag {
        width: auto;
        display: flex;
        .progress-btn {
          background-color: var(--primary-color);
          border: 1px solid var(--primary-color);
          font-weight: 400;
          font-size: 12px;
          border-radius: 100px;
          height: 30px;
          line-height: 30px;
          padding: 0 12px;
          color: #ffffff;
          display: flex;
          outline: 0;
          justify-content: center;
          align-items: center;
          cursor: text;
        }
        .complete-btns {
          background-color: #1cd991;
          border: 1px solid #1cd991;
          font-weight: 400;
          font-size: 12px;
          border-radius: 100px;
          height: 30px;
          line-height: 30px;
          padding: 0 12px;
          color: #ffffff;
          display: flex;
          outline: 0;
          justify-content: center;
          align-items: center;
          cursor: text;
        }
      }
      .lessons-number-tag {
        width: auto;
        display: flex;
        font-size: 13px;
        display: block;
        line-height: 1;
        text-transform: uppercase;
        font-weight: 500;
        span {
          font-weight: normal;
        }
      }
    }
    .ld-breadcrumbs {
      background-color: var(--dark-color);
      border-bottom: 1px solid var(--typo);
      display: flex;
      width: 100%;
      align-items: center;
      font-size: 0.75em;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 10px 10px;
      a {
        color: var(--typo);
        cursor: pointer;
        padding: 0 5px 0 0;
        &::after {
          content: '';
          border: solid var(--typo);
          border-width: 0 1px 1px 0;
          display: inline-block;
          padding: 2px;
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
          margin: 0 10px 0 10px;
        }
      }
    }
  }
  .btn-navigation {
    background-color: var(--primary-color);
    color: var(--typo);
    font-weight: 400;
    font-size: 12px;
    border-radius: 100px;
    height: 30px;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }
`

const courseLessions = () => {
  const { user } = useContext(UserContext)
  const [authorCourseList, setAuthorCourse] = useState()
  const [lessonsData, setlessonsData] = useState()
  const [lessonsResult, setLessonresult] = useState()
  const [progress, setProgress] = useState()
  const [heading, setHeading] = useState()
  const [isComplete, setComplete] = useState(false)
  const [participants, setParticipantslist] = useState()
  const [completedLoading, setCompletedLoading] = useState(false)

  const pdf = useRef(null)
 
  const [nextLesson, setNextLesson] = useState(null)
  const [prevLesson, setPrevLesson] = useState(null)

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
    getLessions(user, id).then(({ data: lesson }) => {
      setLessonresult(lesson)
      setComplete(lesson.completed === 'completed')
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
    courseStatusUpdate(user, id)
      .then((res) => {
        setComplete(true)
      })
      .catch(() => {})
      .finally(() => setCompletedLoading(false))

    markCompleted(id)
  }

  const markCompleted = (id) => {
    let lessonsUpdate = lessonsData.map((lesson) => {
      if (lesson.id === id) {
        lesson.completed = 'completed'
      }
      return lesson
    })

    setlessonsData(lessonsUpdate)
    localStorage.setItem('course-content', JSON.stringify(lessonsUpdate))
  }

  useEffect(() => {
    if (lessonsData && lessonsResult) {
      let lessons = lessonsData.filter(
        (lesson) => lesson.type === 'section-lesson'
      )

      for (let i = 0; i < lessons.length; i++) {
        const lesson = lessons[i]
        if (lesson.id === lessonsResult.id) {
          setPrevLesson(lessons[i - 1])
          setNextLesson(lessons[i + 1])
        }
      }
    }
  }, [lessonsData, lessonsResult])

  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.name === 'iframe') {
        const props = attributesToProps(domNode.attribs)
        return (
          <div className="ratio ratio-16x9">
            <iframe {...props} />
          </div>
        )
      }
      if (
        domNode.attribs &&
        domNode.name === 'object' &&
        domNode.attribs.type === 'application/pdf'
      ) {
        const props = attributesToProps(domNode.attribs)
        pdf.current = props.data
        return <object {...props} />
      }
    },
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
      <div css={topicStyle} className="lesson-section  bg-black bd-radius">
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
                  )}

                  {item.type !== 'section-lesson' && (
                    <div
                      style={{
                        padding: '15px 50px 15px 30px',
                      }}
                    >
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
            <a href="/">{lessonsResult && lessonsResult?.title?.rendered}</a>
          </div>
          <div className="lessons-tag">
            <div className="lessons-number-tag mr-auto">
              LESSON {lessonsResult?.menu_order}{' '}
              <span>OF {progress?.total}</span>
            </div>
            <div className="lesson-progress-tag mr-5">
              {isComplete ? (
                <button className={isComplete ? 'complete-btns' : ''}>
                  {isComplete ? 'Complete' : 'In Progress'}
                </button>
              ) : (
                <button className={!isComplete ? 'progress-btn' : ''}>
                  In Progress
                </button>
              )}
            </div>
            {prevLesson && (
              <Link
                href={`/lessons/${stringToSlug(prevLesson?.title)}/${
                  prevLesson?.id
                }`}
              >
                <a className="previous btn btn-navigation"> Previous</a>
              </Link>
            )}
            {nextLesson && (
              <Link
                href={`/lessons/${stringToSlug(nextLesson?.title)}/${
                  nextLesson?.id
                }`}
              >
                <a className="next btn btn-navigation"> Next</a>
              </Link>
            )}
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

              <div className="bb-instructor-date"></div>
            </div>
          </div>

          <div className="video-section">
            {lessonsResult?.content.rendered &&
              parse(lessonsResult?.content.rendered, options)}
          </div>

          {!isComplete && (
            <button
              disabled={completedLoading}
              className="btn-tag"
              onClick={() => getUpdatevalue(id)}
            >
              {completedLoading ? <Loader /> : 'Mark Completed'}
            </button>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default courseLessions
