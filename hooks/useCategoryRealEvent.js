import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { formatISO } from 'date-fns';
import { usePositionMutation } from "../context/GeoPositionContext";


const useCategoryRealEvent = (category) => {

    const { position } = usePositionMutation()
    console.log("🚀 ~ file: useCategoryRealEvent.js ~ line 10 ~ useCategoryRealEvent ~ position", position)

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

    }, [category, position]);

    return {
        data,
        error
    }
}

export default useCategoryRealEvent;
