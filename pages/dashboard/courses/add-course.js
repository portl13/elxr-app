import React, { useContext, useState } from 'react'
import Meta from '@components/layout/Meta'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Link from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import dynamic from 'next/dynamic'
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
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import Builder from '../../../components/dashboard/courses/builder/Builder'
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";

// const Builder = dynamic(
//   import("../../../components/dashboard/courses/builder/Builder"),
//   {
//     ssr: false,
//     loading: () => <SpinnerLoader />,
//   }
// );

const urlLessons = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-lessons/`
const baseUrl = `${process.env.baseUrl}/wp-json/course-api/v1/course`
const categoriesUrl = `${baseUrl}/course-categories`
const tagsUrl = `${baseUrl}/course-tags`
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
  const [courseID, setCourseID] = useState(null)
  const [avatar, setAvatar] = useState(null)

  const [category, setCategory] = useState(null)
  const [tag, setTag] = useState(null)

  const [lessonList, setLessonList] = useState([])

  const formulario = useFormik({
    initialValues: {
      id: null,
      title: '',
      description: '',
      progression_disabled: 'off',
      disable_content_table: 'false',
      category: '',
      tag: '',
      price: 0,
      course_cover: '',
      subscriber_price: 0,
      course_video: '',
      short_description: '',
      featured_media: '',
      status: 'publish',
    },
    onSubmit: async (values) => createCourse(values),
    validationSchema: Yup.object({
      title: Yup.string().required('Name is required'),
      price: Yup.number().required('Price is required'),
      //subscriber_price: Yup.number().required('El presupuesto es requerido'),
      category: Yup.string(),
      //tag: Yup.string(),
      description: Yup.string().required('Description is required'),
      short_description: Yup.string().required('Short description is required'),
      //course_video: Yup.string().required('Video is required'),
    }),
  })

  const createSubscriptionProduct = async (user, data) => {
    const res = await genericFetchPost(urlProduct, user?.token, data)
    console.log('res---res', res)
    return res
  }

  const createProductLesson = (user, id) => {
    lessonList.forEach(async (l, k) => {
      const updateLesson = {
        menu_order: k + 1,
      }
      await genericFetchPost(`${urlLessons}${courseID}`, token, updateLesson)
    })
  }

  const createCourse = async (values) => {
    setLoading(true)

    if (formulario?.values?.id) {
      const data = {
        ...values,
        tag: String(values.tag),
        category: String(values.category),
        course_cover: String(values.course_cover),
        featured_media: String(values.featured_media),
        progression_disabled:
            values.progression_disabled === 'on',
        disable_content_table:
            values.disable_content_table === 'true',
        status: 'publish',
      }
      await genericFetchPost(`${baseUrl}/${courseID}`, token, data)
      await createProductLesson(user, id)
      alert.success('Course publish successfully', TIMEOUT)
      router.push(`/dashboard/courses`).then()
    } else {
      const data = {
        ...values,
        tag: String(values.tag),
        category: String(values.category),
        course_cover: String(values.course_cover),
        featured_media: String(values.featured_media),
        progression_disabled:
            values.progression_disabled === 'on',
        disable_content_table:
            values.disable_content_table === 'true',
      }

      try {
        const { id } = await genericFetchPost(`${baseUrl}/`, token, data)
        setCourseID(id)
        await formulario.setFieldValue('id', id)

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
        alert.success('Save Course to continue adding Lessons.', TIMEOUT)
        router.push(`/dashboard/courses/edit-course/${id}`).then()
      } catch (e) {
        alert.error(e.message, TIMEOUT)
      } finally {
        setLoading(false)
      }
    }
  }

  const { data: categories } = useSWRImmutable(
      token ? [categoriesUrl, token] : null,
      getCategories
  )

  const setCategoryValue = (value) => {
    setCategory(value)
    formulario.setFieldValue('category', value.value)
  }

  const { data: tags } = useSWRImmutable(
      token ? [tagsUrl, token] : null,
      getCategories
  )

  const setTagValue = (value) => {
    setTag(value)
    formulario.setFieldValue('tag', value.value)
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

  const handleSubmit = async (status) => {
    let statusTye = courseID ? 'publish' : 'draft'

    await formulario.setFieldValue('status', statusTye)
    await formulario.submitForm()
  }

  return (
      <MainLayout sidebar={<MainSidebar />} title={"Add New Course"}>
        <div className="position-relative pb-3 course-background">
          {loading && <BlockUi color={'var(--primary-color)'} />}
          <div className="container px-2 pb-5">
            <BackButton />
            <div className="container course-edit-container add-course">
              <div className="row">
                <div className="col-sm-12 col-lg-6">
                  <div className="row">
                    <div className="col-12">
                      <div className="contain-title">
                        <h1 className="create-communities-title">
                          CREATE COURSE
                        </h1>
                      </div>
                    </div>
                    {/* <div className="col-12 col-md-5">
                <CoursesUploadCover
                  onClick={selectAvatar}
                  cover={avatar}
                  url={avatar?.url}
                  reset={() => setAvatar(null)}
                  text="Upload Featured Image"
                />
              </div> */}
                    <div className="col-12">
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
                      tag={tag}
                      tags={tags ? tags : []}
                      setTagValue={setTagValue}
                      handleSubmit={handleSubmit}
                  />
                </div>
                <div className="col-sm-12 col-lg-6 builder-header-section">
                  <div className="row">
                    <div className="col-12">
                      <div className="contain-title">
                        <h1 className="create-communities-title">
                          LESSON BUILDER
                        </h1>
                      </div>
                    </div>
                    <div className="col-12 subhead">Introduction</div>
                  </div>
                  <Builder
                      user={user}
                      courseID={courseID}
                      setLessonList={setLessonList}
                  />
                </div>
                <div className="col-12 mb-4">
                  <div className="d-flex justify-content-end">
                    <div
                        onClick={() => router.push(`/dashboard/courses`)}
                        className="mr-3"
                    >
                      <button className="btn btn-border-primary-2  custom-cancel-btn main-page py-3">
                        Cancel
                      </button>
                    </div>
                    <div className="mr-3">
                      <button
                          onClick={handleSubmit}
                          type="submit"
                          className="btn btn-create custom-submit-btn py-3"
                      >
                        {courseID ? 'Save' : 'Save as draft'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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

export default AddCoursePage
