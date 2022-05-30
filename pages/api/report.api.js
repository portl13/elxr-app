import axios from "axios";

const baseApi = process.env.bossApi + '/moderation/report';

export const getReportForm = (user) => axios.get(baseApi, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const reportData = (user, data) => axios.post(`${baseApi}`, data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

