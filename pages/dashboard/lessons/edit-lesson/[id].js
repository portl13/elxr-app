import LessonEditorForm from '@components/dashboard/lessons/LessonEditorForm'
import Meta from '@components/layout/Meta'
import { UserContext } from '@context/UserContext'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormik } from 'formik'
import Head from 'next/head'
import useSWRImmutable from 'swr/immutable'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup'
import { genericFetch, genericFetchPost } from '@request/dashboard'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '@utils/constant'

const urlLessons = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-lessons/`
const courseApi = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/lessons`

function LessonEditor({ id }) {
  const alert = useAlert()
  const router = useRouter()
  const { user } = useContext(UserContext)
  const [courseID, setCourseID] = useState(null)
  const [loading, setLoading] = useState(false)
  const token = user?.token

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '<p></p>',
    },
    onSubmit: async (values) => updateLesson(values),
    validationSchema: Yup.object({
      title: Yup.string().required('the title is required'),
    }),
  })

  const updateLesson = async (values) => {
    setLoading(true)
    try {
      await genericFetchPost(`${urlLessons}${id}`, token, values)
      alert.success('Update Lesson Successful', TIMEOUT)
    } catch (error) {
      alert.error('Update Lesson Failed', TIMEOUT)
    } finally {
      setLoading(false)
    }
  }

  const { data: lesson } = useSWRImmutable(
    token ? [`${courseApi}/${id}/`, token] : null,
    genericFetch
  )

  useEffect(() => {
    if (lesson) {
      formik.setFieldValue('title', lesson.title.rendered)
      if (lesson.content.rendered !== '') {
        formik.setFieldValue('content', lesson.content.rendered)
      }
      setCourseID(lesson.course)
    }
  }, [lesson])

  const redirectCourse = () => {
    router.push(`/dashboard/courses/edit-course/${courseID}`)
  }

  return (
    <>
      <Meta />
      <Head>
        <title>LESSON EDITOR</title>
      </Head>
      <div className="modal-full-scream">
        <div className="container px-3 px-md-5 pt-5">
          <div className="d-flex align-items-center pointer">
            <span onClick={() => router.back()} className="text-white">
              <span className="contain-icon">
                <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
              </span>
              <span className="back">Back</span>
            </span>
          </div>
          <div className="container container-80">
            <div className="row">
              <div className="col-12">
                <div className="contain-title">
                  <h1 className="create-communities-title">LESSON EDITOR</h1>
                </div>
              </div>
            </div>
            <LessonEditorForm
              redirectCourse={redirectCourse}
              formik={formik}
              lesson={lesson}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default LessonEditor

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { id },
  }
}
