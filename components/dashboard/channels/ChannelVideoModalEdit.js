import React, { useEffect, useState } from 'react'
import CloseIcon from '@icons/CloseIcon'
import { Modal, ModalBody, Progress } from 'reactstrap'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import InputDashForm from '@components/shared/form/InputDashForm'
import { css } from '@emotion/core'
import useSWRImmutable from 'swr/immutable'
import { genericFetchPost, getCategories } from '@request/dashboard'
import InputDashRadio from '@components/shared/form/InputDashRadio'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '@utils/constant'
import MediaLibraryCover from '@components/shared/media/MediaLibraryCover'
import MediaLibrary from '@components/MediaLibrary/MediaLibrary'
const baseUrl = process.env.apiV2
const categoriesUrl = `${baseUrl}/video/categories`
const saveVideo = `${baseUrl}/video/`

const modalStyle = css`
  .modal-content {
    background-color: var(--bg);
    border: 1px solid var(--white-color);
  }
  .Contain-img-width {
    width: 90px;
    height: 90px;
    border-radius: 20px;
    border: 2px dotted var(--white-color);
  }
  .icon-modal {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    bottom: 32px;
    left: 32px;
  }
`

function ChannelVideoModalEdit({
  open,
  setOpen,
  id,
  token,
  video_id,
  mutateVideos,
}) {
  const alert = useAlert()
  const [category, setCategory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [openMedia, setOpenMedia] = useState(false)
  const [cover, setCover] = useState()

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      channel_id: '',
      category: '',
      type: 'open',
      video_url: '',
      thumbnail: '',
      size: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await genericFetchPost(`${saveVideo}${video_id}`, token, values)
        await mutateVideos(values)
        setIsLoading(false)
        setOpen(false)
        alert.success('Video Upload', TIMEOUT)
      } catch (error) {
        alert.error('Error', TIMEOUT)
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      channel_id: Yup.string().required('Channel id is required'),
      category: Yup.string().required('Category is required'),
      video_url: Yup.string().required('Video is required'),
    }),
  })

  const { data: categories } = useSWRImmutable(
    token ? [categoriesUrl, token] : null,
    getCategories
  )

  const { data: videoData } = useSWRImmutable(
    token && video_id ? [`${saveVideo}${video_id}`, token] : null,
    getCategories
  )

  
  useEffect(() => {
    formik.setFieldValue('channel_id', id)
  }, [])

  const handleChangeCategory = (value) => {
    setCategory(value)
    formik.setFieldValue('category', String(value.value))
  }

  const onSubmitVideo = () => {
    formik.submitForm()
  }

  useEffect(() => {
    if (videoData) {
      formik.setFieldValue('title', videoData.title)
      formik.setFieldValue('description', videoData.description)
      formik.setFieldValue('size', videoData.size)
      formik.setFieldValue('type', videoData.type)
      formik.setFieldValue('video_url', videoData.video)
      if(videoData.thumbnail) {
        setCover({url: videoData.thumbnail})
        formik.setFieldValue('thumbnail', videoData.thumbnail)
      }
    }
  }, [videoData])

  useEffect(() => {
    if (categories && videoData) {
      const category = categories.find(
        (item) => item.name === videoData.category
      )
      if (!category) return
      setCategory({ label: category.name, value: category })
      formik.setFieldValue('category', String(category.id))
    }
  }, [categories, videoData])

  const selectCover = (media) => {
    setCover({ url: media.source_url })
    formik.setFieldValue('thumbnail', media.id)
  }

  const removeCover = () => {
    setCover(null)
    formik.setFieldValue('thumbnail', '')
  }

  const selectMedia = (media) => {
    formik.setFieldValue('video_url', media.source_url)
  }

  return (
    <>
      <Modal css={modalStyle} isOpen={open} toggle={() => setOpen(!open)}>
        <ModalBody>
          <div className="d-flex justify-content-end">
            <span onClick={() => setOpen(!open)} className="pointer">
              <CloseIcon className="icon-setting" />
            </span>
          </div>
          <h5>Add Video</h5>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <InputDashForm
                name="title"
                label="Title"
                type={'text'}
                value={formik.values.title}
                onChange={formik.handleChange}
                touched={formik.touched.title}
                error={formik.errors.title}
                required={true}
              />
            </div>
            <div className="mb-4">
              <InputDashForm
                label="Category"
                name="category"
                type={'select'}
                required={true}
                error={formik.errors.category}
                onChange={handleChangeCategory}
                value={category}
                options={categories?.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                touched={formik.touched.category}
              />
            </div>
            <div className="mb-4">
              <InputDashForm
                label="Description"
                name="description"
                type={'textarea'}
                required={true}
                value={formik.values.description}
                onChange={formik.handleChange}
                touched={formik.touched.description}
                error={formik.errors.description}
              />
            </div>
            <div className="mb-4 d-flex">
              <InputDashRadio
                values={[
                  {
                    value: 'open',
                    label: 'Open',
                  },
                  {
                    value: 'subscribers',
                    label: 'Subscribers',
                  },
                ]}
                name={'type'}
                value={formik.values.type}
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-2">
              <MediaLibraryCover
                token={token}
                cover={cover}
                reset={removeCover}
                selectMedia={selectCover}
                text="Upload Video Cover"
              />
            </div>
            <div className="mb-2">
              <InputDashForm
                label="Video URL"
                name="video_url"
                placeholder={'Enter video url (youtube, vimeo, etc)'}
                type={'text'}
                required={true}
                value={formik.values.video_url}
                onChange={formik.handleChange}
                touched={formik.touched.video_url}
                error={formik.errors.video_url}
              />
            </div>
          </form>

          <span className="d-flex my-1 text-center justify-content-center separator-or align-items-center">
            <b>Or</b>
          </span>
          <button
            onClick={() => setOpenMedia(true)}
            className="btn btn-primary w-100 br-25"
          >
            upload video
          </button>

          <div className="mt-3">
            <div>
              <button
                onClick={onSubmitVideo}
                className="btn btn-create w-100 py-3"
                disabled={!formik.isValid}
              >
                {!isLoading ? 'Save' : 'Loading...'}
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {token && openMedia && (
        <MediaLibrary
          token={token}
          show={openMedia}
          onHide={() => setOpenMedia(!openMedia)}
          selectMedia={selectMedia}
          media_type={'video'}
        />
      )}
    </>
  )
}

export default ChannelVideoModalEdit
