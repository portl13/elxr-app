import Axios from "axios";
import { useEffect, useState } from "react";


const useRequestWp = (fetcher, token, extra = true) => {

    const [error, setError] = useState(false);
    const [data, setData] = useState(null);


    const getData = async ({ unmounted, source }) => {
        try {
            if (!unmounted) {

                const res = await fetcher({ source, token, extra });

                if (res.data.success) {
                    setError(true);
                    return;
                }

                setData(res.data);
            }
        } catch (error) {
            if (!unmounted) {
                if (Axios.isCancel(error)) {
                } else {
                    console.log(error);
                    setError(true);
                }
            }
        }
    }

    useEffect(() => {
        if (!token) return;
        if (!extra) return;
        let unmounted = false;

        const source = Axios.CancelToken.source()


        getData({ unmounted, source });

        return () => {
            unmounted = true;
            source.cancel('clean request')
        }

    }, [token, extra])

    return [data, error];
}

export default useRequestWp;
