import React, { useState, useEffect, useContext } from 'react'
import Detail from './detail'
import Customization from './customization'
import Visibility from './visibility'
import {
  createChannelEvent,
  getCategories,
} from '@api/go-live.api'
import { UserContext } from '@context/UserContext'
import { TIMEOUT } from '@utils/constant'
import { useAlert } from 'react-alert'
import moment from 'moment'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

function AddEvent() {
  const alert = useAlert()
  const router = useRouter()
  const [status, setStatus] = useState('detail')
  const { user } = useContext(UserContext)
  const [title, setEventTitle] = useState()
  const [description, setDescription] = useState()
  const [categoryList, setcategoryList] = useState([])
  const [category, setSelCategory] = useState()
  const [live_chat, setLive_chat] = useState(false)
  const [record_stream, setTRecord_stream] = useState(false)
  const [participants, setParticipants] = useState('anyone')
  const [message_delay, setMessage_delay] = useState(false)
  const [message_delay_time, setMessage_delay_time] = useState('')
  const [visability, setVisability] = useState('public')
  const [typeStream, setTypeStream] = useState('webcam')
  const [schedule, setSchedule] = useState('now')
  const [date_time, setDateTime] = useState(new Date())
  const [imageSpinner, setImageSpinner] = useState(false)
  const [thumbnail, setUploadImage] = useState(false)
  const [image, setImage] = useState()
  const [eventTime, setTime] = useState()
  const format = 'hh:mm A'

  const now = moment().hour(0).minute(0)

  useEffect(() => setTimeout(() => setImageSpinner(false), [2500]), [image])

  const eventParticipants = [
    {
      label: 'anyone',
      value: 'anyone',
    },
    {
      label: 'subscribers',
      value: 'subscribers',
    },
  ]

  const privacy = [
    {
      name: 'Private',
      value: 'private',
      description: 'Only you and people you choose can watch your stream',
    },
    {
      name: 'Unlisted',
      value: 'unlisted',
      description: 'Anyone with the stream link can watch your stream',
    },
    {
      name: 'Public',
      value: 'public',
      description: 'Everyone can watch your stream',
    },
  ]

  const type_stream = [
    {
      name: 'Webcam',
      value: 'webcam',
      description: 'Stream directly from your web browser',
    },
    {
      name: 'Software Stream',
      value: 'rtmp',
      description: 'Stream using 3rd party software such as OBS',
    },
  ]

  function getCategoryList() {
    getCategories(user).then((res) => {
      setcategoryList(res.data)
    })
  }

  const getvalue = (status) => {
    if (checKError(status)) {
      const formdata = {
        title,
        description,
        category,
        thumbnail: image?.id ? image.id : '',
        live_chat,
        record_stream,
        participants,
        // message_delay,
        // message_delay_time,
        visability,
        date_time: moment(date_time).format('YYYY-MM-DD ').concat(eventTime),
        //date_time: moment(date_time).format("YYYY-MM-DD ")
      }

      createChannelEvent(user, formdata)
        .then((res) => {
          const { data } = res
          setUploadImage('response data', res)
          alert.success('Event created successfully.', TIMEOUT)

          if (router?.query?.nav && router?.query?.nav === 'stream') {
            router.push(
              `/channel-stream/stream/${data.event_id}?type=${typeStream}`
            )
          } else {
            router.push('/my-portal?tab=golive&nav=events')
          }

        })
        .catch(() => alert.error('Something went wrong.', TIMEOUT))
    }
  }

  const checKError = () => {
    let status = true
    if (!visability) {
      alert.error('Please add atleast one visability before submit.', TIMEOUT)
      status = false
    }

    return status
  }

  function getNextStatus(status) {
    if (status === 'detail') {
      if (!title) {
        alert.error('Please add event title before submit.', TIMEOUT)
      } else if (!description) {
        alert.error('Please add event description before submit.', TIMEOUT)
      } else if (!category) {
        alert.error('Please select event category before submit.', TIMEOUT)
      } else {
        setStatus('customization')
      }
    } else if (status === 'customization') {
      // if (!message_delay) {
      //     alert.error("Please add message delay  before submit.", TIMEOUT);
      // }
      // else if (!message_delay_time) {
      //     alert.error("Please add message delay time before submit.", TIMEOUT);
      // }
      // else {
      setStatus('visibility')
      //}
    }
  }
  function getPrevStatus() {
    if (status === 'customization') {
      setStatus('detail')
    } else if (status === 'visibility') {
      setStatus('customization')
    }
  }
  useEffect(() => {
    if (user) {
      getCategoryList()
    }
  }, [user])

  useEffect(() => {
    setTime(moment().format(format))
    setDateTime(moment(date_time).format('YYYY-MM-DD'))
  }, [])

  useEffect(() => {
    if (!router?.query) return
    if (router?.query?.type === 'webcam') setTypeStream('webcam')
    if (router?.query?.type === 'rtmp') setTypeStream('rtmp')
  }, [router])

  return (
    <>
      <div className="wcfm-collapse-content">
        <div className="create-stream-session">
          <h1>Create Stream</h1>

          {status === 'detail' && (
            <Detail
              setEventTitle={setEventTitle}
              setDescription={setDescription}
              categoryList={categoryList}
              setSelCategory={setSelCategory}
              thumbnail={thumbnail}
              title={title}
              category={category}
              description={description}
              setImageSpinner={setImageSpinner}
              imageSpinner={imageSpinner}
              user={user}
              setUploadImage={setUploadImage}
              setImage={setImage}
              image={image}
            />
          )}

          {status === 'customization' && (
            <Customization
              live_chat={live_chat}
              record_stream={record_stream}
              participants={participants}
              message_delay={message_delay}
              eventParticipants={eventParticipants}
              message_delay_time={message_delay_time}
              setLive_chat={setLive_chat}
              setParticipants={setParticipants}
              setMessage_delay={setMessage_delay}
              setTRecord_stream={setTRecord_stream}
              setMessage_delay_time={setMessage_delay_time}
              setStatus={setStatus}
            />
          )}

          {status === 'visibility' && (
            <Visibility
              visability={visability}
              setVisability={setVisability}
              typeStream={typeStream}
              setTypeStream={setTypeStream}
              setSchedule={setSchedule}
              schedule={schedule}
              privacy={privacy}
              type_stream={type_stream}
              setDateTime={setDateTime}
              date_time={date_time}
              format={format}
              now={now}
              setTime={setTime}
              eventTime={eventTime}
              setStatus={setStatus}
            />
          )}
          <div
            className={(status === 'detail' && 'next-btn') || 'button-section'}
          >
            {status !== 'detail' && (
              <button onClick={() => getPrevStatus()}>Back</button>
            )}
            {status !== 'visibility' && (
              <button onClick={() => getNextStatus(status)}>Next</button>
            )}

            {status === 'visibility' && (
              <button onClick={() => getvalue()}>Done</button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default AddEvent
