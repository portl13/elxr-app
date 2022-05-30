import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function useMyEvents(user_id, type = 'all') {

    const [error, setError] = useState(false);
    const [data, setData] = useState(null);

    const url = process.env.baseUrl + '/wp-json/my-events/v1/events'

    const getData = async ({ unmounted, source }) => {

        try {
            if (!unmounted) {

                let params = {
                    user_id: user_id
                }

                if (type !== 'all') {
                    params.type = type
                }

                const datos = await axios.get(url, { params, cancelToken: source.token })

                setData(datos.data)
            }

        } catch (error) {
            if (!unmounted) {
                if (axios.isCancel(error)) {
                } else {
                    setError(true);
                }
            }
        }
    }

    useEffect(() => {

        if (!user_id) return;

        let unmounted = false;

        const source = axios.CancelToken.source()


        getData({ unmounted, source });

        return () => {
            unmounted = true;
            source.cancel('clean request')
        }
    }, [user_id])


    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}
