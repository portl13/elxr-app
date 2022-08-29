import React, { useEffect, useState } from 'react'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { stringToSlug } from '@lib/stringToSlug'
import FilterEventImage from '@helpers/FilterEventImage'
import { convertToUTC, getFormat } from '@utils/dateFromat'

function EventCardPartner({ event }) {
  const { title, start_date, end_date } = event

  const [dateData, setDateData] = useState({ day: '', month: '', hour: '' })

  useEffect(() => {
    if (!start_date) return
    try {
      const dataFormatdata = getFormat(
        convertToUTC(start_date),
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
  }, [start_date])

  return (
    <div className="card-general  w-100 position-relative">
      <Link href={`/event/partner/${stringToSlug(title)}/${event?.id}`}>
        <a className="text-white">
          <div
            style={{
              backgroundImage: `url(${FilterEventImage(event?.image)})`,
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
            <div className="d-flex justify-content-between align-items-center">
              <span className="font-size-10 badge badge-primary px-1">
                {event &&
                  event.categories &&
                  event.categories.map((item) => item.name)}
              </span>
              {/* <SaveCalendarButton type="card" event={event} /> */}
            </div>
            <h5 className="font-size-14 mt-2 line-clamp-2">
              <Link href={`/event/partner/${stringToSlug(title)}/${event?.id}`}>
                <a
                  className="text-white"
                  dangerouslySetInnerHTML={{
                    __html: title,
                  }}
                />
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
            <span className="font-size-12 d-inline-block ml-2">-</span>
            <span className="font-size-12 d-inline-block ml-2">
              {end_date && getFormat( convertToUTC(end_date) , 'h:mm aaa') }
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCardPartner
