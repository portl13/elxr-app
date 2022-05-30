import Axios from "axios";
import { useEffect, useState } from "react";

const useCategoryOnlineEvent = (url, params, category) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null)

    useEffect(() => {

        if (!category) return;

        const source = Axios.CancelToken.source()

        const getEventsByCategory = async () => {

            try {
                const { data: requestData } = await Axios.get(url, { params });

                setData(requestData)

                setError(false)

            } catch (error) {
                if (Axios.isCancel(error)) {
                } else {
                    setData(null)
                    setError(true);
                }
            }

        }

        getEventsByCategory();

        return () => {
            source.cancel()
        }

    }, [category]);


    return {
        data,
        error
    }
}

export default useCategoryOnlineEvent;
