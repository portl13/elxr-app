import { createContext, useContext, useState } from "react";

export const EventsContext = createContext({});

const EventsContextProvider = ({ children }) => {
  const [eventsOnline, setEventsOnline] = useState({});
  const [realOnline, setRealOnline] = useState({});
  const [category, setCategories] = useState({
    slug: "",
    label: "All",
    creator: "",
    community: false,
    value: 0,
  });

  return (
    <EventsContext.Provider
      value={{
        eventsOnline,
        setEventsOnline,
        realOnline,
        setRealOnline,
        category,
        setCategories,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContextProvider;

export const useCategories = () => {
  const { category, setCategories } = useContext(EventsContext);
  return { cat: category, setCat: setCategories };
};
