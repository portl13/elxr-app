import axios from "axios";

const myAccountApi = process.env.myAccount;
 
export const getBalance = (user) =>
  axios(`${myAccountApi}/wallet/balance`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const getTransaction = (user) =>
  axios(`${myAccountApi}/wallet/transactions`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  export const getTransactionList = (user, data) =>
  axios(`${myAccountApi}/wallet/transactions`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    params: data
  });

export const transferAmount = (user, data) =>
  axios.post(`${myAccountApi}/wallet/transfer`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const getUser = (user, name) =>
  axios(`${myAccountApi}/wallet/serach-user?term=${name}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
