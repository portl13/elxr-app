import axios from "axios";

const baseApi = process.env.bossApi;

export const getForums = (user, data, id) => axios(`${baseApi}/forums/${data.id}`, {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const getAllForums = (user, data) => axios(`${baseApi}/forums`, {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
    params: data,
})
