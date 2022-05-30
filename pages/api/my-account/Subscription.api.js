import axios from "axios";

const myAccountApi = process.env.myAccount;

export const getSubscription = (user) =>
  axios(`${myAccountApi}/subscriptions`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });