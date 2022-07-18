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
import InputDashCurrency from '@components/shared/form/InputDashCurrency'
import Loader from '@pages/profile/loader'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '@utils/constant'
const baseUrl = process.env.apiV2
const categoriesUrl = `${baseUrl}/video/categories`
const videoUpload = `${baseUrl}/video-upload`
const saveVideo = `${baseUrl}/video/`

// https://data.portl.live/wp-content/uploads/2022/07/pexels-karolina-grabowska.mp4
// 57165
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

function ChannelAddVideoModal({ open, setOpen, id, token }) {
  const alert = useAlert()
  const [category, setCategory] = useState('')
  const [progress, setProgress] = useState(0)
  const [video, setVideo] = useState('')
  const [isLoadingVideo, setIsLoadingVideo] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      channel_id: '',
      category: '',
      type: 'free',
      price: 0,
      video_id: '57165',
      thumbnail: '',
      size: '504098',
    },
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        
        await genericFetchPost(saveVideo, token, values)
        setIsLoading(false)
        setOpen(false)
        alert.success('Video Created', TIMEOUT)
      } catch (error) {
        alert.error("Error", TIMEOUT)
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      channel_id: Yup.string().required('Channel id is required'),
      category: Yup.string().required('Category is required'),
      video_id: Yup.string().required('Video is required'),
    }),
  })

  const { data: categories } = useSWRImmutable(
    token ? [categoriesUrl, token] : null,
    getCategories
  )

  useEffect(() => {
    formik.setFieldValue('channel_id', id)
  }, [])

  const handleChangeCategory = (value) => {
    setCategory(value)
    formik.setFieldValue('category', String(value.value))
  }

  const setPrice = (value, field) => {
    if (!value) return
    formik.setFieldValue(field, value)
  }

  const uploadVideoAxios = async (e) => {
    const file = e.target.files[0]
    try {
      const formData = new FormData()
      formData.append('video', file)
      setIsLoadingVideo(true)
      const { data } = await axios.post(videoUpload, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          let percentage = Math.floor((loaded * 100) / total)
          setProgress(percentage)
        },
      })
      setVideo(data.url)
      formik.setFieldValue('video_id', data.id)
      formik.setFieldValue('size', file.size)
      alert.success('Video uploaded successfully')
    } catch (error) {
      alert.error('Error uploading video')
    } finally {
      setIsLoadingVideo(false)
      setProgress(0)
    }
  }

  const reset = () => {
    setVideo('')
  }
  const onSubmitVideo = () => {
    formik.submitForm()
  }

  return (
    <Modal css={modalStyle} isOpen={open} toggle={() => setOpen(!open)}>
      <ModalBody>
        <div className="d-flex justify-content-end">
          <span onClick={() => setOpen(!open)} className="pointer">
            <CloseIcon className="icon-setting" />
          </span>
        </div>
        <h5>Add Video</h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4">
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
                    value: 'free',
                    label: 'Free',
                  },
                  {
                    value: 'paid',
                    label: 'Paid',
                  },
                ]}
                name={'type'}
                value={formik.values.type}
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-4 w-100">
              <InputDashCurrency
                name="price"
                value={formik.values.price}
                error={formik.errors.price}
                onChange={setPrice}
                disabled={formik.values.type === 'free'}
                prefix={'$'}
              />
            </div>
          </div>
        </form>
        <div className="upload-image border-white d-flex justify-content-center align-items-center p-0">
          {!video && (
            <div className="upload-image is_video position-relative d-flex justify-content-center align-items-center pointer">
              {!isLoadingVideo ? (
                <>
                  <input
                    onChange={uploadVideoAxios}
                    accept="video/*"
                    type="file"
                    name="video"
                    className="upload-input-hidden pointer"
                  />
                  <div className={`upload-image-info text-center p-0`}>
                    <span className="upload-contain-icon ">
                      <FontAwesomeIcon
                        className="upload-image-icon"
                        icon={faPlus}
                      />
                    </span>
                    <p className="upload-cover-info">Upload Video</p>
                    <span className="upload-info">500 mb max, video</span>
                  </div>
                </>
              ) : (
                <div className="loading-upload">
                  <Loader color="primary" />
                </div>
              )}
            </div>
          )}

          {video && (
            <div className="ratio ratio-16x9">
              <video src={video}></video>
              <button onClick={reset} className="btn btn-clean-media banner">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          )}
        </div>
        {isLoadingVideo && (
          <div className="my-3">
            <Progress animated color="primary" striped value={progress} />
          </div>
        )}
        <div className="mt-3">
          <div>
            <button
              onClick={onSubmitVideo}
              className="btn btn-create w-100 py-3"
              disabled={!formik.isValid}
            >
              {!isLoading ?  'Add' : 'Loading...'}
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ChannelAddVideoModal
