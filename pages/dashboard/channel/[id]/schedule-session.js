import React, { useContext, useState } from 'react'
import Meta from '@components/layout/Meta'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import InputDashForm from '@components/shared/form/InputDashForm'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import moment from 'moment'
import { useRouter } from 'next/router'
import useSWRImmutable from 'swr/immutable'
import { getCategories } from '@request/dashboard'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'

import { UserContext } from '@context/UserContext'
import InputDashRadio from '@components/shared/form/InputDashRadio'
import InputDashCheck from '@components/shared/form/InputDashCheck'
import ClockIcon from '@icons/ClockIcon'

const urlCategory = `${process.env.apiURl}/channel_event/categories`

function ScheduleSession() {
  const { user } = useContext(UserContext)
  const [category, setcategory] = useState()
  const [stream, setStream] = useState('webcam')
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
      participants: '',
      visability: 'public',
      date_time: moment(Date.now()).format('YYYY-MM-DD  hh:mm A'),
    },
    onSubmit: (values) => console.log(values),
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      category: Yup.string().required('Category is required'),
    }),
  })

  const { data: categories } = useSWRImmutable(
    token ? [urlCategory, token] : null,
    getCategories
  )

  const handleChangeCategory = (value) => {
    setcategory(value)
    addEventForm.setFieldValue('category', String(value.value))
  }
  addEventForm.touched.title
  return (
    <>
      <Meta />
      <Head>
        <title>Schelude Session</title>
      </Head>
      <div className="container px-3 px-md-5 pt-5">
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
          <div className="contain-title mb-4">
            <h1 className="create-communities-title font-weight-bold">
              Schedule Session
            </h1>
          </div>
          <div className="row">
            <div className="col-12 col-md-7">
              <div>
                <h5>UPLOAD THUMBNAIL</h5>
                <p className="font-size-14 text-grey">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias et ratione holhai aspernatur possimus esse modi quis
                  officia corporis corrupti
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="upload-image border-moteado d-flex justify-content-center align-items-center">
                <div className="upload-image-info text-center pb-5 pb-md-0">
                  <span className="upload-contain-icon ">
                    <FontAwesomeIcon
                      className="upload-image-icon"
                      icon={faPlus}
                    />
                  </span>
                  <p className="upload-cover-info">Upload image</p>
                  <span className="upload-info">10 mb max, png or jpeg</span>
                </div>
              </div>
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

            <div className="col-12 col-md-6 mt-md-4">
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
            <div className="col-12  mt-md-4">
              <InputDashForm
                label="Description"
                name="description"
                type={'textarea'}
                value={addEventForm.values.description}
                onChange={addEventForm.handleChange}
                required={true}
                error={addEventForm.errors.description}
                touched={addEventForm.touched.description}
              />
            </div>
            <div className="col-12 mt-5">
              <p>Select the date and time you want to go live</p>
            </div>
            <div className="col-12 col-md-6">
              <label className="input-search mr-0 border-radius-35  w-100 input-date-piker d-flex">
                <input
                  type="date"
                  className="date-selector bg-transparent border-0 text-white w-100 mr-0"
                  value={Date.now()}
                  name=""
                  min={moment().format('YYYY-MM-DD')}
                />
              </label>
            </div>
            <div className="col-12 col-md-6">
              <label className="input-search mr-0 border-radius-35 w-100 d-flex justify-content-between align-items-center input-date-piker">
                <TimePicker
                  showSecond={false}
                  format={'hh:mm A'}
                  use12Hours
                  placeholder="1.35pm"
                  defaultValue={moment()}
                  inputReadOnly
                  className='w-100 pr-2 input-date-session'
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
              <h5>VISIBILITY</h5>
              <p>Choose when to go live and who can see your stream</p>
              <div className="border-white px-4 py-5">
                <InputDashRadio
                  values={[
                    {
                      value: 'public',
                      label: 'Public',
                      description: 'Everyone can watch your stream',
                    },
                    {
                      value: 'private',
                      label: 'Private',
                      description:
                        'Only you and people you choose can watch your stream',
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
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
            <div className="py-3 d-flex justify-content-center justify-content-md-end mt-3 w-100">
              <button type="submit" className="btn btn-create px-5">
                Save & Go Live
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ScheduleSession
