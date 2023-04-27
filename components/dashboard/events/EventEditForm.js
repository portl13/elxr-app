import React, { useContext, useState, useEffect, useMemo } from 'react'
import InputDashForm from '@components/shared/form/InputDashForm'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import moment from 'moment'
import { useRouter } from 'next/router'
import useSWRImmutable from 'swr/immutable'
import { createEventsFecth, getCategories } from '@request/dashboard'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'

import { UserContext } from '@context/UserContext'
import InputDashRadio from '@components/shared/form/InputDashRadio'
import InputDashCheck from '@components/shared/form/InputDashCheck'
import ClockIcon from '@icons/ClockIcon'
import BlockUi from '@components/ui/blockui/BlockUi'
import Editor from '@components/shared/editor/Editor'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '@utils/constant'
import InputDashTags from '@components/shared/form/InpushDashTags'
import MediaLibrary from '@components/MediaLibrary/MediaLibrary'
import CoursesUploadCover from '../courses/CoursesUploadCover'
import { convertToUTC, formatTimeZone } from '@utils/dateFromat'
import BackButton from '@components/shared/button/BackButton'
import ListNavItem from '@components/layout/ListNavItem'
import InputDashCurrency from '@components/shared/form/InputDashCurrency'
import InputSelectChannel from '@components/shared/form/InputSelectChannel'
import timezones from 'timezones-list'
import jstz from 'jstz'
const baseUrl = process.env.apiV2
const urlCategory = `${baseUrl}/channel-event/categories`
const urlEvents = `${baseUrl}/channel-event/`

const formatTime = 'HH:mm:00'

function EventEditForm({ id, text = 'Edit Event' }) {
  const currentTimezone = jstz.determine().name()
  const currentUtc = moment().format('Z')
  const timeZoneOptions = useMemo(() => formatTimeZone(timezones), [timezones])
  const { user } = useContext(UserContext)
  const alert = useAlert()
  const [category, setcategory] = useState()
  const [loading, setLoading] = useState(true)

  const [date_time, setDateTime] = useState(new Date())
  const [eventTime, setTime] = useState()
  // finish event
  const [endDate, setEndDate] = useState(new Date())
  const [eventEndTime, setEndTime] = useState()
  const [defaultEndTime, setDefaultEndTime] = useState()

  const [defaulTime, setDefaulTime] = useState()
  const [cover, setCover] = useState()
  const [open, setOpen] = useState(false)

  const token = user?.token
  const router = useRouter()
  const [tags, setTags] = useState([])
  const [now, setNow] = useState()
  const [timezoneValue, setTimezoneValue] = useState('')

  const addEventForm = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      thumbnail: '',
      live_chat: true,
      record_stream: false,
      visability: 'public',
      ticket_price: 0,
      ticket_id: '',
      date_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:00'),
      end_time: moment(Date.now())
        .add(1, 'hours')
        .format('YYYY-MM-DD HH:mm:00'),
      channel_id: '',
      stream: '',
      stream_livepeer: '',
      type_stream: 'rtmp',
      action: 'update',
      id: id,
      status: 'publish',
      show_in_feed: true,
      third_party_url: '',
      timezone: '',
      utc: '',
    },
    onSubmit: async (values) => createNewEvent(values),
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      category: Yup.string().required('Category is required'),
      thumbnail: !cover
        ? Yup.string().required('Thumbnail is a required')
        : Yup.string(),
    }),
  })

  const { data: categories } = useSWRImmutable(
    token ? [urlCategory, token] : null,
    getCategories
  )

  const { data: event, mutate } = useSWRImmutable(
    token ? [`${urlEvents}${id}`, token] : null,
    getCategories
  )

  const handleChangeCategory = (value) => {
    setcategory(value)
    addEventForm.setFieldValue('category', String(value.value))
  }

  const handleTimezone = (value) => {
    setTimezoneValue(value)
    addEventForm.setFieldValue('timezone', String(value.value))
    addEventForm.setFieldValue('utc', String(value.utc))
  }

  const createNewEvent = async (values) => {
    setLoading(true)
    try {
      await createEventsFecth('/api/cloudflare/edit-event', token, values)
      await mutate(values)
      setLoading(false)
      alert.success('Event updated successfully', TIMEOUT)
      if (now && values.type_stream === 'rtmp') {
        await router.replace(`/manage/event/rtmp/${id}`)
        return
      }
      if (now && values.type_stream === 'webcam') {
        await router.replace(`/manage/event/web/${id}`)
        return
      }
      await router.replace(`/manage/events`)
    } catch (error) {
      setLoading(false)
      alert.error(error.message, TIMEOUT)
    }
  }

  function handlerSetTime(value, type) {
    if (!value) return
    const time = value.format(formatTime)
    if (type === 'date_time') {
      setTime(time)
    }
    if (type === 'end_time') {
      setEndTime(time)
    }
    const dataTime = moment(date_time).format('YYYY-MM-DD ').concat(time)
    addEventForm.setFieldValue(type, dataTime)
  }

  function handlerSetDateTime(e, type) {
    if (type === 'date_time') {
      setDateTime(e.target.value)
    }
    if (type === 'end_time') {
      setEndDate(e.target.value)
    }
    const dataTime = moment(e.target.value)
      .format('YYYY-MM-DD ')
      .concat(type === 'date_time' ? eventTime : eventEndTime)
    addEventForm.setFieldValue(type, dataTime)
  }

  const selectMedia = (media) => {
    addEventForm.setFieldValue('thumbnail', media.id)
    setCover({ url: media.source_url })
  }

  const setPrice = (value, field) => {
    if (typeof value === 'string') {
      addEventForm.setFieldValue(field, value)
      return
    }
    addEventForm.setFieldValue(field, 0)
  }

  const handleSubmit = async (status) => {
    await addEventForm.setFieldValue('status', status)
    await addEventForm.submitForm()
  }

  function handlerSelectChannel(value) {
    addEventForm.setFieldValue('channel_id', String(value.value))
  }

  useEffect(() => {
    if (cover && cover?.id) {
      addEventForm.setFieldValue('thumbnail', cover.id)
    }
  }, [cover])

  useEffect(() => {
    if (event) {
      const dateTime = new Date(convertToUTC(event.date_time))
      setTime(moment(dateTime).format(formatTime))
      setDateTime(moment(dateTime).format('YYYY-MM-DD'))
      setDefaulTime(dateTime)

      if (event?.end_time) {
        const dateEnd = new Date(convertToUTC(event.end_time))
        setEndTime(moment(dateTime).format(formatTime))
        setEndDate(moment(dateEnd).format('YYYY-MM-DD'))
        setDefaultEndTime(dateEnd)
        addEventForm.setFieldValue('end_time', event.end_time)
      } else {
        setDefaultEndTime(dateTime)
      }

      addEventForm.setFieldValue('date_time', event.date_time)
      addEventForm.setFieldValue('show_in_feed', event.show_in_feed)
      addEventForm.setFieldValue('title', event.title)
      addEventForm.setFieldValue('description', event.description)
      addEventForm.setFieldValue('live_chat', event.live_chat)
      addEventForm.setFieldValue('record_stream', event.record_stream)
      addEventForm.setFieldValue('visability', event.visability)
      addEventForm.setFieldValue('stream', event.stream)
      addEventForm.setFieldValue('stream_livepeer', event.stream_livepeer)
      addEventForm.setFieldValue('type_stream', event.type_stream)
      addEventForm.setFieldValue('channel_id', event.channel_id)

      if (event.visability === 'ticketed') {
        addEventForm.setFieldValue('ticket_price', event.ticket_price)
        addEventForm.setFieldValue('ticket_id', event?.ticket_id)
      }

      if (event.type_stream === 'third-party') {
        addEventForm.setFieldValue('third_party_url', event?.third_party_url)
      }

      if (event.thumbnail) {
        setCover({ url: event.thumbnail })
      }
      if (event.tags) {
        const newTags = event.tags.map(({ value, label }) => ({
          value,
          label,
        }))
        setTags(newTags)
        addEventForm.setFieldValue('tags', newTags)
      }

      if (event?.timezone) {
        const timezone = timeZoneOptions.find(
          (tz) => tz.value === event.timezone
        )
        addEventForm.setFieldValue('timezone', timezone.value)
        setTimezoneValue(timezone)
      } else {
        addEventForm.setFieldValue('timezone', currentTimezone)
      }

      if (event?.utc) {
        addEventForm.setFieldValue('utc', event.utc)
      } else {
        addEventForm.setFieldValue('utc', currentUtc)
      }

      setLoading(false)
    }
  }, [event])

  useEffect(() => {
    if (categories && event) {
      const category = categories.find((item) => item.name === event.category)
      if (!category) return
      setcategory({ label: category.name, value: category })
      addEventForm.setFieldValue('category', String(category.id))
    }
  }, [categories, event])

  useEffect(() => {
    if (tags) {
      const newTags = tags.map((tag) => tag.value)
      addEventForm.setFieldValue('tags', newTags)
    }
  }, [tags])

  return (
    <>
      <div className="container px-2 pb-5 postion-relative">
        {loading && <BlockUi color={'var(--primary-color)'} />}
        <BackButton />
        <div className="container-80 container px-0">
          <div className="my-5">
            <ListNavItem
              data={{
                title: 'Edit Event',
                icon: '/img/icon-movil/create-menu/events.svg',
                type: 'heading',
              }}
            />
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
              <CoursesUploadCover
                onClick={() => setOpen(true)}
                cover={cover}
                url={cover?.url}
                reset={() => setCover(null)}
                text="Event Featured Image <br> Ratio is 1920 x 1080 Pixels"
              />
              {addEventForm.touched.thumbnail &&
                addEventForm.errors.thumbnail && (
                  <p className={'text-danger text-center mt-2'}>
                    {addEventForm.errors.thumbnail}
                  </p>
                )}
            </div>
          </div>
          <form className="row" onSubmit={addEventForm.handleSubmit}>
            <div className="col-12 col-md-6 mt-4">
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
              <InputSelectChannel
                label="Channel"
                name="channel_id"
                placeholder="Select Channel..."
                required={true}
                value={addEventForm.values.channel_id}
                error={addEventForm.errors.channel_id}
                touched={addEventForm.touched.channel_id}
                onChange={handlerSelectChannel}
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
            <div className="col-12 col-md-6 mt-4">
              <InputDashTags value={tags} setValue={setTags} />
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
            <div className={`col-12 mt-5`}>
              <p>Select the date and time you want to go live</p>
            </div>
            <div className={`col-12 col-md-4`}>
              <label className="input-search mr-0 border-radius-35  w-100 input-date-piker d-flex">
                <input
                  type="date"
                  className="date-selector bg-transparent border-0 text-font w-100 mr-0"
                  value={date_time}
                  name="date"
                  min={moment().format('YYYY-MM-DD')}
                  onChange={(e) => handlerSetDateTime(e, 'date_time')}
                />
              </label>
            </div>
            <div className={`col-12 col-md-4`}>
              <label className="input-search mr-0 border-radius-35 w-100 d-flex justify-content-between align-items-center input-date-piker">
                {defaulTime && (
                  <TimePicker
                    showSecond={false}
                    format={'HH:mm'}
                    use12Hours
                    placeholder="1.35pm"
                    defaultValue={moment(defaulTime)}
                    inputReadOnly
                    onChange={handlerSetTime}
                    className="w-100 pr-2 input-date-session"
                  />
                )}
                <i>
                  <ClockIcon className="icon-clock" />
                </i>
              </label>
            </div>
            <div className={`col-12 col-md-4`}>
              <InputDashForm
                label="Time Zone"
                name="timezone"
                type={'select'}
                required={true}
                error={addEventForm.errors.timezone}
                onChange={handleTimezone}
                value={timezoneValue}
                options={timeZoneOptions}
                touched={addEventForm.touched.timezone}
              />
            </div>

            <div className={`col-12 mt-5`}>
              <p>Select the date and time you want the event to end.</p>
            </div>
            <div className={`col-12 col-md-4`}>
              <label className="input-search mr-0 border-radius-35  w-100 input-date-piker d-flex">
                <input
                  type="date"
                  className="date-selector bg-transparent border-0 w-100 mr-0"
                  value={endDate}
                  name="date_end"
                  //min={moment().format("YYYY-MM-DD")}
                  onChange={(e) => handlerSetDateTime(e, 'end_time')}
                />
              </label>
            </div>
            <div className={`col-12 col-md-4`}>
              <label className="input-search mr-0 border-radius-35 w-100 d-flex justify-content-between align-items-center input-date-piker">
                {defaultEndTime ? (
                  <TimePicker
                    showSecond={false}
                    format={'HH:mm'}
                    use12Hours
                    placeholder="1.35pm"
                    defaultValue={moment(defaultEndTime)}
                    inputReadOnly
                    onChange={(value) => handlerSetTime(value, 'end_time')}
                    className="w-100 pr-2 input-date-session"
                  />
                ) : (
                  ''
                )}
                <i>
                  <ClockIcon className="icon-clock" />
                </i>
              </label>
            </div>
            <div className={`col-12 col-md-4`}></div>

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
                  <InputDashCheck
                    name={'show_in_feed'}
                    label={'Show in Feed'}
                    value={addEventForm.values.show_in_feed}
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
                      value: 'private',
                      label: 'Subscribers Only',
                      description:
                        'Only your subscribers can access this content',
                    },
                    {
                      value: 'public',
                      label: 'Open',
                      description: 'Everyone can access this content',
                    },
                    {
                      value: 'ticketed',
                      label: 'Ticketed',
                      description:
                        'Sell ticketed access to your live stream event',
                    },
                  ]}
                  name="visability"
                  value={addEventForm.values.visability}
                  onChange={addEventForm.handleChange}
                  className="mt-2"
                />
                {addEventForm.values.visability === 'ticketed' ? (
                  <div className={'mt-4'}>
                    <InputDashCurrency
                      value={addEventForm.values.ticket_price}
                      name="ticket_price"
                      label="Ticket Price"
                      required={true}
                      onChange={setPrice}
                    />
                  </div>
                ) : null}
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
                    {
                      value: 'conference',
                      label: 'Conference',
                      description:
                        'Host a browser based meeting event with participants',
                    },
                    {
                      value: 'third-party',
                      label: 'Third Party Streaming Service',
                      description:
                        'Stream using a third party service like Youtube, Vimeo, etc.',
                    },
                  ]}
                  name="type_stream"
                  value={addEventForm.values.type_stream}
                  onChange={addEventForm.handleChange}
                  className="mt-2"
                />
                <div className={'mt-3'}></div>
                {addEventForm.values.type_stream === 'third-party' ? (
                  <InputDashForm
                    label="Third Party Url"
                    name="third_party_url"
                    type={'text'}
                    value={addEventForm.values.third_party_url}
                    onChange={addEventForm.handleChange}
                    required={true}
                    error={addEventForm.errors.third_party_url}
                    touched={addEventForm.touched.third_party_url}
                  />
                ) : null}
              </div>
            </div>
            <div className="py-3 d-flex justify-content-center justify-content-md-end mt-3 w-100">
              <button
                onClick={() => router.back()}
                className={'btn btn-outline-primary b-radius-25'}
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit('draft')}
                className={'btn btn-theme b-radius-25'}
              >
                Save as Draft
              </button>

              <button
                type="submit"
                onClick={() => handleSubmit('publish')}
                className="btn btn-create"
              >
                UPDATE
              </button>
            </div>
          </form>
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

export default EventEditForm
