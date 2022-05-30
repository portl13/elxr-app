import axios from "axios";

const baseApi = process.env.bossApi;

const baseUrl = process.env.baseUrl;

export const getGroupMembers = (user, data, id) => axios(`${baseApi}/groups/${id}/members`, {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
    params: data,
})

export const getGroupTypes = () => axios(`${baseUrl}/wp-json/portl/v1/buddyboss/groups/types/`, {
    method: "GET",
})

export const getGroupMemInvite = (user, data) => axios.get(baseApi + '/groups/invites', {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
    params: data
})

export const getGroupMemberReq = (user, data,) => axios(`${baseApi}/groups/membership-requests`, {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
    params: data,
})

export const cancelMemInvite = (user, id) => axios.delete(`${baseApi}/groups/invites/${id}`, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const updateGroupDetails = (user, data, id) => axios.patch(`${baseApi}/groups/${id}`, data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})


export const getGroupDetails = (user, id) => axios.get(baseApi + '/groups/' + id, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
});

export const getGroupSettings = (user, data, id) => axios.get(`${baseApi}/groups/${id}/settings`, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
    params: data,
})

export const deleteGroup = (user, data, id) => axios.delete(`${baseApi}/groups/${id}`, {
    data,
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const updateGroupSetting = (user, data, id, nav) => axios.patch(`${baseApi}/groups/${id}/settings?nav=${nav}&${data}`, {}, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const updatePhotos = (user, data, id, type) => axios.post(`${baseApi}/groups/${id}/${type}`, data, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})
export const deleteGroupAvatar = (user, id, type) => axios.delete(`${baseApi}/groups/${id}/${type}`, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const updateGroupMember = (user, id, user_id, data) =>
    axios.patch(`${baseApi}/groups/${id}/members/${user_id}`, data, {
        headers: {
            'Authorization': `Bearer ${user?.token}`
        },
    })
export const deleteGroupMember = (user, id, user_id, data) =>
    axios.delete(`${baseApi}/groups/${id}/members/${user_id}`, {
        data,
        headers: {
            'Authorization': `Bearer ${user?.token}`
        },
    })

export const getGroupPhotos = (user, data) => axios(`${baseApi}/media`, {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
    params: data,
})
export const getGroupAlbums = (user, data) => axios(`${baseApi}/media/albums`, {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
    params: data,
})

