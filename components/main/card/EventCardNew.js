import React from 'react'
import { convertToUTC, getFormat } from '@utils/dateFromat'
import Link from 'next/link'
import { stringToSlug } from '@lib/stringToSlug'

function EventCardNew({ event }) {
  const { title, thumbnail } = event
  return (
    <div className="card-general-new w-100 position-relative">
      <Link href={`/event/${stringToSlug(title)}/${event?.id}`}>
        <a className="text-white">
          <div
            style={{
              backgroundImage: `url(${thumbnail})`,
            }}
            className="ratio border-radius-17 ratio-1x1 bg-gray cover-bg"
          ></div>
        </a>
      </Link>
      <div className=" py-3">
        <h3 className="font-size-13  m-0">
          <Link href={`/event/${stringToSlug(title)}/${event?.id}`}>
            <a className="text-white">{title} </a>
          </Link>
        </h3>
        <div className="d-flex my-1">
          <span className="date-info-events text-primary font-size-13 text-capitalize">
            {getFormat(convertToUTC(event.date_time), 'LLLL dd, haaa')}
          </span>
        </div>
        <div className="d-flex text-grey ">
          <span className="font-size-13">
            Channel:{' '}
            {event && event.channel_name && (
              <Link href={`/channel/${event.channel_id}`}>
                <a className="text-grey">{event.channel_name}</a>
              </Link>
            )}
          </span>
        </div>
        <div className=" d-flex text-grey">
          <span className="font-size-13 mr-1">Category:</span>
          <span className="font-size-13">{event?.category}</span>
        </div>
      </div>
    </div>
  )
}

export default EventCardNew
