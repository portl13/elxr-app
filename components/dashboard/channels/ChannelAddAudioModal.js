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
import Loader from '@pages/profile/loader'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '@utils/constant'
import MediaLibraryCover from '@components/shared/media/MediaLibraryCover'
import MediaLibrary from '@components/MediaLibrary/MediaLibrary'
const baseUrl = process.env.apiV2
const categoriesUrl = `${baseUrl}/podcasts/categories`
const audioUpload = `${baseUrl}/podcasts-upload`
const saveAudio = `${baseUrl}/podcasts/`

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

function ChannelAddAudioModal({ open, setOpen, id, token, mutateAudio }) {
  const alert = useAlert()
  const [category, setCategory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [cover, setCover] = useState()
  const [openMedia, setOpenMedia] = useState(false)
  const [audio, setAudio] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      channel_id: '',
      category: '',
      type: 'open',
      audio_id: '',
      thumbnail: '',
      size: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await genericFetchPost(saveAudio, token, values)
        await mutateAudio()
        setIsLoading(false)
        setOpen(false)
        formik.resetForm()
        alert.success('Podcast Created', TIMEOUT)
      } catch (error) {
        alert.error('Error', TIMEOUT)
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      channel_id: Yup.string().required('Channel id is required'),
      category: Yup.string().required('Category is required'),
      audio_id: Yup.string().required('Audio is required'),
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

  const onSubmitVideo = () => {
    formik.submitForm()
  }

  const selectCover = (media) => {
    setCover({ url: media.source_url })
    formik.setFieldValue('thumbnail', media.id)
  }

  const removeCover = () => {
    setCover(null)
    formik.setFieldValue('thumbnail', '')
  }

  const selectMedia = (media) => {
    setAudio(media.source_url)
    formik.setFieldValue('audio_id', media.id)
    formik.setFieldValue('size', media.size)
  }

  const removeMedia = () => {
    setAudio(null)
    formik.setFieldValue('audio_id', '')
    formik.setFieldValue('size', '')
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
          <h5>Add Podcast</h5>
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
            <div className="mb-4">
              <MediaLibraryCover
                token={token}
                cover={cover}
                reset={removeCover}
                selectMedia={selectCover}
                text="Upload Podcast Cover"
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
                    label: 'Subscribers Only',
                  },
                ]}
                name={'type'}
                value={formik.values.type}
                onChange={formik.handleChange}
              />
            </div>
          </form>
          {!formik.values.audio_id && (
            <button
              onClick={() => setOpenMedia(true)}
              className="btn btn-primary w-100 br-25"
            >
              upload audio
            </button>
          )}
          {formik.values.audio_id && audio && (
            <>
              <audio className="w-100" src={audio} controls></audio>
              <button
                onClick={() => removeMedia()}
                className="btn btn-primary w-100 br-25 mt-3"
              >
                remove audio
              </button>
            </>
          )}
          <div className="mt-4">
            <button
              onClick={onSubmitVideo}
              className="btn btn-create w-100 py-3"
              disabled={!formik.isValid}
            >
              {!isLoading ? 'Add' : 'Loading...'}
            </button>
          </div>
        </ModalBody>
      </Modal>
      {token && openMedia && (
        <MediaLibrary
          token={token}
          show={openMedia}
          onHide={() => setOpenMedia(!openMedia)}
          selectMedia={selectMedia}
          media_type={'audio'}
        />
      )}
    </>
  )
}

export default ChannelAddAudioModal
