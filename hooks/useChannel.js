import useSWR from 'swr';
import axios from 'axios';

const getChannel = (url, user_login) => {

    return axios.get(url, {
        params: {
            slug: user_login,
        }
    }).then(rest => rest.data);
}

export const useChannel = (user_login) => {

    const url = process.env.portlApi + '/member/'

    const { data, error } = useSWR(user_login ? [url, user_login] : null, getChannel, {
        refreshInterval: 20000,
        revalidateOnFocus: false
    });

    return {
        channel: data,
        isLoading: !error && !data,
        isError: error
    }
}
