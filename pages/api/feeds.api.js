import axios from "axios";

const baseApi = process.env.bossApi + '/activity';

export const getGroupFeeds = (user, data) => axios(baseApi, {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
    params: data,
})

export const postActivity = (user, data) => axios.post(`${baseApi}`, data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const deleteActivity = (user, id) => axios.delete(`${baseApi}/${id}`, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const updateActivity = (user, data, id) => axios.patch(`${baseApi}/${id}`, data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const getActivity = (user, id) => axios.get(`${baseApi}/${id}`, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})
