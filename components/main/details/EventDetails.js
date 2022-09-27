import React, { useContext, useState, useEffect } from 'react'
import { getFetchPublic } from '@request/creator'
import useSWR from 'swr'
import EventVideoStream from './event/EventVideoStream'
import ChatEvent from '../../eventChat/component/ChatEvent'
import { UserContext } from '../../../context/UserContext'
import SubscriptionButton from '@components/shared/button/SubscriptionButton'
import {convertToUTC, getFormatedDateFromDate} from '@utils/dateFromat'
import SaveButton from '@components/shared/action/SaveButton'
import CreatedButton from '@components/shared/action/CreatedButton'
import SharedButton from '@components/shared/action/SharedButton'
import SaveCalendarButton from '@components/shared/action/SaveCalendarButton'

import Link from 'next/link'

const baseUrl = process.env.apiV2
const url = `${baseUrl}/channel-event`
const urlChannel = `${baseUrl}/channels`

function EventDetails({ id }) {
  const { user } = useContext(UserContext)
  const { data: event } = useSWR(`${url}/${id}`, getFetchPublic)

  const [auth, setAuth] = useState(false)
  const [author, setAuthor] = useState(false)
  const event_id = id

  const { data: channel } = useSWR(
    event ? `${urlChannel}/${event?.channel_id}` : null,
    getFetchPublic
  )

  useEffect(() => {
    if (event && event?.author) {
      setAuthor(event.author)
    }
  }, [event])

  useEffect(() => {
    if (!user) return
    setAuth(!auth)
  }, [user])

  useEffect(() => {
    if (!user && auth) {
      setAuth(!auth)
    }
  }, [user])

  return (
    <div className="row mx-0">
      <div className="col">
        <div className="card-general no-border">
          <EventVideoStream
            imageOffline={event?.thumbnail}
            stream_data={event?.stream_data}
          />
          {/* <div className="bg-dark p-3">
            <div className="width-250">
              <div className="d-flex align-items-center bg-dark-back px-3 py-1 ">
                <i className="mr-3 ">
                  <FontAwesomeIcon className='dashboard-icon' icon={faBroadcastTower} />
                </i>

                <div className="d-flex flex-column">
                  <span>Live in 4 days</span>
                  <span>July 21 at 3:00 PM</span>
                </div>
              </div>
            </div>
          </div> */}
          <div className="card-info mt-4  px-0 px-md-2">
          <div className="d-flex flex-column flex-lg-row mb-3 mb-lg-0 w-100 justify-content-between">
            <h4 className="font-weight-bold">{event?.title}</h4>
            <div className="flex-shrink d-flex align-items-center">
              <SaveCalendarButton event={event} />
              <CreatedButton typeAdd={"event"} />
              {event && <SaveButton value={event_id} type="event" />}
              <SharedButton title={event?.title} />
            </div>
          </div>

            <span>Scheduled for</span>

            <span className="d-block mb-2">
              {event?.date_time &&
                getFormatedDateFromDate(
                    convertToUTC(event?.date_time),
                  'MMMM dd, yyyy h:mm aaa'
                )}
            </span>

            <p
              className="m-0"
              dangerouslySetInnerHTML={{
                __html: event?.description,
              }}
            />
            <div className="card-channel-media border py-2 px-3 mt-4 py-md-3">
              
                <div className="img-channel-media mr-3 mr-md-0 mb-3 mb-md-0">
                <div className="avatar-detail">
                  {channel && channel.channel_logo && (
                    <img src={channel.channel_logo} alt={event.channel_name} />
                  )}
                </div>
              </div>

              <div className="d-flex name-channel-media">
                <div className="ml-md-3 mt-2 mt-md-0">
                  <h4 className="m-0 font-weight-bold">
                    {event?.channel_name}
                  </h4>
                  <span>{channel?.category}</span>
                </div>
              </div>
              

              <div className="d-flex mt-2 buttons-channel-media">
                <div className="position-relative">
                  <button className="btn btn-borde btn-border-primary text-primary">
                    <span>Follow</span>
                  </button>
                </div>
                <div className="position-relative ml-3">
                  <SubscriptionButton vendor_id={author} user={user} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="col chat-column">
      {author && user && (
          <ChatEvent
            auth={auth}
            user={user}
            owner={author}
            vendor_id={event_id}
          />
        )}
        {!auth && (
          <div className="d-flex justify-content-center align-items-center h-100  flex-column">
            <Link href={"/login"}>
              <a className="btn btn-primary">SIGN IN</a>
            </Link>
            <p className="mt-2 font-weight-bold">login to participate in the chat</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventDetails
