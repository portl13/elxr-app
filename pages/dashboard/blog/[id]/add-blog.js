import React, { useContext, useEffect, useState } from 'react'
import Meta from '@components/layout/Meta'
import BlockUi from '@components/ui/blockui/BlockUi'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import BlogForm from '@components/dashboard/blogs/BlogForm'
import Link from 'next/link'
import { UserContext } from '@context/UserContext'
import { useRouter } from 'next/router'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '@utils/constant'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useSWRImmutable from 'swr/immutable'
import { genericFetchPost, getCategories } from '@request/dashboard'
import CoursesUploadCover from '@components/dashboard/courses/CoursesUploadCover'
import MediaLibrary from '@components/MediaLibrary/MediaLibrary'

const baseUrl = `${process.env.apiV2}/blogs`

function AddBlog({ id }) {
  const { user } = useContext(UserContext)
  const router = useRouter()
  const alert = useAlert()
  const token = user?.token
  const [isSaving, setIsSaving] = useState(false)

  const [open, setOpen] = useState(false)
  const [cover, setCover] = useState(null)

  const [category, setCategory] = useState(null)
  const [tags, setTags] = useState([])

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      thumbnail: '',
      category: '',
      tags: [],
      type: 'open',
      status: 'publish',
    },
    onSubmit: async (values) => createBlog(values),
    validationSchema: Yup.object({
      title: Yup.string().required('title is required'),
      content: Yup.string().required('content is required'),
      category: Yup.string().required('category is required'),
    }),
  })

  const createBlog = async (values) => {
    setIsSaving(true)
    const data = {
      ...values,
      channel_id: id,
    }
    try {
      await genericFetchPost(`${baseUrl}`, token, data)
      alert.show('Blog created successfully', {
        timeout: TIMEOUT,
        type: 'success',
      })
      router.push('/dashboard/blogs')
    } catch (error) {
      alert.show('Error creating blog', {
        timeout: TIMEOUT,
        type: 'error',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const { data: categories } = useSWRImmutable(
    token ? [`${baseUrl}/categories`, token] : null,
    getCategories
  )

  const setCategoryValue = (value) => {
    setCategory(value)
    formik.setFieldValue('category', value.value)
  }

  const handleSubmit = (status) => {
    formik.setFieldValue('status', status)
    formik.submitForm()
  }

  const selectMedia = (media) => {
    formik.setFieldValue('thumbnail', media.id)
    setCover({ url: media.source_url })
  }

  useEffect(() => {
    if (tags) {
      const newTags = tags.map((tag) => tag.value)
      formik.setFieldValue('tags', newTags)
    }
  }, [tags])

  return (
    <>
      <Meta />
      <Head>
        <title>ADD NEW PRODUCT</title>
      </Head>
      <div className="modal-full-scream position-relative">
        {isSaving && <BlockUi color="var(--primary-color)" />}
        <div className="container px-3 px-md-5 pt-5">
          <div className="d-flex align-items-center">
            <Link href={'/dashboard/blogs'}>
              <a className="text-white">
                <span className="contain-icon">
                  <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
                </span>
                <span className="back">Back</span>
              </a>
            </Link>
          </div>
          <div className="container container-80 pb-4">
            <div className="row">
              <div className="col-12">
                <div className="contain-title">
                  <h1 className="create-communities-title">ADD NEW POST</h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-7">
                <CoursesUploadCover
                  onClick={() => setOpen(true)}
                  cover={cover}
                  url={cover?.url}
                  reset={() => setCover(null)}
                  text="Upload Cover Image"
                />
              </div>
            </div>
            <BlogForm
              formik={formik}
              tags={tags}
              setTags={setTags}
              categories={categories ? categories : []}
              category={category}
              setCategoryValue={setCategoryValue}
              handleContent={(content) =>
                formik.setFieldValue('content', content)
              }
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
          media_type="image"
        />
      )}
    </>
  )
}

export default AddBlog

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { id },
  }
}
