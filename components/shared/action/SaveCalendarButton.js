import { faCalendarPlus, faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import ICalendarLink from "react-icalendar-link"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"
import { getFormatWhitTimezone } from "@utils/dateFromat"
import { stringToSlug } from "@lib/stringToSlug"
import { clean } from "@utils/cleanHtml"

const nextSite = process.env.nextSite

function SaveCalendarButton({
  classNameIcons = "",
  event,
  type = "simple",
  className,
}) {
  const [open, setOpen] = useState(false)
  const [iCalendar, setICalendar] = useState(null)
  const [googleUrl, setGoogleUrl] = useState(null)

  const handleCreateGoogleEvent = (event) => {
    let startDate = getFormatWhitTimezone(
      event.date_time,
      "yyyyMMdd'T'kkmmss'Z'",
      event?.utc
    )

    let details = `${clean(
      event?.description
    )} <a href="${nextSite}/event/${stringToSlug(event?.title)}/${
      event?.id
    }">This is the event page.</a>`

    const eventUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startDate}%2F${startDate}&details=${details}&descripction&location=&text=${event?.title}`

    setGoogleUrl(eventUrl)
  }

  const createFile = (event) => {
    const link = `${nextSite}/event/${stringToSlug(event?.title)}/${event?.id}`
    const description = `${clean(event?.description)}, ${link}`

    const startTime = getFormatWhitTimezone(
      event.date_time,
      "yyyy-MM-dd kk:mm:ss",
      event?.utc
    )

    const endTime = event?.end_time
      ? getFormatWhitTimezone(event.end_time, "yyyy-MM-dd kk:mm:ss", event?.utc)
      : startTime

    const iCalendarEvent = {
      title: event?.title,
      description,
      startTime,
      endTime,
      location: link,
      filename: event?.title,
    }

    setICalendar(iCalendarEvent)
  }

  useEffect(() => {
    if (event) {
      createFile(event)
    }
  }, [event])

  if (!iCalendar) {
    return null
  }

  return (
    <Dropdown
      className={className}
      direction="left"
      isOpen={open}
      toggle={() => setOpen(!open)}
    >
      <DropdownToggle tag={"span"}>
        {type === "simple" && (
          <button className={`btn btn-detail-action mr-2 ${classNameIcons}`}>
            <span className="color-font d-none d-md-flex mr-1 ">ADD</span>
            <span className="btn-detail-icon">
              <FontAwesomeIcon className="color-font" icon={faCalendarPlus} />
            </span>
          </button>
        )}
        {type === "card" && (
          <button className="btn btn-detail-action">
            <span className="btn-detail-icon card">
              <FontAwesomeIcon className="color-font" icon={faEllipsisV} />
            </span>
          </button>
        )}
      </DropdownToggle>
      {
        <DropdownMenu className="bg-social-panel">
          {/*<DropdownItem>*/}
          {/*  {googleUrl ? (*/}
          {/*    <a href={googleUrl} target="_blank" rel="noopener noreferrer">*/}
          {/*      Google Calendar*/}
          {/*    </a>*/}
          {/*  ) : (*/}
          {/*    ""*/}
          {/*  )}*/}
          {/*</DropdownItem>*/}
          <DropdownItem>
            {iCalendar ? (
              <ICalendarLink event={iCalendar}>iCalendar</ICalendarLink>
            ) : null}
          </DropdownItem>
        </DropdownMenu>
      }
    </Dropdown>
  )
}

export default SaveCalendarButton
