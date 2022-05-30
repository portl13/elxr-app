import React, { useContext, useState, useEffect } from 'react';
import { SectionEvent } from "../../ui/section/SectionEvent";
import { useAlert } from 'react-alert'
import ICalendarLink from "react-icalendar-link";
import useIcon from "../../../hooks/useIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import { TIMEOUT } from '../../../utils/constant';
import { CardSidebar } from "../../ui/card/CardSidebar";
import { UserContext } from '../../../context/UserContext';
import ModalLoginOrRegister from '../../modal/ModalLoginOrRegister';
import { getFormatedDate } from '../../../utils/dateFromat';
import { addToMyEvents } from '../../../pages/api/events.api';
import MapContainer from "./GoogleMap"

const DivRealEvent = styled.div`
    display: flex ;
    flex-direction: column;
    @media(min-width:1440px){
         flex-direction: row;
    }

    .event-meta-item{
        font-size: 12px;
    }
    .event-meta-venue{
        display: block;
    }
    
    @media(max-width:1440px){
            .event-meta-right{
            margin-top: 10px;
        }
    }
`
const imgCss = css`
max-width: 90px;
`;


const RealEvent = ({ event, isSaved, id }) => {
    const { iconElement: arrow } = useIcon(faAngleRight);
    const isHide = false;

    const avatar =
        "https://stagportl.wpengine.com/wp-content/uploads/2020/11/avatar.jpg";
    const url = process.env.baseUrl + '/wp-json/portl/v1/my-events'

    const { user } = useContext(UserContext);
    const alert = useAlert()
    const [actionShow, setActionShow] = useState(false)
    const [isSavedIcon, setIsSaved] = useState(isSaved)
    const [loc, setLoc] = useState("")
    const [icalender, setIcalender] = useState(null)

    const [toggle, setToggle] = useState(false)


    const getAddress = () => {
        if (!event.venue.address)
            return ""
        const { street, city, state, country, zipCode } = event.venue.address
        return `${street} ${city} ${state} ${country}, ${zipCode}`
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

    const isShow = false;
    const handleAddMyEvent = () => {
        const formData = {
            user_id: user.id,
            event_id: event.id,
            type: "in-person"
        }
        addToMyEvents(user, formData).then(() => {
            setIsSaved(false)
            alert.success("Online event added successfully to my event.", TIMEOUT)
        }).catch(() => {
            alert.error("Event already added to my events", TIMEOUT)
        })
    }
    const handleCreateGoogleEvent = () => {
        if (!event)
            return ""
        const { title, startDateTime, ticketPurchaseUrl } = event
        let startdate = new Date(startDateTime);
        let details = `<div>Buy Tickets: ${ticketPurchaseUrl}<div><div>Location: ${getAddress()}<div>`
        return `https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&start=${startdate}&details=${details}&location&trp=false&sprop=website:${loc}/event/location/${id}&sf=true`
    }
    return (
        <SectionEvent>
            <header className="channel-header events-main-tag">
                <div className="event-meta-left">
                    <div className="event-left-panel">
                        <span>{getFormatedDate(event.localStartDate, "MMM")}</span>{getFormatedDate(event.localStartDate, "D")}
                    </div>
                    <div className="event-right-panel">
                        <h1 className="event-title" dangerouslySetInnerHTML={{ __html: event.title }} />
                        <div className="svg-icon">
                            <FontAwesomeIcon icon={faEllipsisV} onClick={() => setActionShow(!actionShow)} />
                            <div className="tooltip-panel" style={{ display: actionShow ? "block" : "none" }}>
                                <ul>
                                    {isSavedIcon && <li>
                                        <a onClick={() => handleAddMyEvent()}>Save to My Events</a>
                                    </li>}
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
                        <span className="event-date">
                            {getFormatedDate(event.localStartDate, 'MMMM DD[,] YYYY [at] hh:mm a')}
                        </span>
                    </div>
                </div>
                {event.url &&
                    <div className="click-events">For Complete details: <a href={event.url} target="_blank">Click here</a> </div>}

                <figure>
                    <img className="img-ration" src={
                        event.artist?.imageUrl ?
                            event.artist.imageUrl :
                            'https://portl.com/wp-content/uploads/2020/08/portl-logo-dark.jpg'

                    } alt="events" />
                </figure>

                <DivRealEvent className="event-meta">
                    <div className="event-meta-left">
                        {isShow && (
                            <>
                                <span className="event-meta-item">
                                    0.0 Miles
                                </span>
                                <span className="event-meta-item">
                                    $10 Avance / $12 Day of Show
                                </span>
                            </>
                        )}
                    </div>
                </DivRealEvent>
            </header>
            <footer className="channel-footer">
                <div className="channel-info">
                    {event.description && <div dangerouslySetInnerHTML={{ __html: event.description.value }}></div>}
                </div>
            </footer>
            <div className='event-extra-details'>
                {isHide && <CardSidebar>
                    <h3 className="title-card-sidebar">Attendees</h3>
                    <h4 className="subtitle-card-sidebar">4 Going • 4 Interested</h4>
                    <div className="avatar-list">
                        <div className="avatar-container">
                            <a href="/">
                                <img src={avatar} className="avatar" alt="" />
                            </a>
                        </div>
                    </div>
                </CardSidebar>}

                {isHide && (
                    <CardSidebar>
                        <h3 className="title-card-sidebar">Community</h3>
                        <h4 className="subtitle-card-sidebar">19 Posts</h4>
                        <p className="mute-title">14 images * 19 comments</p>
                    </CardSidebar>
                )}
                <CardSidebar>
                    <h3 className="title-card-sidebar">Artist</h3>
                    <p className="mute-title">{event.artist?.name}</p>
                    {isHide && (<div className="body-card-sidebar">
                        <div css={imgCss} className="sidebar-artits-img">
                        </div>
                        <h4 className="subtitle-card-sidebar inner-text">
                            4 Going • 4 Interested
                            <div className="inner-subtitle-sidebar">7 upcomming events</div>
                        </h4>
                        <div className="more-sidebar-card">
                            <a href="/">
                                <i className="avatar-icon">{arrow}</i>
                            </a>
                        </div>
                    </div>)}
                </CardSidebar>
                <CardSidebar>
                    <h3 className="title-card-sidebar">Venue</h3>
                    <h4 className="subtitle-card-sidebar"></h4>
                    <p className="mute-title">
                        <a href={event.venue.url} target="_blank">{event.venue.name}</a>{` , ${getAddress()}`}</p>
                </CardSidebar>
                <MapContainer location={event.venue.location} name={event.venue.name} />
            </div>
            <ModalLoginOrRegister
                setToggleModal={setToggle}
                toggleModal={toggle} />
        </SectionEvent>

    );
}

export default RealEvent;
