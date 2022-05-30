import axios from "axios";

const myAccountApi = process.env.myAccount;

export const getOrder = (user,page,value) =>
  axios(`${myAccountApi}/orders?page=${page}&per_page=${value}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });