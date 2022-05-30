import { createContext, useState } from "react";

export const EventsContext = createContext();


const EventsContextProvider = ({ children }) => {


    const [eventsOnline, setEventsOnline] = useState({});

    const [realOnline, setRealOnline] = useState({});

    return (
        <EventsContext.Provider
            value={{
                eventsOnline,
                setEventsOnline,
                realOnline,
                setRealOnline
            }}
        >
            {children}
        </EventsContext.Provider>);
}

export default EventsContextProvider;
