import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { EventsContext } from "../context/EventsContext";
import { FilterContext } from "../context/FilterContext";

const useEventOnline = (url, params) => {

    const { eventsOnline, setEventsOnline } = useContext(EventsContext)

    const { endEvent, startEvent } = useContext(FilterContext)

    const [data, setData] = useState(null)

    const [error, setError] = useState(false)

    const defaultParams = {
        page:1, 
        per_page:3
    }

    const getEvents = async (url, params = {}, cancelToken, unmounted) => {

        try {
            if (!unmounted) {

                const { data: requestData } = await Axios.get(url, {
                    params: {...defaultParams,...params},
                    cancelToken: cancelToken.token
                });

                setData(requestData);

                setError(false);

            }
        } catch (error) {

            if (!unmounted) {
                if (Axios.isCancel(error)) {
                } else {
                    setData(null);
                    setError(true);
                }
            }

        }

    }

    useEffect(() => {

        if (!endEvent) return;

        setData(null);

        const source = Axios.CancelToken.source()

        let unmounted = false;

        const urlByParams = url + `&categories=${params.categories}&start_date=${params.start_date}&end_date=${params.end_date}`;

        getEvents(urlByParams, {}, source, unmounted);

        return () => {
            source.cancel()
            unmounted = true
        }
    }, [endEvent, startEvent]);

    useEffect(() => {

        const source = Axios.CancelToken.source()

        if (eventsOnline[params.categories] !== undefined) {
            setData({
                events: eventsOnline[params.categories]
            })
            return;
        }

        let unmounted = false;

        getEvents(url, params, source, unmounted);

        return () => {
            source.cancel()
            unmounted = true;
        }

    }, []);



    useEffect(() => {

        const saveEvents = () => {
            if (!data) return;
            setEventsOnline({
                ...eventsOnline,
                [params.categories]: data.events
            })
        }

        saveEvents();

    }, [data]);

    return {
        error,
        data
    };
}

export default useEventOnline;
