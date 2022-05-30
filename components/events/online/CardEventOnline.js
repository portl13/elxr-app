import React, { useState, useEffect, useContext } from 'react'
import { useAlert } from 'react-alert'
import Router from 'next/router';
import ICalendarLink from "react-icalendar-link";
import moment from 'moment'
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import { addToMyEvents, deleteFromMyEvents } from '../../../pages/api/events.api'
import { UserContext } from "../../../context/UserContext";
import CardEventContainer from '../../ui/card/CardEventContainer';
import { getFormatedDate } from '../../../utils/dateFromat';
import { TIMEOUT } from '../../../utils/constant';

const CardEventOnline = ({ event, fromDetail, isMyEvents, getEventsList, isAdded }) => {
  const alert = useAlert()
  const { user } = useContext(UserContext);
  const [icalender, setIcalender] = useState(null)
  const [actionShow, setActionShow] = useState(false)
  const { imageUrl,
    title,
    startDateTime,
    id,
    endDateTime,
    timezone,
    description } = event;
  const createFile = () => {
    const eventObj = {
      title: title,
      description: description,
      startTime: startDateTime,
      endTime: endDateTime,
      location: "10 Carlotta St, Artarmon NSW 2064, Australia",
      filename: title
    }
    setIcalender(eventObj);
  }

  useEffect(() => {
    if (event) {
      createFile()
    }
  }, [event])

  const handleCreateGoogleEvent = () => {
    let startdate = new Date(startDateTime);
    let enddate = new Date(endDateTime);
    return `https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&start=${startdate}&end=${enddate}&details=${description}&location&trp=false&sprop=website:${window.location.origin}/event/online/${id}&sf=true`
  }
  const handleRedirect = (key) => {
    Router.push(`/event/online/${key}`)
  }

  const handleAddMyEvent = (data) => {
    const formData = {
      user_id: user.id,
      event_id: data.event_id,
      type: "online"
    }
    addToMyEvents(user, formData).then(() => {      
      getEventsList()
      alert.success("Online event added successfully to my event.", TIMEOUT)
    }).catch(()=>{
      alert.error("Event already added to my event.", TIMEOUT)})
  }
  
  const handleDeleteMyEvent = (data) => {
    const formData = {
      user_id: user.id,
      event_id: data.event_id,
      type: "online"
    }
    deleteFromMyEvents(user, formData).then(() => {
      getEventsList()
      alert.success("Online event successfully removed.", TIMEOUT)
    }).catch(()=>{
      alert.error("Something went wrong.", TIMEOUT)})
  }

  return (
    <CardEventContainer>
      <div className="card-link-event">
        <header className="card-header-event ratio ratio-16x9">
          <img
            src={imageUrl
              ? imageUrl
              : "https://portl.com/wp-content/uploads/2020/08/portl-logo-dark.jpg"
            }
            alt={title}
            onClick={() => handleRedirect(id)}
          />
        </header>
        {fromDetail ? <footer className="card-footer-event event-footer-events">
          <div className="date-panel">
            <span>{getFormatedDate(startDateTime, "MMM")}</span>{getFormatedDate(startDateTime, "D")}</div>
          <div className="text-section">
            <span className="card-time-event">
              {moment(startDateTime).format('MMMM DD [At] hh:mm a')}{" "}-{" "}
              {moment(endDateTime).format('hh:mm a')}{" "}{timezone}
            </span>
            <h3 className="card-title-event"
              dangerouslySetInnerHTML={{ __html: title }}
              onClick={() => handleRedirect(id)}
            />
          </div>
        </footer> : <footer className="card-footer-event remove-padding">
          <h3
            className="card-title-event"
            dangerouslySetInnerHTML={{ __html: title }}
            onClick={() => handleRedirect(id)}
          />
          <span className="card-time-event">Starting Time:{" "}
            {moment(startDateTime).format('MMMM DD[,] YYYY [at] hh:mm a')}
          </span>
          <div className="svg-icon">
            <FontAwesomeIcon icon={faEllipsisV} onClick={() => setActionShow(!actionShow)} />
            <div className="tooltip-panel" style={{ display: actionShow ? "block" : "none" }}>
              <ul>
                {!isMyEvents && !isAdded && <li>
                  <a onClick={() => handleAddMyEvent(event)}>Save to My Events</a>
                </li>}
                {isMyEvents && <li>
                  <a onClick={() => handleDeleteMyEvent(event)}>Remove from My Events</a>
                </li>}
                <li>
                  <Link href={{
                    pathname: '/livefeed',
                    query: { pathname: `/event/online/${id}` },
                  }}>Share to TimeLine</Link>
                </li>
                <li>
                  <a href={handleCreateGoogleEvent()} target="_blank"
                    rel="noopener noreferrer">Google Calendar</a></li>
                {icalender && <li>
                  <ICalendarLink event={icalender}>
                    iCalendar
                  </ICalendarLink></li>}
              </ul>
            </div>
          </div>
        </footer>

        }
      </div>
    </CardEventContainer>
  );
};

export default CardEventOnline;
