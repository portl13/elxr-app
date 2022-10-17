import { faCalendarPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ICalendarLink from 'react-icalendar-link'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'

function SaveCalendarButton({classNameIcons="", event, type = 'simple' }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [icalender, setIcalender] = useState(null)
  const [googleUrl, setGoogleUrl] = useState(null)
  const [loc, setLoc] = useState(null)

  const handleCreateGoogleEvent = (event) => {
    
    let startdate = new Date(event?.date_time)
    let details = `<div>${event?.description}<div>`
    setGoogleUrl(
      `https://calendar.google.com/calendar/u/0/r/eventedit?text=${event?.title}&start=${startdate}&details=${details}&location&trp=false&sprop=website:${loc}&sf=true`
    )
  }

  const createFile = (event) => {
    const eventObj = {
      title: event?.title,
      description: `${event?.description},
        Location: ${loc}`,
      startTime: event?.date_time,
      location: loc,
      filename: event?.title,
    }

    setIcalender(eventObj)
  }

  useEffect(() => {
    if (event) {
      setLoc(`${process.env.nextSite}${router.asPath}`)
      createFile(event)
      handleCreateGoogleEvent(event)
    }
  }, [event])

  if (!icalender || !googleUrl) {
    return null
  }

  return (
    <Dropdown direction="left" isOpen={open} toggle={() => setOpen(!open)}>
      <DropdownToggle tag={'span'}>
        {type === 'simple' && (
          <button  className={`btn btn-detail-action mr-2 ${classNameIcons}`}>
            <span className="d-none d-md-flex mr-1 ">ADD</span>
            <span className="btn-detail-icon">
              <FontAwesomeIcon icon={faCalendarPlus} />
            </span>
          </button>
        )}
        {type === 'card' && (
          <button className="btn btn-detail-action">
            <span className="btn-detail-icon card">
              <FontAwesomeIcon icon={faEllipsisV} />
            </span>
          </button>
        )}
      </DropdownToggle>
      {
        <DropdownMenu className="bg-social-panel">
          <DropdownItem>
            {googleUrl && (
              <a href={googleUrl} target="_blank" rel="noopener noreferrer">
                Google Calendar
              </a>
            )}
          </DropdownItem>
          <DropdownItem>
            {icalender && (
              <ICalendarLink event={icalender}>iCalendar</ICalendarLink>
            )}
          </DropdownItem>
        </DropdownMenu>
      }
    </Dropdown>
  )
}

export default SaveCalendarButton
