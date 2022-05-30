import axios from "axios";

const baseApi = process.env.bossApi;

export const uploadContent = (user, data, videoPreview, setProgress) => {
    const url = `${baseApi}/${videoPreview ? "video" : "media"}/upload`;
    const reqData = data.map((filedata) => {
        const formData = new FormData();
        formData.append("file", filedata, filedata.name);
        return axios.post(url, formData, {
            headers: { Authorization: `Bearer ${user.token}` },
            onUploadProgress: function (progressEvent) {
                const { loaded, total } = progressEvent;
                const percentage = Math.floor((loaded * 100) / total);
                setProgress(percentage);
            },
        });
    });
    return axios.all(reqData)
}

export const createNewTopic = (user, data) => axios.post(`${baseApi}/topics`, data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const getGroupThread = (user, data) => axios.get(baseApi + `/forums/${data}`, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const getForumTopics = (user, data) => axios.get(baseApi + `/topics`, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
    params: data
})

export const getTopicDetails = (user, data) => axios.get(baseApi + `/topics/${data}`, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const getRepliesList = (user, data) => axios.get(baseApi + `/reply`, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
    params: data
})

export const postDiscussionReply = (user, data) => axios.post(baseApi + `/reply`, data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const postSubscribe = (user, id, data) => axios.post(baseApi + `/topics/action/${id}`, data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const deleteTopic = (user, id, data) => axios.delete(baseApi + `/topics/${id}`, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const getTpoicDetails = (user, id) => axios.get(baseApi + `/topics/${id}`, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const mergeTopics = (user, id, data) => axios.post(baseApi + `/topics/merge/${id}`, data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const splitTopics = (user, id, data) => axios.post(baseApi + `/topics/split/${id}`, data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})
export const moveTopicReply = (user, id, data) => axios.post(baseApi + `/reply/move/${id}`, data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const getTopicReply = (user, id, data) => axios.get(baseApi + `/reply/${id}`, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const updateTopic = (user, id, data) => axios.patch(baseApi + `/topics/${id}`, data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const updateReply = (user, id, data) => axios.patch(baseApi + `/reply/${id}`, data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const deleteMedia = (user, data) => axios.delete(baseApi + `/media/${data}`, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})



