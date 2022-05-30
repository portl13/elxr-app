import React, { useContext, useState, useEffect } from "react";
import CarrouselOnlineEvents from "./CarrouselOnlineEvents";
import CarrouselChannelEvents from "./CarrouselChannelEvents"
import { FilterContext } from "../../../context/FilterContext";
import MessajeAlert from "../../ui/alert/MessajeAlert";
import Loader from "../../loader";
import { format } from 'date-fns'
import { v4 as uuidv5 } from 'uuid'

const OnlineEvents = ({ setEventCount, eventCount, eventLoader }) => {
    const {
        categoriesOnlineEvent,
        startEvent,
        endEvent,
        showOnlineMessage,
        setShowOnlineMessage,
        setShowRealMessage,
    } = useContext(FilterContext);
    const [catCount, setCatCount] = useState(0);

    useEffect(() => {
        if (catCount === categoriesOnlineEvent.length && !eventCount.length) {
            setShowRealMessage(true)
        }
    }, [catCount])

    useEffect(() => {
        if (categoriesOnlineEvent.length && eventCount.length) {
            let label = categoriesOnlineEvent.map(e => e.label)
            let count = [...eventCount]
            for (let i = count.length; i >= 0; i--) {
                if (label.indexOf(count[i]) === -1)
                    count.splice(i, 1)
            }
            setShowOnlineMessage(!count.length)
        }
    }, [categoriesOnlineEvent, eventCount])

    const start = format(new Date(startEvent), "yyyy-MM-dd '00:00:00'")
    const end = endEvent ? format(new Date(endEvent), "yyyy-MM-dd '23:59:59'") : '';

    if (eventLoader) {
        return <div style={{ textAlign: "center" }}><Loader color="primary" /></div>
    }
    return (
        <>
            {showOnlineMessage && <p style={{ textAlign: 'center' }}>No results.</p>}
            {categoriesOnlineEvent.length > 0 ?
                categoriesOnlineEvent.map(cat => {
                    const params = {
                        "categories": cat.value,
                        "start_date": start,
                    }
                    if (end) { params["end_date"] = end }
                    return <>
                        <CarrouselChannelEvents
                            key={`${cat.value}-${uuidv5()}`}
                            category={cat.label}
                            params={params}
                            setEventCount={setEventCount}
                            eventCount={eventCount}
                            setCatCount={setCatCount}
                            catCount={catCount} />
                        <CarrouselOnlineEvents
                            key={`${cat.value}-${uuidv5()}`}
                            category={cat.label}
                            params={params}
                            setEventCount={setEventCount}
                            eventCount={eventCount}
                            setCatCount={setCatCount}
                            catCount={catCount} />
                    </>
                })

                : <MessajeAlert typeIcon={"warning"} messaje={"Please select one or more categories"} type={"warning"} textAlert={"Warning!"} />
            }
        </>
    );
}

export default OnlineEvents;
