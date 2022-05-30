import axios from "axios";
const baseApi = process.env.woocomApi;
const bossApi = process.env.bossApi;
const productApi = process.env.productApi;
const channelApi = process.env.baseUrl + "/wp-json/portl/v1";

export const getSubscribers = (user, data) =>
  axios.post(`${channelApi}/subscriptions-list`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
export const getSubscriberDetail = (user, id) =>
  axios.get(`${channelApi}/subscription/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const updateSubscriberStatus = (user, data) =>
  axios.post(`${channelApi}/subscription/update-status`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
