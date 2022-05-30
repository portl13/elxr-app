import axios from "axios";

const myAccountApi = process.env.myAccount;

export const getDownload = (user) =>
  axios(`${myAccountApi}/downloads`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });