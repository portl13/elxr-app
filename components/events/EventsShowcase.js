import React, { useState, useContext } from 'react';

import OnlineEventFilter from './online/OnlineEventFilter';
import { FilterContext } from '../../context/FilterContext';
import OnlineEvents from './online/OnlineEvents';
import RealEventFilter from './real/RealEventFilter';
import RealEvents from './real/RealEvents';
import DoubleButton from '../ui/button/DoubleButton';


const EventsShowcase = (props) => {
    const { typeEvent, setTypeEvent } = useContext(FilterContext);
    const [eventCount, setEventCount] = useState([]);
    const [eventRealCount, setRealEventCount] = useState([]);
    const setOnline = () => setTypeEvent("online");
    const setReal = () => setTypeEvent("real")

    return (
        <>
            <div className="d-flex justify-content-center mt-4 mb-3 mb-md-5">
                <DoubleButton
                    is_active={typeEvent === "online"}
                    right
                    onClick={() => setOnline()}>
                    Online
                </DoubleButton>
                <DoubleButton
                    is_active={typeEvent === "real"}
                    onClick={() => setReal()}>
                    Location
                </DoubleButton>
            </div>
            {typeEvent === "real" &&
                <>
                    <RealEventFilter />
                    <RealEvents setRealEventCount={setRealEventCount} eventRealCount={eventRealCount} {...props} />
                </>}
            {typeEvent === "online" &&
                <>
                    <OnlineEventFilter />
                    <OnlineEvents setEventCount={setEventCount} eventCount={eventCount} {...props}/>
                </>
            }
        </>);
}

export default EventsShowcase;
