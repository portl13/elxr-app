import React, { useContext, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import InputDashForm from '@components/shared/form/InputDashForm'
import { UserContext } from '@context/UserContext'
import useSWRImmutable from 'swr/immutable'
import { genericFetch } from '@request/dashboard'
import Link from 'next/link'

const Builder = dynamic(import('./builder/Builder'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const courseUrl = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-courses`

function LessonBuilderForm({ id }) {
  const { user } = useContext(UserContext)
  const [titleCourse, setTitleCourse] = useState('')
  const token = user?.token

  const { data: course } = useSWRImmutable(
    token ? [`${courseUrl}/${id}`, token] : null,
    genericFetch
  )

  useEffect(() => {
    if (course) {
      setTitleCourse(course.title.rendered)
    }
  }, [course])

  return (
    <div>
      <div className="row">
        <form className="col-12 col-md-9 mt-3 mt-md-0">
          <InputDashForm
            required={false}
            readOnly={true}
            type="text"
            name="title"
            value={titleCourse}
            label="Course Title"
          />
        </form>
        <div className=" col-12 col-md-3 mt-md-0 d-flex">
          <Link href={`/dashboard/courses/edit-course/${id}`}>
            <a className="w-100 btn btn-create px-4 py-3">Course Settings</a>
          </Link>
        </div>
      </div>
      <Builder user={user} courseID={id} />
    </div>
  )
}

export default LessonBuilderForm
