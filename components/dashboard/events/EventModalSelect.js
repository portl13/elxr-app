import React, { useState } from 'react'
import { css } from '@emotion/core'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import useSWR from 'swr'
import { getChannelEvents } from '@request/dashboard'
import { getFormatedDateFromDate } from '@utils/dateFromat'

const eventsUrl = `${process.env.apiV2}/channel-event/`

const style = css`
  max-height: 180px;
  overflow-y: auto;
  .avatar-channel {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .body-channel {
    display: flex;
    align-items: center;
  }
  .title-channel {
    font-size: 16px;
    margin: 0;
  }
  .card-event-select {
    display: grid;
    grid-template-columns: 50px 1fr;
    grid-gap: 15px;
  }
`

function EventModalSelect({ handleGoLive, open, setOpen, token, user }) {
  const limit = 20
  const [page, setPage] = useState(1)

  const { data: events, error } = useSWR(
    token
      ? [
          `${eventsUrl}?author=${user?.id}&page=${page}&per_page=${limit}`,
          token,
        ]
      : null,
    getChannelEvents
  )

  const isLoading = !events && !error

  return (
    <Modal
      size="sm"
      centered={true}
      isOpen={open}
      toggle={() => setOpen(!open)}
    >
      <ModalHeader>Select Event</ModalHeader>
      <ModalBody className='py-2' css={style}>
        {isLoading && <SpinnerLoader />}
        {events &&
          events.data &&
          events.data.length > 0 &&
          events.data.map((event) => (
            <div 
            onClick={() => handleGoLive(event.id)}
            className="card-event-select mb-3 pointer" key={event.id}>
              <div
                style={{
                  backgroundImage: `url(${event.thumbnail})`,
                }}
                className="card-event-select-avatar cover-bg avatar-channel"
              ></div>
              <div className="card-event-select-body">
                <h3 className="title-channel line-clamp-1">{event.title}</h3>
                <p>
                  {getFormatedDateFromDate(event.date_time, 'dd LLL h:mm aaa')}
                </p>
              </div>
            </div>
          ))}

        {events && events.data && events.data.length === 0 && (
          <div className="d-flex justify-content-center flex-column">
            <h5 className="text-center mb-3 ">No Event found</h5>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <button
          className="btn btn-danger border-25"
          onClick={() => setOpen(!open)}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default EventModalSelect
