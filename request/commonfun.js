import axios from "axios";

export const fetchData = async (url, token) => {
    return await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const postFetchData = async (url, dataSet, token) => {
    return await axios.post(url, dataSet, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
