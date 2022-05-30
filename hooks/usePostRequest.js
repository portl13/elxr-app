import Axios from 'axios';
import { useState } from 'react'


const usePostRequest = (url, body, config = {}) => {

    const [data, setData] = useState(null);

    const [error, setError] = useState(null);

    const mutate = async () => {
        try {

            setError(null);

            const { data } = Axios.post(url, body, config);

            setData(data);

        } catch (e) {

            setError(true);

        }
    }

    return [data, mutate, error];
}

export default usePostRequest;
