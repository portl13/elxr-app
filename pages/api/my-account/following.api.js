import axios from "axios";

const myAccountApi = process.env.myAccount;

export const getFollowing = (user) =>
  axios(`${myAccountApi}/followings`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const deleteFollowing = (user, data) =>
  axios.delete(`${myAccountApi}/followings`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    data: data,
  });
