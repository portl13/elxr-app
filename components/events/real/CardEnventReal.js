import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link'
import Router from 'next/router';
import { useAlert } from 'react-alert'
import moment from 'moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import ICalendarLink from "react-icalendar-link";

import CardEventContainer from '../../ui/card/CardEventContainer';
import { TIMEOUT } from '../../../utils/constant';
import { addToMyEvents, deleteFromMyEvents } from '../../../pages/api/events.api'
import { UserContext } from "../../../context/UserContext";

const findImage = (event) => {
  if (event?.imageUrl) {
    return event.imageUrl
  }
  if (event?.artist?.imageUrl) {
    return event.artist.imageUrl
  }
  return "https://portl.com/wp-content/uploads/2020/08/portl-logo-dark.jpg"
}

const CardEnventReal = ({ event, isMyEvent, getEventsList, isAdded }) => {
  const alert = useAlert()
  const { user } = useContext(UserContext);
  const [actionShow, setActionShow] = useState(false);
  const [loc, setLoc] = useState("")
  const [icalender, setIcalender] = useState(null)
  const handleAddMyEvent = (e, data) => {
    e.preventDefault()
    const formData = {
      user_id: user.id,
      event_id: data.id,
      type: "in-person"
    }
    addToMyEvents(user, formData).then(() => {
      getEventsList()
      setActionShow(false)
      alert.success("In-person event added successfully to my event.", TIMEOUT)
    }).catch(() => {
      setActionShow(false)
      alert.error("Event already added to my event", TIMEOUT)
    })
  }

  const handleDeleteMyEvent = (e, data) => {
    e.preventDefault()
    const formData = {
      user_id: user.id,
      event_id: data.id,
      type: "in-person"
    }
    deleteFromMyEvents(user, formData).then(() => {
      getEventsList()
      setActionShow(false)
      alert.success("In-person event successfully removed .", TIMEOUT)
    }).catch(() => {
      setActionShow(false)
      alert.error("Something went wrong.", TIMEOUT)
    })
  }
  const getAddress = () => {
    if (!event.venue.address)
      return ""
    const { street, city, state, country, zipCode } = event.venue.address
    return `${street} ${city} ${state} ${country}, ${zipCode}`
  }
  const handleCreateGoogleEvent = (e) => {
    e.preventDefault()
    if (!event)
      return ""
    const { title, startDateTime, ticketPurchaseUrl } = event
    let startdate = new Date(startDateTime);
    let details = `<div>Buy Tickets: ${ticketPurchaseUrl}<div><div>Location: ${getAddress()}<div>`
    Router.replace(`https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&start=${startdate}&details=${details}&location&trp=false&sprop=website:${loc}/in-person-events&sf=true`)
  }
  const createFile = () => {
    const { title, ticketPurchaseUrl, startDateTime } = event
    const eventObj = {
      title,
      description: `Buy Tickets: ${ticketPurchaseUrl},
      Location: ${getAddress()}`,
      startTime: startDateTime,
      location: getAddress(),
      filename: title
    }
    setLoc(window.location.origin)
    setIcalender(eventObj);
  }
  useEffect(() => {
    if (event) {
      createFile()
    }
  }, [event])

  const renderElipse = (status) => {
    return (<div className="svg-icon">
      <FontAwesomeIcon icon={faEllipsisV} onClick={(e) => {
        e.preventDefault()
        setActionShow(!actionShow)
      }} />
      <div className="tooltip-panel" style={{ display: actionShow ? "block" : "none" }}>
        <ul>
          {(!isMyEvent && !isAdded) && <li>
            <a onClick={(e) => handleAddMyEvent(e, event)}>Save to My Events</a>
          </li>}
          {isMyEvent && <li>
            <a onClick={(e) => handleDeleteMyEvent(e, event)}>Remove from My Events</a>
          </li>}
          <li>
            <a onClick={handleCreateGoogleEvent} target="_blank"
              rel="noopener noreferrer">Google Calendar</a></li>
          {icalender && <li>
            <ICalendarLink event={icalender}>
              iCalendar
            </ICalendarLink></li>}
        </ul>
      </div>
    </div>)
  }

  if (!event)
    return (<></>)
  return (
    <CardEventContainer css={{padding: 10}}>
      <Link href={`/event/location/${event.id}${!isMyEvent && !isAdded ? "--saved" : ""}`}>
        <a className="card-link-event">
          <div >
            <header className="card-header-event ratio ratio-16x9">
              <img
                src={findImage(event)}
                alt={event.title}
              />
            </header>
            <footer className="card-footer-event">
              <h3
                className="card-title-event"
                dangerouslySetInnerHTML={{ __html: event.title }}
              />
              <span className="card-time-event">
                {moment(event.startDateTime).format('DD MMMM YYYY')}
              </span>
              {renderElipse(isMyEvent)}
            </footer>
          </div>
        </a>
      </Link>
    </CardEventContainer>
  );
};

export default CardEnventReal;
