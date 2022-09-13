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
import useSWRImmutable from 'swr/immutable'
import { genericFetchPost, getCategories } from '@request/dashboard'
import BlockUi from '@components/ui/blockui/BlockUi'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '@utils/constant'
import { useRouter } from 'next/router'

const baseUrl = `${process.env.baseUrl}/wp-json/course-api/v1/course`
const categoriesUrl = `${baseUrl}/course-categories`
const urlProduct = `${process.env.woocomApi}/products`

function AddCoursePage() {
  const router = useRouter()
  const alert = useAlert()
  const { user } = useContext(UserContext)
  const token = user?.token
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState('cover')
  const [cover, setCover] = useState(null)
  const [avatar, setAvatar] = useState(null)

  const [category, setCategory] = useState(null)

  const formulario = useFormik({
    initialValues: {
      title: '',
      description: '',
      progression_disabled: 'off',
      disable_content_table: 'false',
      category: '',
      price: 0,
      course_cover: '',
      course_video: '',
      short_description: '',
      featured_media: '',
      status: 'publish',
    },
    onSubmit: async (values) => createCourse(values),
    validationSchema: Yup.object({
      title: Yup.string().required('Name is required'),
      price: Yup.number().required('Price is required'),
      category: Yup.string(),
      description: Yup.string().required('Description is required'),
      short_description: Yup.string().required('Short description is required'),
      //course_video: Yup.string().required('Video is required'),
    }),
  })

  const createSubscriptionProduct = async (user, data) => {
    const res = await genericFetchPost(urlProduct, user?.token, data)
    return res.data
  }

  const createCourse = async (values) => {
    setLoading(true)

    const data = {
      ...values,
      category: String(values.category),
      course_cover: String(values.course_cover),
      featured_media: String(values.featured_media),
      progression_disabled: values.progression_disabled === 'on' ? true : false,
      disable_content_table:
        values.disable_content_table === 'true' ? true : false,
    }

    try {
      const { id } = await genericFetchPost(`${baseUrl}/`, token, data)

      const product = {
        name: values.title,
        regular_price: values.price,
        description: values.description,
        type: 'course',
        virtual: true,
        images: [],
        meta_data: [
          {
            key: '_related_course',
            value: [id],
          },
        ],
      }

      await createSubscriptionProduct(user, product)
      alert.success('Course created successfully', TIMEOUT)
      router.push(`/dashboard/courses/`)
    } catch (e) {
      alert.error(e.message, TIMEOUT)
    } finally {
      setLoading(false)
    }
  }

  const { data: categories } = useSWRImmutable(
    token ? [categoriesUrl, token] : null,
    getCategories
  )



  const setPrice = (value, field) => {
    if (typeof value === 'string') {
      formulario.setFieldValue(field, value)
      return
    }
    formulario.setFieldValue(field, 0)
  }

  const selectCover = () => {
    setImage('cover')
    setOpen(!open)
  }
  const selectAvatar = () => {
    setImage('avatar')
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
    if (image === 'avatar') {
      formulario.setFieldValue('featured_media', media.id)
      setAvatar({ url: media.source_url })
    }
  }

  const handleSubmit = (status) => {
    formulario.setFieldValue('status', status)
    formulario.submitForm()
  }

  return (
    <>
      <Meta />
      <Head>
        <title>ADD NEW COURSE</title>
      </Head>
      <div className="modal-full-scream position-relative pb-3">
        {loading && <BlockUi color={'var(--primary-color)'} />}
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
              <div className="col-12 col-md-5">
                <CoursesUploadCover
                  onClick={selectAvatar}
                  cover={avatar}
                  url={avatar?.url}
                  reset={() => setAvatar(null)}
                  text="Upload Featured Image"
                />
              </div>
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
              category={category}
              categories={categories ? categories : []}
              handleSubmit={handleSubmit}
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
