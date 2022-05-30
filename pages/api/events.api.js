import axios from "axios";

const baseApi = process.env.NEXT_PUBLIC_API_EVENTS_WP;

const url = process.env.NEXT_PUBLIC_BASE_URL

export const getEventList = (user, data) => axios.get(`${baseApi}events`, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
    params: data,
})

export const getEventCategories = (user) => axios.get(`${baseApi}categories?page=1&per_page=100&hide_empty=true`, {
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const getArtistList = (data) => axios.get(`${url}/api/v2/artists`, {
    params: data,
})

export const getArtistDetails = (slug) => axios.get(`${url}/api/v2/artist/detail/${slug}`);

export const getMyEvents = (user, data) =>
    axios.get(`${url}/wp-json/portl/v1/my-events`, {
        headers: {
            'Authorization': `Bearer ${user?.token}`
        },
        params: data,
    });

export const addToMyEvents = (user, data) =>
    axios.post(`${url}/wp-json/portl/v1/my-events`, data, {
        headers: {
            'Authorization': `Bearer ${user?.token}`
        },
    });

export const deleteFromMyEvents = (user, data) =>
    axios.delete(`${url}/wp-json/portl/v1/my-events`, {
        headers: {
            'Authorization': `Bearer ${user?.token}`
        },
        data: data,
    });

