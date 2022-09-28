import React, { useContext, useState, useEffect } from 'react'
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
import { TIMEOUT } from '@utils/constant'
import { useRouter } from 'next/router'
import { useAlert } from 'react-alert'
import { updateSubscription } from '@api/channel.api'
import MainSidebar from "@components/main/MainSidebar";
import MainLayout from "@components/main/MainLayout";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";

const baseUrl = `${process.env.baseUrl}/wp-json/course-api/v1/course`
const categoriesUrl = `${baseUrl}/course-categories`

const courseUrl = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-courses`

function EditCoursePage({ data }) {
  const router = useRouter()
  const alert = useAlert()
  const { id: courseID } = data
  const { user } = useContext(UserContext)
  const token = user?.token
  const [loading, setLoading] = useState(true)
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
    onSubmit: async (values) => updateCourse(values),
    validationSchema: Yup.object({
      title: Yup.string().required('Name is required'),
      price: Yup.number().required('Price is required'),
      category: Yup.string(),
      description: Yup.string().required('Description is required'),
      short_description: Yup.string().required('Short description is required')
    }),
  })



  const updateCourse = async (values) => {
    setLoading(true)

    const data = {
      ...values,
      category: String(values.category),
      course_cover: String(values.course_cover),
      featured_media: String(values.featured_media),
      progression_disabled: values.progression_disabled === 'on',
      disable_content_table: values.disable_content_table === 'true',
    }

    try {
      await genericFetchPost(`${baseUrl}/${courseID}`, token, data)
      alert.success('Course Updated successfully', TIMEOUT)
      await router.push(`/manage/courses`)
    } catch (e) {
      alert.error(e.message, TIMEOUT)
    } finally {
      setLoading(false)
    }
  }

  const { data: course } = useSWRImmutable(
    token ? [`${courseUrl}/${courseID}`, token] : null,
    getCategories
  )

  const { data: categories } = useSWRImmutable(
    token ? [categoriesUrl, token] : null,
    getCategories
  )

  const setCategoryValue = (value) => {
    setCategory(value)
    formulario.setFieldValue('category', value.value)
  }

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

  useEffect(() => {
    if (course) {
      setLoading(false)
      formulario.setFieldValue('title', course.title.rendered)
      formulario.setFieldValue('description', course.content.rendered)
      formulario.setFieldValue('short_description', course.short_description)
      formulario.setFieldValue('price', course.price_type_closed_price)
      formulario.setFieldValue('featured_media', course.featured_media)
      formulario.setFieldValue('course_cover', course.course_cover_photo)

      formulario.setFieldValue(
        'disable_content_table',
        course.disable_content_table === true ? 'true' : 'false'
      )
      formulario.setFieldValue(
        'progression_disabled',
        course.progression_disabled === true ? 'on' : 'off'
      )

      if(course.course_video){
        formulario.setFieldValue('course_video', course.course_video)
      }

      setAvatar({ url: course.course_img })
      setCover({ url: course.cover })
    }
  }, [course])

  useEffect(() => {
    if (categories) {
      const category = categories.find(
        (category) => category.value === course?.ld_course_category[0]
      )
      if (!category) return
      setCategory(category)
      formulario.setFieldValue('category', course?.ld_course_category[0])
    }
  }, [categories])

  const handleSubmit = (status) => {
    formulario.setFieldValue('status', status)
    formulario.submitForm()
  }

  return (
      <MainLayout title="Create Course" sidebar={<MainSidebar />}>
      <div className="position-relative pb-3">
        {loading && <BlockUi color={'var(--primary-color)'} />}
        <div className="container px-3">
          <BackButton />
          <div className="container container-80">
            <div className="my-5">
              <ListNavItem
                  data={{
                    title: "Edit a Course",
                    icon: "/img/icon-movil/purchases-menu/courses.svg",
                    type: "heading",
                  }}
              />
            </div>
            <div className="row">
              <div className="col-12 col-md-5 mb-4 mb-md-0">
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
              setCategoryValue={setCategoryValue}
              handleSubmit={handleSubmit}
              updated={true}
              courseID={courseID}  
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
    </MainLayout>
  )
}

export default EditCoursePage

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { data: { id } },
  }
}
