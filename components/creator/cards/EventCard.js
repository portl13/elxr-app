import React, { useState, useEffect } from 'react'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getFormatedDateFromDate } from '@utils/dateFromat'
import TvIcon from '@icons/TvIcon'
import Link from 'next/link'
import { stringToSlug } from '@lib/stringToSlug'

function EventCard({ event }) {
  const { title, thumbnail } = event
  const [dateData, setDateData] = useState({ day: '', month: '', hour: '' })

  useEffect(() => {
    if (!event) return
    try {
      const dataFormatdata = getFormatedDateFromDate(
        event.date_time,
        'dd-LLL-h:mm aaa'
      )
      const dataArray = dataFormatdata.split('-')
      setDateData({
        ...dateData,
        day: dataArray[0],
        month: dataArray[1],
        hour: dataArray[2],
      })
    } catch (error) {
      console.log(error)
    }
  }, [event])

  return (
    <div className="card-general  w-100 position-relative">
      <Link href={`/event/${stringToSlug(title)}/${event?.id}`}>
        <a className="text-white">
          <div
            style={{
              backgroundImage: `url(${thumbnail})`,
            }}
            className="ratio ratio-16x9 bg-gray cover-bg"
          ></div>
        </a>
      </Link>
      <div className="card-info p-0 d-flex position-relative">
        <div className="card-info-date d-flex flex-column text-center p-2">
          <span className="display-3">{dateData?.day}</span>
          <span className="date-info-events text-uppercase">
            {dateData?.month}
          </span>
        </div>
        <div className="card-info-content pt-3 p-2">
          <div>
            <span className="font-size-10 badge badge-primary px-1">
              {event && event.category}
            </span>
            <h5 className="font-size-14 mt-2 line-clamp-2">
              <Link href={`/event/${stringToSlug(title)}/${event?.id}`}>
                <a className="text-white">{title}</a>
              </Link>
            </h5>
          </div>
          <div>
            <span>
              <FontAwesomeIcon className="icon-clock" icon={faClock} />
            </span>
            <span className="font-size-12 d-inline-block ml-2">
              {dateData?.hour}
            </span>
          </div>
          <div>
            <span>
              <TvIcon className="icon-clock text-font" />
            </span>
            <span className="font-size-12 d-inline-block ml-2">
              {event && event.channel_name && (
                <Link href={`/channel/${event.channel_id}`}>
                  <a className="text-white">{event.channel_name}</a>
                </Link>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard