import React, { useState, useEffect, useContext } from 'react'
import CarrouselOnlineEvents from '../events/online/CarrouselOnlineEvents'
import { getMyEvents } from '../../pages/api/events.api'
import { UserContext } from "../../context/UserContext";

const HomeEvents = () => {
    const [eventCount, setEventCount] = useState([])
    const { user } = useContext(UserContext);
    const [myEventId, setMyEventId] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const getList = () => {
        setisLoading(true)
        getMyEvents(user, { user_id: user.id, type: "online" }).then((res) => {
            if (res.data.data.events) {
                setMyEventId(res.data.data.events.map(e => e.id))
            }else setMyEventId([])
            setisLoading(false)
        }).catch(() => setisLoading(false))
    }
    useEffect(() => {
        if (user && user.id)
            getList()
    }, [user])
    return (
        <div className="mt-5">
            <CarrouselOnlineEvents
                eventCount={eventCount}
                setEventCount={setEventCount}
                params={{ featured: true }}
                link={`/event/online/category/featured`}
                category="Featured Events"
                isAllLoading={isLoading}
                myEventId={myEventId}
                getEventsList={getList}
            />
        </div>
    )
}

export default HomeEvents
