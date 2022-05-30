import axios from "axios";

const baseApi = process.env.bossApi;

export const getMessageList = (user, data) => axios.get(baseApi + '/messages', {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
    params: data
})

export const postMessage = (user, data) => axios.post(baseApi + '/messages', data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const createMessage = (user, data) => axios.post(baseApi + '/messages', data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const uploadMedia = (user, data, setProgress) => axios.post(baseApi + '/media/upload', data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
    onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded * 100) / total);
        setProgress(percentage);
    }
})

export const uploadMsgMedia = (user, data) => axios.post(baseApi + `/activity`, data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const deleteMsg = (user, id, data) => axios.delete(baseApi + `/messages/${id}`, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
    data
})

export const postMessageAction = (user, id, data) => axios.post(baseApi + `/messages/action/${id}`, data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const postReadMsg = (user, id) => axios.patch(baseApi + `/messages/starred/${id}`, {}, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const blockMember = (user, id) => axios.post(baseApi + `/moderation`, id, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})
