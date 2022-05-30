import axios from "axios";

const baseApi = process.env.bossApi;
const url = process.env.baseUrl;
const meetUrl = process.env.meetApi;

export const getGroupMembers = (user, id, search) =>
  axios.get(`${baseApi}/groups/${id}/members?search=${search}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
export const getMemberDetail = (user) =>
  axios.get(`${url}/wp-json/buddyboss/v1/members/${user?.id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
export const getMeetDetail = (user, id) =>
  axios.get(`${url}/wp-json/portl/v1/group/meet/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
  export const sendInvite = (user, data) =>
  axios.post(`${meetUrl}/meet-send-invites`,data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
  
  

