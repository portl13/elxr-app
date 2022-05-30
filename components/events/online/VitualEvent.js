import React, { useContext, useState, useEffect } from 'react'
import { SectionEvent } from "../../ui/section/SectionEvent";
import { useAlert } from 'react-alert'
import ICalendarLink from "react-icalendar-link";
import { Col } from 'reactstrap';
import Link from 'next/link';
import FilterEventImage from "../../../helpers/FilterEventImage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../../../context/UserContext";
import CardEventOnline from '../../events/online/CardEventOnline';
import ModalLoginOrRegister from '../../modal/ModalLoginOrRegister';
import { getEventList, addToMyEvents, deleteFromMyEvents, getMyEvents } from '../../../pages/api/events.api';
import { getFormatedDate } from '../../../utils/dateFromat';
import { TIMEOUT } from '../../../utils/constant';
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const VirtualEvent = ({ event }) => {
  const alert = useAlert()
  const { user } = useContext(UserContext)
  const [actionShow, setActionShow] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [eventList, setEventList] = useState([])
  const [icalender, setIcalender] = useState(null)
  const [timelineLink, setTimeline] = useState(null)
  const [myEventId, setMyEventId] = useState();
  const eventImg = FilterEventImage(event.image);
  useEffect(() => {
    if (event.categories) {
      setTimeline(window.location.pathname)
      const formData = {
        page: 1,
        per_page: 4,
        categories: event.categories[0].slug,
      }
      getEventList(user, formData).then(res => {
        let resVal = [...res.data.events]
        resVal = resVal.filter(e => e.id !== event.id)
        setEventList(resVal.slice(0, 3))
      })
    }
  }, [event])


useEffect(() => {
  getMyEvents(user, { user_id: user.id, type: "online" }).then((res) => {
       let myEventRes = res.data.data?.events?.map(ele => ele.id)
       let myEventResValue = myEventRes?.includes(event.id)
       setMyEventId(myEventResValue)
  
})
}, [user])

  const createFile = () => {
    const { title, start_date, end_date, description } = event;
    const eventObj = {
      title: title,
      description: description,
      startTime: start_date,
      endTime: end_date,
      location: "10 Carlotta St, Artarmon NSW 2064, Australia",
      filename: title
    }
    setIcalender(eventObj);
  }

  useEffect(() => {
    if (event)
      createFile()

  }, [event])

  const handleCreateGoogleEvent = () => {
    const { title, start_date, end_date, description } = event
    let startdate = new Date(start_date);
    let enddate = new Date(end_date);
    return `https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&start=${startdate}&end=${enddate}&details=${description}&location&trp=false&sprop=website:https://portl.com&ctz=America/New_York&pli=1&sf=true`
  }

  const handleAddMyEvent = (data) => {
    let eventType = window.location.pathname.includes("/event/online/") ? "online" : "in-person"
    const formData = {
      user_id: user.id,
      event_id: data.id,
      type: eventType
    }
    addToMyEvents(user, formData).then(() => {
      alert.success("Online event added successfully to my event.", TIMEOUT)
       setMyEventId(true)
    }).catch(() => {
      alert.error("Event already added to my events", TIMEOUT)
    })
  }
  const handleDeleteMyEvent = (data) => {
    const formData = {
      user_id: user.id,
      event_id: data.id,
      type: "online"
    }
    deleteFromMyEvents(user, formData).then(() => {
      alert.success("Online event successfully removed.", TIMEOUT)
       setMyEventId(false)
    }).catch(()=>{
      alert.error("Something went wrong.", TIMEOUT)})
  }

  return (
    <SectionEvent>
      <header className="channel-header events-main-tag">
        <div className="event-meta-left">
          <div className="event-left-panel">
            <span>{getFormatedDate(event.start_date, "MMM")}</span>{getFormatedDate(event.start_date, "D")}</div>
          <div className="event-right-panel">
            <h1 className="event-title" dangerouslySetInnerHTML={{ __html: event.title }} />
            <div className="svg-icon">
              <FontAwesomeIcon icon={faEllipsisV} onClick={() => setActionShow(!actionShow)} />
              <div className="tooltip-panel" style={{ display: actionShow ? "block" : "none" }}>
                <ul>
                {!myEventId && <li>
                  <a onClick={() => handleAddMyEvent(event)}>Save to My Events</a>
                </li>}
                {myEventId && <li>
                  <a onClick={() => handleDeleteMyEvent(event)}>Remove from My Events</a>
                </li>}
                  <li><Link href={{
                    pathname: '/livefeed',
                    query: { pathname: timelineLink },
                  }}>Share to TimeLine</Link></li>
                  <li><a href={handleCreateGoogleEvent()}
                    target="_blank" rel="noopener noreferrer">Google Calendar</a></li>
                  {icalender && <li><ICalendarLink event={icalender}>
                    iCalendar
                  </ICalendarLink></li>}
                </ul>
              </div>
            </div>
            <span className="event-date">
              {getFormatedDate(event.start_date, 'MMMM DD[,] YYYY [at] hh:mm a')}
            </span>
          </div>
        </div>
        {event.website && <div className="click-events">For Complete details: <a href={event.website} target="_blank">Click here</a> </div>}
        <figure>
          <img
            className="img-ration"
            src={
              eventImg
                ? eventImg
                : "https://portl.com/wp-content/uploads/2020/08/portl-logo-dark.jpg"
            }
            alt={event.title} />
        </figure>
      </header >
      <footer className="channel-footer events-info-footer ">
        <div className="channel-info">
          <div dangerouslySetInnerHTML={{ __html: event.description }}></div>
        </div>
        <div className="channel-info">
          {eventList.length ? <>
            <h3>Related Events</h3>
            <Col xs="12">
              <div className="row">
                {eventList.map((item) => {
                  const eventItem = {
                    imageUrl: FilterEventImage(item.image),
                    title: item.title,
                    startDateTime: item.start_date,
                    id: item.slug,
                    endDateTime: item.end_date,
                    timezone: item.timezone_abbr,
                    event_id: item.id
                  }
                  return (
                    <Col key={eventItem.id} xs="12" md="6" lg="4">
                      <CardEventOnline event={eventItem} fromDetail={true} />
                    </Col>)
                })}
              </div>
            </Col>
          </> : ""}
        </div>
      </footer>
      <ModalLoginOrRegister
        setToggleModal={setToggle}
        toggleModal={toggle} />
    </SectionEvent >
  );
}

export default VirtualEvent
