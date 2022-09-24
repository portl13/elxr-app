import React, { useState, useEffect, useContext, } from 'react'
import RealEventFilter from './real/RealEventFilter';
import RealEvents from './real/RealEvents';


import CarrouselRealMyEvents from './real/CarrouselRealMyEvents';
import { getMyEvents } from '@api/events.api'
import { UserContext } from "@context/UserContext";


const EventsRealShowcase = (props) => {
    const [eventRealCount, setRealEventCount] = useState([]);
    const [ismyEvents, setMyEvents] = useState("all")
    const { user } = useContext(UserContext);
    const [events, setEvents] = useState([]);
    const [myEventId, setMyEventId] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const getList = () => {
        setisLoading(true)
        getMyEvents(user, { user_id: user.id, type: "in-person" }).then((res) => {
            if (res.data.data) {
                setEvents(res.data.data)
                setMyEventId(res.data.data.map(e => e.id))
            }
            setisLoading(false)
        }).catch(() => setisLoading(false))
    }
    useEffect(() => {
        if (user && user.id)
            getList()
    }, [user])
    return (
        <div className="bg-black bd-radius pb-2 pt-20 event-page">
            {/* <div className="online-event-tab-section online-event-tab">
                <div css={EventTab}>
                    <ul>
                        {EVENT_TAB.map((e) =>
                            <li className={e.value === ismyEvents && "active"}
                                onClick={() => setMyEvents(e.value)}>{e.name}</li>)}
                    </ul>
                </div>
            </div> */}
            {ismyEvents === "all" ? <>
                <RealEventFilter />
                <RealEvents setRealEventCount={setRealEventCount}
                    eventRealCount={eventRealCount} {...props}
                    isAllLoading={isLoading}
                    myEventId={myEventId}
                    getEventsList={getList}
                    isMyEvent={false} />
            </> : <div style={{ padding: "0 45px 0 44px" }}>
                <CarrouselRealMyEvents isMyEvent={true}
                    setisLoading={setisLoading}
                    isLoading={isLoading}
                    events={events}
                    setEvents={setEvents}
                    getList={getList} /></div>}
        </div>);
}

export default EventsRealShowcase;
