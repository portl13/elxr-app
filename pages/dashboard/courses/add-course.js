import React, { useContext, useState } from 'react'
import Meta from '@components/layout/Meta'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Link from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CourseForm from '@components/dashboard/courses/CourseForm'
import { UserContext } from '@context/UserContext'
import MediaLibrary from '@components/MediaLibrary/MediaLibrary'
import CoursesUploadCover from '@components/dashboard/courses/CoursesUploadCover'

function AddCoursePage() {
  const { user } = useContext(UserContext)
  const token = user?.token
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState('cover')
  const [cover, setCover] = useState(null)

  const formulario = useFormik({
    initialValues: {
      title: '',
      description: '',
      progression_disabled: false,
      category: '',
      tag: '',
      price: 0,
      disable_content_table: false,
      course_cover: '',
      subscriber_price: 0,
      course_video: '',
      short_description: '',
      featured_media: '',
    },
    onSubmit: (values) => {
      console.log(formulario.values)
    },

    validationSchema: Yup.object({
      title: Yup.string().required('El nombre es requerido'),
      price: Yup.number().required('El presupuesto es requerido'),
      subscriber_price: Yup.number().required('El presupuesto es requerido'),
      category: Yup.string(),
      tag: Yup.string(),
      description: Yup.string().required('La direccion es requerida'),
      short_description: Yup.string().required('La direccion es requerida'),
      course_video: Yup.string().required('La direccion es requerida'),
    }),
  })

  const setPrice = (value, field) => {
    if (!value) return
    formulario.setFieldValue(field, value)
  }

  const selectCover = () => {
    setImage('cover')
    setOpen(!open)
  }

  const selectVideo = (e) => {
    setImage('video')
    setOpen(!open)
  }

  const selectMedia = (media) => {
    if (image === 'cover') {
      formulario.setFieldValue('course_cover', media.id)
      setCover({ url: media.source_url })
    }
    if (image === 'video') {
      formulario.setFieldValue('course_video', media.source_url)
    }
  }

  return (
    <>
      <Meta />
      <Head>
        <title>ADD NEW COURSE</title>
      </Head>
      <div className="modal-full-scream">
        <div className="container px-3 px-md-5 pt-5">
          <div className="d-flex align-items-center">
            <Link href={'/dashboard/courses'}>
              <a className="text-white">
                <span className="contain-icon">
                  <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
                </span>
                <span className="back">Back</span>
              </a>
            </Link>
          </div>
          <div className="container container-80">
            <div className="row">
              <div className="col-12">
                <div className="contain-title">
                  <h1 className="create-communities-title">ADD NEW COURSE</h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-7">
                <CoursesUploadCover
                  onClick={selectCover}
                  cover={cover}
                  url={cover?.url}
                  reset={() => setCover(null)}
                  text="Upload Cover Image"
                />
              </div>
            </div>
            <CourseForm
              open={open}
              setOpen={setOpen}
              formCourse={formulario}
              setPrice={setPrice}
              selectVideo={selectVideo}
            />
          </div>
        </div>
      </div>
      {token && open && (
        <MediaLibrary
          token={token}
          show={open}
          onHide={() => setOpen(!open)}
          selectMedia={selectMedia}
          media_type={
            image === 'cover' || image === 'avatar' ? 'image' : 'video'
          }
        />
      )}
    </>
  )
}

export default AddCoursePage
