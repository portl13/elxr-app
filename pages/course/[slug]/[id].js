import React, { useState } from 'react'
import CourseDetail from '@components/dashboard/courses/CourseDetail'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import Head from 'next/head'
import useSWR from 'swr'
import { getFetchPublic } from '@request/creator'
import { useEffect } from 'react'

const courseApi = `${process.env.courseUrl}/ldlms/v1/sfwd-courses`

function PageCourseDetail({ id }) {

    const [lessons, setLessons] = useState()
   
  
    const { data: course } = useSWR(`${courseApi}/${id}?is_lessons=true`,
    getFetchPublic
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
    <>
    <Head>
        <title>Course Detail</title>
    </Head>
    <MainLayout
      sidebar={<MainSidebar />}
    >
        <CourseDetail course={course} lessons={lessons} />
    </MainLayout>
    </>
  )
}

export default PageCourseDetail

export async function getServerSideProps({ query }) {
    const { id } = query
    return {
      props: { id },
    }
}
  