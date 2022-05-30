import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { formatISO } from 'date-fns';
import { GeoPositionContext } from "../context/GeoPositionContext";


const useCategoryRealEvent = (category) => {

    //const { position } = useContext(GeoPositionContext)

    /**
     * TODO: check if events by category are still part of the web flow.
     */
    const position = null;

    const [data, setData] = useState(null);

    const [error, setError] = useState(false);


    useEffect(() => {
        if (!position) return;
        if (!category) return;

        const source = Axios.CancelToken.source()

        const getEvents = async () => {

            try {

                const now = formatISO(new Date())

                const body = {
                    "location": position,
                    "maxDistanceMiles": 10,
                    "startingAfter": now,
                    "categories": [category],
                    "page": 1,
                    "pageSize": 12
                }

                const { data: requestData } = await Axios.post(`/api/events/${category}`, body);

                setData(requestData)
                setError(false);
            } catch (error) {
                if (Axios.isCancel(error)) {
                } else {
                    setError(true);
                    setData(null);
                }
            }

        }

        getEvents();

        return () => {
            source.cancel()
        }

    }, [category]);

    return {
        data,
        error
    }
}

export default useCategoryRealEvent;
