import axios from "axios";
const baseApi = process.env.baseUrl + "/wp-json/portl/v1/";

export const getChannelEvent = (user, data) =>
  axios.get(baseApi + "channel_events", {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    params: data,
  });

  export const getEventById = (id) =>
  axios.get(baseApi + `channel_events/${id}`, {

  });

export const createChannelEvent = (user, data) =>
  axios.post(baseApi + "channel_event", data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  export const updateChannelEvent = (user, id) =>
  axios.post(baseApi + `channel_event/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const getCategories = (user) =>
  axios.get(baseApi + "channel_event/categories", {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
});

export const deleteEventbyId = (user, id) =>
  axios.delete(baseApi + `channel_event/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
