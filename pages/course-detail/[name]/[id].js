import React, { useContext, useEffect, useState } from 'react'
import { css } from '@emotion/core'
import moment from 'moment'
import Head from 'next/head'
import Layout from '../../../components/layout/Layout'
import {
  getAuthorDetail,
  getCourseContent,
  getCourseDetail,
} from '../../api/course/course.api'
import { UserContext } from '../../../context/UserContext'
import Link from 'next/link'
import { stringToSlug } from '../../../lib/stringToSlug'
import { useRouter } from 'next/router'

const courseDetailStyle = css`
  .course-detail-header {
    margin-left: -20px;
    margin-right: -20px;
    padding: 30px;
    background-size: cover;
    background-position: center;
    min-height: 360px;
    background-color: #a3a5a9;
    position: relative;
  }

  .course-detail-header::before{
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
  }

  .course-detail-header-container {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    z-index: 1;
    position: relative;
    @media (min-width: 1200px) {
      padding-right: 15px;
      padding-left: 15px;
      max-width: 1200px;
    }
  }
  .course-detail-header-left,
  .course-detail-title {
    color: var(--white-color);
  }
  .course-detail-title {
    font-size: 24px;
    color: inherit;
    line-height: 1.25;
    margin-bottom: 15px;
    font-weight: 600;
    @media (min-width: 768px) {
      font-size: 48px;
    }
  }
  .course-detail-description {
    margin-bottom: 20px;
    opacity: 0.8;
    font-size: 16px;
    letter-spacing: -0.24px;
    line-height: 27px;
  }
  .course-detail-header-left {
    @media (min-width: 768px) {
      padding-top: 70px;
    }
    @media (min-width: 992px) {
      width: calc(100% - 430px);
    }
  }
  .course-detail-view {
    display: block;
    margin-bottom: 35px;
    font-size: 15px;
    font-weight: 500;
  }
  .course-author-header-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    overflow: hidden;
  }
  .courses-lessons-panel {
    border-radius: 6px;
    margin: 1em 0;
    padding: 16px 15px;
    background-color: rgba(146, 164, 183, 0.05);
    cursor: pointer;
    position: relative;
  }
  .status-div {
    border: 2px solid #dedfe2;
    height: 22px;
    width: 22px;
    border-radius: 100%;
    display: inline-block;
    position: absolute;
    top: 18px;
    right: 15px;
    background: transparent;
  }
  .courses-lessons-panel.active {
    .courses-lessons-name {
      text-decoration: line-through;
    }
    .status-div {
      border-color: var(--primary-color);
      background-color: var(--primary-color);
    }
  }
  .progress-bar-section {
    background-color: rgba(146, 164, 183, 0.2);
    border-radius: 6px;
    padding: 0.5em 1em;
    display: flex;
  }
  .ld-progress-stats {
    color: #a3a5a9;
    font-size: 12px;
    padding-right: 20px;
  }
  .percentaje {
    font-size: 12px;
    font-weight: 700;
  }
  .course-detail-main {
    display: flex;
    flex-direction: column-reverse;
    padding: 30px 0;
    @media (min-width: 992px) {
      flex-direction: row;
      padding: 15px 0;
    }
  }
  .bb-learndash-content-wrap {
    width: 100%;
    @media (min-width: 992px) {
      padding-right: 8%;
    }
  }
  .bb-single-course-sidebar {
    @media (min-width: 992px) {
      max-width: 360px;
      flex: 0 0 42%;
      margin-left: auto;
      position: relative;
      z-index: 2;
    }
  }
  .course-card-enrolled {
    box-shadow: 0 32px 54px 0 rgb(0 0 0 / 10%);
    border-radius: 4px;
    overflow: hidden;
    @media (min-width: 992px) {
      position: sticky;
      top: calc(var(--header-height) + 3rem);
      margin-top: -422.75px;
    }
  }
  .bb-course-preview-content {
    padding: 0 30px;
    background-color: var(--dark-color);
  }
  .bb-course-title {
    font-size: 13px;
    color: var(--typo);
    letter-spacing: 0.5px;
    margin: 0;
    padding-bottom: 15px;
    text-transform: uppercase;
  }
  .bb-course-volume-list {
    list-style: none;
    margin: 0;
    padding: 0 0 30px;
  }
  .bb-course-volume-list-lesson {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 15px;
  }
  .bg-course-detail-url {
    background-size: cover;
    background-position: center;
  }
  .bb-button-wrap {
    .btn {
      width: 100%;
      border-radius: 100px;
    }
  }
  .course-price {
    font-size: 22px;
  }
`

function CourseDetail() {
  const { user } = useContext(UserContext)
  const router = useRouter()
  const [result, setCourseResult] = useState()
  const [courseContent, setContent] = useState([])
  const [show, setShow] = useState(false)
  const [coursePrice, setCoursePrice] = useState()
  const [loading, setLoading] = useState(false)
  const [enrolled, setEnrolled] = useState(false)
  const [authorId, setAuthorId] = useState()
  const [cover, setCover] = useState(null)
  const [courseProgress, setProgress] = useState()
  const [courseHeading, setCourseheading] = useState()
  const [nextLesson, setNextLesson] = useState(null)
  const [author, setAuthor] = useState({
    avatar: '',
    count_courses: 0,
    description: '',
    display_name: '',
    id: '',
  })

  const reference = React.useRef(null)
  const query = router.query
  const id = parseInt(query.id)

  const buyByStripe = () => {
    if (!user) {
      setShow(!show)
      return
    }

    setLoading(true)
    getCourseProduct(user, id)
      .then(({ data }) => {
        let productID = data.data
        addProduct({
          id: productID,
          quantity: 1,
          price: coursePrice,
          name: result?.title.rendered,
        })
        router.push('/cart')
      })
      .catch((e) => setLoading(false))
  }

  const fetchCourseDetails = (id) => {
    getCourseDetail(user, id).then(({ data }) => {
      let course = data
      setAuthorId(course.author)
      setCourseResult(course)

      setCourseheading(course.title.rendered)
      setProgress(course.progress)

      setCoursePrice(course.course_price)
      setEnrolled(course.enrolled)
      setCover(course.cover)
    })
  }

  const getCoursesContent = () => {
    getCourseContent(user, id)
      .then((res) => {
        let lesson = res.data.data
        let sortLesson = lesson.sort((a, b) => a.menu_order - b.menu_order)
        setContent(sortLesson)
      })
      .catch((err) => {
        console.log('error', err.response.data.message)
      })
  }

  const getAuthorLogo = () => {
    getAuthorDetail(user, id).then(({ data }) => {
      const authorData = data.data
      setAuthor({
        ...author,
        ...authorData,
      })
    })
  }

  useEffect(() => {
    if (id) {
      fetchCourseDetails(id)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      getCoursesContent(id)
    }
  }, [id])

  useEffect(() => {
    if (!authorId) return
    getAuthorLogo()
  }, [authorId])

  useEffect(() => {
    const lessons = courseContent.map((item) => item)
    if (lessons) {
      localStorage.setItem('course-content', JSON.stringify(lessons))
    }
  }, [courseContent])

  useEffect(() => {
    if (!courseContent) return;
    setNextLesson(courseContent.find(lesson => lesson.type === 'section-lesson'))
  }, [courseContent])
  

  useEffect(() => {
    let d = {
      courseHeading,
      courseProgress,
    }
    localStorage.setItem('course-progress', JSON.stringify(d))
  }, [courseProgress, courseHeading])

  return (
    <Layout>
      <Head>
        <title>WeShare | Course</title>
      </Head>
      <div
        css={courseDetailStyle}
        className="courses-detail-wrapper bg-black bd-radius"
      >
        <section
          style={{
            backgroundImage: `url(${cover})`,
          }}
          className="course-detail-header"
        >
          <div className="course-detail-header-container">
            <div className="course-detail-header-left">
              <h1 className="course-detail-title">{result?.title.rendered}</h1>

              <div
                dangerouslySetInnerHTML={{ __html: result?.content.rendered }}
                className="course-detail-description"
              />

              <span className="course-detail-view">View Course details </span>
              <div className="course-author-header d-flex align-items-center">
                <div className="course-author-header-avatar">
                  <img
                    src={author?.avatar}
                    alt="avatar"
                  />
                </div>
                <div className="course-author-header-text ml-4">
                  {author?.display_name} ·{' '}
                  {moment(result?.date).format('MMMM DD, YYYY')}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="course-detail-main">
          <div className="bb-learndash-content-wrap">
            {enrolled && (
              <div className="progress-bar-section mt-4">
                {(result?.progress.percentage !== 0 ||
                  result?.course_price_type === 'open') && (
                  <>
                    <div className="completed-panel ld-progress-stats">
                      <span className="percentaje d-block">
                        {result?.progress.percentage} % Complete
                      </span>

                      {(result?.course_price_type !== 'open' ||
                        result?.course_price_type !== 'closed' ||
                        result?.course_status === 'Completed') && (
                        <span className="d-block my-1">
                          Last activity on{' '}
                          {moment(result?.modified).format('MMMM DD, YYYY')}
                        </span>
                      )}
                      {result?.course_status !== 'Completed' && (
                        <span className="d-block">
                          {' '}
                          {result?.progress.completed}/{result?.progress.total}{' '}
                          Steps
                        </span>
                      )}
                    </div>
                    <div className="grey-bar">
                      <div
                        className="w3-grey"
                        style={{
                          height: '4px',
                          width: `${result?.progress.percentage}%`,
                        }}
                      >
                        {' '}
                      </div>
                    </div>
                    {result?.course_status === 'Completed' && (
                      <>
                        <div
                          className={
                            result?.course_status === 'Completed'
                              ? 'complete-btn'
                              : ''
                          }
                        >
                          {' '}
                          Complete{' '}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: result?.content.rendered }}
              className="course-detail-main-description my-5"
            />
            <div className="ld-item-list">
              {courseContent?.map((item) => {
                return (
                  <p
                    key={item.id}
                    className={
                      item?.completed === 'completed'
                        ? 'courses-lessons-panel active'
                        : 'courses-lessons-panel'
                    }
                  >
                    {!enrolled ? (
                      <Link
                        href={`/lessons/${stringToSlug(item.title)}/${item.id}`}
                      >
                        <a className="courses-lessons-name">{item.title}</a>
                      </Link>
                    ) : (
                      <span className="courses-lessons-name">{item.title}</span>
                    )}

                    {item.type !== 'section-heading' && (
                      <span className="status-div"></span>
                    )}
                  </p>
                )
              })}
            </div>
          </div>
          <div className="bb-single-course-sidebar">
            <div className="course-card-enrolled">
              <div
                style={{
                  backgroundImage: `url(${result?.course_img})`,
                }}
                className="ratio ratio-16x9 bg-default bg-course-detail-url"
              ></div>
              <div className="bb-course-preview-content">
                {/* <div className="bb-course-member-wrap flex align-items-center">
                  <span className="bb-course-members"> </span>
                  <span className="members">
                    <span className="members-count-g">+1 </span>enrolled{' '}
                  </span>{' '}
                </div> */}
                <div className="bb-button-wrap pt-4">
                  {result?.course_status === 'not enrolled' &&
                    result?.course_price !== '' && (
                      <>
                        <div className="enroll-btn btn btn-primary mb-2">
                          NOT ENROLLED
                        </div>
                        <div
                          css={{
                            borderRadius: '100px',
                            width: '100%',
                          }}
                          onClick={() => buyByStripe()}
                          className={`btn btn-primary pointer ${
                            result?.course_price_type === 'buynow'
                              ? 'course-btn'
                              : ''
                          }`}
                        >
                          Take this course {loading && <Loader />}
                        </div>
                      </>
                    )}

                  {result?.course_status === 'Not Started' && (
                    <>
                      <div
                        onClick={() =>
                          router.push(
                            `/lessons/${stringToSlug(nextLesson.title)}/${
                              nextLesson.id
                            }`
                          )
                        }
                        className={`btn btn-success mb-2 ${
                          result?.course_status === 'Not Started'
                            ? 'continue-btn'
                            : ''
                        }`}
                      >
                        {' '}
                        Start Course{' '}
                      </div>
                      <div
                        className="progress-btn btn btn-primary"
                        onClick={() =>
                          router.push(
                            `/lessons/${stringToSlug(nextLesson.title)}/${
                              nextLesson.id
                            }`
                          )
                        }
                      >
                        {' '}
                        Open Registration
                      </div>
                    </>
                  )}
                  {result?.course_status === 'In Progress' &&
                    result?.course_price_type === 'closed' && (
                      <div className="enroll-btn btn btn-primary mb-2">
                        {' '}
                        In Progress{' '}
                      </div>
                    )}

                  {result?.course_status === 'In Progress' && (
                    <div
                      className="continue-btn btn btn-primary"
                      onClick={() =>
                        router.push(
                          `/lessons/${stringToSlug(nextLesson.title)}/${
                            nextLesson.id
                          }`
                        )
                      }
                    >
                      {' '}
                      Continue{' '}
                    </div>
                  )}
                  {result?.course_status === 'Completed' && (
                    <>
                      <div
                        className={`btn btn-primary mb-2 ${
                          result?.course_status === 'Completed'
                            ? 'complete-btn'
                            : ''
                        }`}
                        onClick={() =>
                          router.push(
                            `/lessons/${stringToSlug(nextLesson.title)}/${
                              nextLesson.id
                            }`
                          )
                        }
                      >
                        {' '}
                        Complete{' '}
                      </div>
                      <div
                        className="btn btn-success"
                        onClick={() =>
                          router.push(
                            `/lessons/${stringToSlug(nextLesson.title)}/${
                              nextLesson.id
                            }`
                          )
                        }
                      >
                        {' '}
                        Open Registration
                      </div>
                    </>
                  )}
                </div>
                {show && !user && (
                  <div className="mt-4">
                    <Link href={'/login'}>
                      <a className="btn btn-primary w-100">Sign In</a>
                    </Link>
                    <span className="d-block my-1 text-center">OR</span>
                    <Link href={'/signup'}>
                      <a className="btn btn-secondary  w-100 mb-3">Sign Up</a>
                    </Link>
                  </div>
                )}
                {result?.course_price !== '' && !enrolled && (
                  <p className="course-price text-center mt-2">
                    {' '}
                    ${result?.course_price}{' '}
                  </p>
                )}
                <div className="bb-course-volume mt-4">
                  <h4 className="bb-course-title">Course Includes</h4>
                  <ul className="bb-course-volume-list">
                    <li className="bb-course-volume-list-lesson">
                      {result && result?.progress.total} Lessons{' '}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default CourseDetail
