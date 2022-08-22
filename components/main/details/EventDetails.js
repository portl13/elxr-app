import React, { useContext, useState, useEffect } from 'react'
import { getFetchPublic } from '@request/creator'
import useSWR from 'swr'
import EventVideoStream from './event/EventVideoStream'
import ChatEvent from '../../eventChat/component/ChatEvent'
import { UserContext } from '../../../context/UserContext'
import SubscriptionButton from '@components/shared/button/SubscriptionButton'
import { getFormatedDateFromDate } from '@utils/dateFromat'
import SaveButton from '@components/shared/action/SaveButton'
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
    <div className="row">
      <div className="col">
        <div className="card-general">
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
          <div className="card-info mt-4  px-3 px-md-2">
          <div className="d-flex w-100 justify-content-between">
            <h4 className="font-weight-bold">{event?.title}</h4>
            <div className="flex-shrink d-flex align-items-center">
              {event && <SaveButton value={event_id} type="event" />}
            </div>
          </div>

            <span>Scheduled for</span>

            <span className="d-block mb-2">
              {event?.date_time &&
                getFormatedDateFromDate(
                  event?.date_time,
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
              <div className="img-channel-media">
                <div className="avatar-detail">
                  {channel && channel.channel_logo && (
                    <img src={channel.channel_logo} alt={event.channel_name} />
                  )}
                </div>
              </div>

              <div className="d-flex flex-column flex-md-row name-channel-media">
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
        {author && (
          <ChatEvent
            auth={auth}
            user={user}
            owner={author}
            vendor_id={event_id}
          />
        )}
      </div>
    </div>
  )
}

export default EventDetails
