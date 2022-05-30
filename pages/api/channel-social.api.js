import axios from "axios";
const baseApi = process.env.woocomApi;
const bossApi = process.env.bossApi;
const wcfmApiURl = process.env.baseUrl + "/wp-json/wcfmmp/v1/";
const wcfmApiURl1 = process.env.baseUrl + "/wp-json/portl/v1/";

export const getSocialDetails = (user) =>
  axios.get(`${wcfmApiURl1}channel/social/?user_id=${user.id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
export const updateSocailSetting = (user, data) =>
  axios.post(`${wcfmApiURl1}channel/social`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
  export const getProfileDetails = (user) =>
  axios.get(`${wcfmApiURl1}channel/profile/${user.id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
  export const updateProfileSetting = (user, data) =>
  axios.post(`${wcfmApiURl1}channel/profile`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });