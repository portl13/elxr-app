import React from 'react'
import { getFetchPublic } from '@request/creator'
import useSWR from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBroadcastTower } from '@fortawesome/free-solid-svg-icons'
import EventVideoStream from './event/EventVideoStream'
const baseUrl = process.env.apiV2
const url = `${baseUrl}/channel-event`
const urlChannel = `${baseUrl}/channels`

function EventDetails({ id }) {
  const { data: event } = useSWR(`${url}/${id}`, getFetchPublic)
  
  console.log("🚀 ~ file: EventDetails.js ~ line 12 ~ EventDetails ~ event", event)

  const { data: channel } = useSWR(
    event ? `${urlChannel}/${event?.channel_id}` : null,
    getFetchPublic
  )

  return (
    <div className="row">
      <div className="col-12 col-lg-9">
        <div className="card-general">
          <EventVideoStream imageOffline={event?.thumbnail} stream_data={event?.stream_data} />
          <div className="bg-dark p-3">
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
          </div>
        </div>

        <div className="card-info mt-4  px-3 px-md-0">
          <h4 className="font-weight-bold">{event?.title}</h4>
          <span>Schedules for</span>
          <span>July 24, 2022- 3pm PST</span>
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
                  <img 
                    src={channel.channel_logo} 
                    alt={event.channel_name} 
                  />
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
              <div className="position-relative">
                <button className="btn btn-create rounded-lg d-flex">
                  <span>Subscribe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-3"></div>
    </div>
  )
}

export default EventDetails
