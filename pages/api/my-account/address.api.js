import axios from "axios";

const myAccountApi = process.env.myAccount;
const countryApi = process.env.baseUrl + "/wp-json/portl/v1/";
const addressAPi = process.env.baseUrl + "/wp-json/portl/v1/";


export const getAddress = (user) =>
  axios(`${myAccountApi}/address`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  export const getAddressData = (user) =>
  axios(`${addressAPi}my-account/address`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  export const getShippingAddress = (user) =>
  axios(`${addressAPi}my-account/shipping-address`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  export const setShippingAddress = (user, data) =>
  axios.post(`${addressAPi}my-account/shipping-address`, data,{
 
  headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  export const setAddress = (user, data) =>
  axios.post(`${addressAPi}my-account/address`, data,{
 
  headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });


  export const getCountry = (user) =>
  axios(`${countryApi}woocommerce/countries`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  export const getState = (user) =>
  axios(`${countryApi}woocommerce/states`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });