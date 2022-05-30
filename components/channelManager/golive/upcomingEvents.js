import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEyeSlash,
  faTrashAlt,
  faEdit,
  faVideo,
} from '@fortawesome/free-solid-svg-icons'
import DeleteEvent from './DeleteEvent'
import moment from 'moment'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'
import { css } from '@emotion/core'
import Router from 'next/router'

const DropdownStyle = css`
  & .btn {
    padding: 0;
    background-color: transparent;
    border: none;
  }
  & .dropdown-menu {
    padding: 0.3rem 0;
    background-color: #000;
    border: 1px solid #fff;
  }
  & .dropdown-item {
    padding: 0.3rem 1rem;
    color: #fff;
  }

  & .dropdown-item:first-of-type {
    border-bottom: 1px solid #fff;
  }

  & .dropdown-item:hover {
    background-color: #25272a;
  }

  & a {
    color: #fff;
  }
`

function UpcomingEvents({
  event,
  id,
  spin,
  setSpin,
  parentDelete,
  closeModal,
  handleRedirect,
}) {
  const [deleteModal, setDeleteModal] = useState(false)
  const [open, setOpen] = useState(false)

  const handleRedirectStream = ({ id, type }) => {
    Router.push(`/channel-stream/stream/${id}/?type=${type}`)
  }

  useEffect(() => {
    if (closeModal) {
      setDeleteModal(false)
      setSpin(false)
    }
  }, [closeModal])

  return (
    <>
      <div className="columns-head">
        <div className="events-div-1">
          <input type="checkbox" />
        </div>
        <div className="events-div-2">
          <img
            src={
              event.thumbnail === ''
                ? 'https://data.portl.live/wp-content/uploads/woocommerce-placeholder-150x150.png'
                : event.thumbnail
            }
            alt="image"
          />
          <div className="events-text-tag">
            {event.title}
            <span>Scheduled</span>
          </div>
        </div>
        <div className="events-div-3">Streaming Software</div>
        <div className="events-div-4">
          {moment(event.date_time).format('MMM DD YYYY')}
          <span>Scheduled</span>
        </div>
        <div
          className={
            event.visability === 'public'
              ? 'events-div-5'
              : 'events-div-private'
          }
        >
          <FontAwesomeIcon
            icon={event.visability === 'public' ? faEye : faEyeSlash}
          />
          {event.visability}
        </div>
        <div className="events-div-6">
          <span
            onClick={() => {
              setDeleteModal(true)
              console.log('delete')
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
          <span onClick={() => handleRedirect('golive', 'edit-event', id)}>
            <FontAwesomeIcon icon={faEdit} />
          </span>
          <Dropdown
            css={DropdownStyle}
            direction="left"
            isOpen={open}
            toggle={() => setOpen(!open)}
          >
            <DropdownToggle>
              <FontAwesomeIcon icon={faVideo} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => handleRedirectStream({ id: id, type: 'webcam' })}
              >
                Webcam
              </DropdownItem>
              <DropdownItem
                onClick={() => handleRedirectStream({ id: id, type: 'rtmp' })}
              >
                Software
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {deleteModal && (
        <DeleteEvent
          show={deleteModal}
          setDeleteModal={setDeleteModal}
          id={id}
          parentDelete={parentDelete}
          spin={spin}
          setSpin={setSpin}
        />
      )}
    </>
  )
}
export default UpcomingEvents
