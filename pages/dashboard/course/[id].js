import React, { useContext, useState, useEffect } from 'react'
import Meta from '@components/layout/Meta'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { UserContext } from '@context/UserContext'
import { getCourseById, getCourseUsers } from '@request/dashboard'
import CourseDetail from '@components/dashboard/courses/CourseDetail'
import CourseDetailUsers from '@components/dashboard/courses/CourseDetailUsers'

const courseApi = `${process.env.courseUrl}/ldlms/v1/sfwd-courses`
const userUrl = `${process.env.apiURl}/learndash/sfwd-courses/`

function CourseDetailPage({ data }) {
  const { user } = useContext(UserContext)
  const [lessons, setLessons] = useState()

  const { id } = data
  const { token = null } = user?.token ? user : {}

  const { data: course } = useSWR(
    token ? [`${courseApi}/${id}?is_lessons=true`, token] : null,
    getCourseById
  )

  const { data: userData } = useSWR(
    course ? [`${userUrl}${course.id}/users`, token] : null,
    getCourseUsers
  )

  useEffect(() => {
    if (!course) return
    const { lessons_list } = course
    if (lessons_list.is_lessons) {
      let lessonsNumber = 0
      const newLessons = lessons_list.lessons.map((lesson) => {
        lesson.type !== 'section-heading' && lessonsNumber++
        return { ...lesson, number: lessonsNumber }
      })
      let sortLesson = newLessons.sort((a, b) => a.menu_order - b.menu_order)
      setLessons(sortLesson)
    }
  }, [course])

  return (
    <div>
      <Meta />
      <Head>
        <title>Course Detail</title>
      </Head>
      <div className="container  px-3 px-md-5 pt-5">
        <div className="d-flex align-items-center">
          <Link href={'/dashboard/courses'}>
            <a className="text-white">
              <span className="contain-icon">
                <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
              </span>
              <span className="back">Back to Courses</span>
            </a>
          </Link>
        </div>
        <div className="container container-80 pb-5 mt-5">
          <CourseDetail course={course} lessons={lessons}  />
          <CourseDetailUsers users={userData?.data} />
        </div>
      </div>
    </div>
  )
}

export default CourseDetailPage

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { data: { id } },
  }
}
