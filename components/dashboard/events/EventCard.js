import React from 'react'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getFormatedDateFromDate } from '@utils/dateFromat'

const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const getImage = (size) => {
  if (!size) return
  if ('medium_large' in size) {
    return size.medium_large.url
  }
  if ('medium' in size) {
    return size.medium.url
  }
  if ('large' in size) {
    return size.large.url
  }
}

function EventCard({ event }) {
  const {
    categories,
    title,
    start_date_details,
    organizer,
    start_date,
    end_date,
    image,
  } = event
  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4 d-flex">
      <div className="card-general  w-100 position-relative">
        <div
          style={{
            backgroundImage: `url(${getImage(image?.sizes)})`,
          }}
          className="ratio ratio-16x9 bg-gray cover-bg"
        ></div>
        <div className="card-info p-0">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column text-center p-2">
              <span className="display-3">{start_date_details.day}</span>
              <span className="date-info-events text-uppercase">
                {month[Number(start_date_details.month) - 1]}
              </span>
            </div>
            <div className="pt-3 p-2">
              <div>
                <span className="font-size-12 badge badge-primary px-1">
                  {categories[0]?.name}
                </span>
                <h5
                  dangerouslySetInnerHTML={{ __html: title }}
                  className="font-size-12 mt-2"
                />
              </div>
              <div>
                <div>
                  <span>
                    {' '}
                    <FontAwesomeIcon
                      className="icon-clock"
                      icon={faClock}
                    />{' '}
                  </span>
                  <span className="font-size-12">
                    {getFormatedDateFromDate(start_date, 'h:mm')} am -{' '}
                    {getFormatedDateFromDate(end_date, 'h:mm')} pm
                  </span>
                </div>
                <div>
                  <span>
                    {' '}
                    <FontAwesomeIcon
                      className="icon-clock"
                      icon={faClock}
                    />{' '}
                  </span>
                  <span className="font-size-12 ">
                    Hosted by:{' '}
                    {organizer && organizer[0] && (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: organizer[0].organizer,
                        }}
                      />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
