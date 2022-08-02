import React, { useContext, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import InputDashForm from '@components/shared/form/InputDashForm'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import moment from 'moment'
import { useRouter } from 'next/router'
import useSWRImmutable from 'swr/immutable'
import { createEventsFecth, getCategories } from '@request/dashboard'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'

import InputFileCover from '@components/shared/form/InputFileCover'
import { UserContext } from '@context/UserContext'
import InputDashRadio from '@components/shared/form/InputDashRadio'
import InputDashCheck from '@components/shared/form/InputDashCheck'
import ClockIcon from '@icons/ClockIcon'
import useChannelMedia from '@hooks/channels/useChannelMedia'
import BlockUi from '@components/ui/blockui/BlockUi'
import Editor from '@components/shared/editor/Editor'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '@utils/constant'
const baseUrl = process.env.apiV2
const urlCategory = `${baseUrl}/channel-event/categories`
const urlStream = `${baseUrl}/channel-event/stream`
const urlEvents = `${baseUrl}/channel-event/`

function ChannelCreateEvent({ id, text = 'Create Event', now = false }) {
  const { user } = useContext(UserContext)
  const alert = useAlert()
  const [category, setcategory] = useState()
  const [loading, setLoading] = useState(false)
  const [date_time, setDateTime] = useState(new Date())
  const [eventTime, setTime] = useState()
  const [cover, setCover] = useState()
  let formatTime = 'hh:mm A'
  const token = user?.token
  const router = useRouter()

  const addEventForm = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      thumbnail: '',
      live_chat: true,
      record_stream: false,
      visability: 'public',
      date_time: moment(Date.now()).format('YYYY-MM-DD hh:mm A'),
      channel_id: '',
      stream: 'webcam',
    }, //
    onSubmit: async (values) => createNewEvent(values),
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      category: Yup.string().required('Category is required'),
    }),
  })

  const createNewEvent = async (values) => {
    setLoading(true)
    try {
      const { event_id } = await createEventsFecth(urlEvents, token, values)
      setLoading(false)
      router.push(`/dashboard/event/${event_id}`)
    } catch (error) {
      setLoading(false)
      alert.error(error.message, TIMEOUT)
    }
  }

  const { data: categories } = useSWRImmutable(
    token ? [urlCategory, token] : null,
    getCategories
  )

  // const { data: streamData } = useSWRImmutable(
  //   token ? [`${urlStream}?channel_id=${id}`, token] : null,
  //   getCategories
  // )

  const [resetCover, handlerUploadCover, isLoadingCover] = useChannelMedia(
    token,
    setCover
  )

  const handleChangeCategory = (value) => {
    setcategory(value)
    addEventForm.setFieldValue('category', String(value.value))
  }

  function handlerSetTime(value) {
    if (!value) return
    const time = value.format(formatTime)
    setTime(time)
    const dataTime = moment(date_time).format('YYYY-MM-DD ').concat(time)
    addEventForm.setFieldValue('date_time', dataTime)
  }

  function handlerSetDateTime(e) {
    setDateTime(e.target.value)
    const dataTime = moment(e.target.value)
      .format('YYYY-MM-DD ')
      .concat(eventTime)
    addEventForm.setFieldValue('date_time', dataTime)
  }

  useEffect(() => {
    setTime(moment(date_time).format(formatTime))
  }, [])

  useEffect(() => {
    setDateTime(moment(new Date()).format('YYYY-MM-DD'))
  }, [])

  useEffect(() => {
    if (cover && cover?.id) {
      addEventForm.setFieldValue('thumbnail', cover.id)
    }
  }, [cover])

  useEffect(() => {
    addEventForm.setFieldValue('channel_id', id)
  }, [])

  return (
    <>
      <div className="container px-3 px-md-5 pt-5 postion-relative">
        {loading && <BlockUi color={'var(--primary-color)'} />}
        <div
          onClick={() => router.back()}
          className="d-flex align-items-center pointer"
        >
          <span className="contain-icon">
            <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
          </span>
          <span className="back">Back</span>
        </div>
        <div className="container-80 container px-0">
          <div className="contain-title mb-5">
            <h1 className="create-communities-title font-weight-bold">
              {text}
            </h1>
          </div>
          <div className="row">
            <div className="col-12 col-md-7">
              <h5>UPLOAD THUMBNAIL</h5>
              <p className="font-size-14 text-grey">
                Select or upload a picture that represents your stream. A good
                thumbnail stands out and draws
              </p>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12 col-md-6">
              <InputFileCover
                reset={resetCover}
                handlerUpload={handlerUploadCover}
                isLoading={isLoadingCover}
                cover={cover}
                url={cover?.url}
                text={'Upload Image'}
              />
            </div>
          </div>
          <form className="row" onSubmit={addEventForm.handleSubmit}>
            <div className="col-12 col-md-6  mt-4">
              <InputDashForm
                label="Title"
                name="title"
                type={'text'}
                value={addEventForm.values.title}
                onChange={addEventForm.handleChange}
                required={true}
                error={addEventForm.errors.title}
                touched={addEventForm.touched.title}
              />
            </div>
            <div className="col-12 col-md-6 mt-4">
              <InputDashForm
                label="Category"
                name="category"
                type={'select'}
                required={true}
                error={addEventForm.errors.category}
                onChange={handleChangeCategory}
                value={category}
                options={categories?.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                touched={addEventForm.touched.category}
              />
            </div>
            <div className="col-12  mt-4">
              <Editor
                className="editor-styles"
                onChange={(value) =>
                  addEventForm.setFieldValue('description', value)
                }
                value={addEventForm.values.description}
              />
              {addEventForm.touched.description &&
                addEventForm.touched.description && (
                  <div className="invalid-feedback d-block">
                    {addEventForm.errors.description}
                  </div>
                )}
            </div>

            <div className={`col-12 mt-5 ${now ? 'd-none' : ''}`}>
              <p>Select the date and time you want to go live</p>
            </div>
            <div className={`col-12 col-md-6 ${now ? 'd-none' : ''}`}>
              <label className="input-search mr-0 border-radius-35  w-100 input-date-piker d-flex">
                <input
                  type="date"
                  className="date-selector bg-transparent border-0 text-white w-100 mr-0"
                  value={date_time}
                  name="date"
                  min={moment().format('YYYY-MM-DD')}
                  onChange={handlerSetDateTime}
                />
              </label>
            </div>
            <div className={`col-12 col-md-6 ${now ? 'd-none' : ''}`}>
              <label className="input-search mr-0 border-radius-35 w-100 d-flex justify-content-between align-items-center input-date-piker">
                <TimePicker
                  showSecond={false}
                  format={formatTime}
                  use12Hours
                  placeholder="1.35pm"
                  defaultValue={moment()}
                  inputReadOnly
                  onChange={handlerSetTime}
                  className="w-100 pr-2 input-date-session"
                />
                <i>
                  <ClockIcon className="icon-clock" />
                </i>
              </label>
            </div>

            <div className="col-12 my-2 mb-md-5 mt-md-3">
              <div>
                <h5>LIVE CHAT</h5>
              </div>
              <div className="border-white px-5 py-4">
                <p>Settings to tailor your stream to your needs</p>

                <div className="my-3 d-flex ">
                  <InputDashCheck
                    name={'live_chat'}
                    label={'Live Chat'}
                    value={addEventForm.values.live_chat}
                    onChange={addEventForm.handleChange}
                  />
                  <InputDashCheck
                    name={'record_stream'}
                    label={'Record Stream'}
                    value={addEventForm.values.record_stream}
                    onChange={addEventForm.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mt-3">
              <h5>Content Access</h5>
              <p>Choose who can view this content</p>
              <div className="border-white px-4 py-5">
                <InputDashRadio
                  values={[
                    {
                      value: 'public',
                      label: 'Subscribers Only',
                      description:
                        'Only your subscribers can access this content',
                    },
                    {
                      value: 'private',
                      label: 'Open',
                      description: 'Everyone can access this content',
                    },
                  ]}
                  name="visability"
                  value={addEventForm.values.visability}
                  onChange={addEventForm.handleChange}
                  className="mt-2"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 mt-3">
              <h5>STREAMING METHOD</h5>
              <p>Choose how you are going to create your live stream</p>
              <div className="border-white px-4 py-5">
                <InputDashRadio
                  values={[
                    {
                      value: 'webcam',
                      label: 'Webcam',
                      description: 'Stream directly from your web browser',
                    },
                    {
                      value: 'rtmp',
                      label: 'Software Stream',
                      description:
                        'Stream using 3rd party software such as OBS',
                    },
                  ]}
                  name="stream"
                  value={addEventForm.values.stream}
                  onChange={addEventForm.handleChange}
                  className="mt-2"
                />
              </div>
            </div>
            <div className="py-3 d-flex justify-content-center justify-content-md-end mt-3 w-100">
              <button type="submit" className="btn btn-create px-5">
                Save {now && '& Go Live'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ChannelCreateEvent
