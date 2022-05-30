import axios from "axios";
const baseApi = process.env.woocomApi;
const bossApi = process.env.bossApi;
const wcfmApiURl = process.env.baseUrl + "/wp-json/wcfmmp/v1/";
const wcfmApiURl1 = process.env.baseUrl + "/wp-json/portl/v1/";

export const getProdCategories = (user) =>
  axios.get(baseApi + `/products/categories`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const createNewProduct = (user, data) =>
  axios.post(baseApi + `/products`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const getProdTags = (user) =>
  axios.get(baseApi + `/products/tags`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const getStoreDetails = (user) =>
  axios.get(`${wcfmApiURl}store-vendors/${user.id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
});


export const getStorePortlDetails = (user) =>
  axios.get(`${wcfmApiURl1}channel/settings/?user_id=${user.id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
});

export const updateStoreDetails = (user, data) =>
  axios.put(`${wcfmApiURl1}channel/`,data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
});


export const updateStoreMedia = (user, data,path) =>
  axios.post(`${wcfmApiURl1}channel/media/${path}`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })

export const updatePolicies = (user, data) =>
  axios.post(`${wcfmApiURl1}channel/policy`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const getPolicies = (user) =>
  axios.get(`${wcfmApiURl1}channel/policy?user_id=${user.id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const getSeo = (user) =>
  axios.get(`${wcfmApiURl1}channel/seo?user_id=${user.id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
export const updateSeo = (user, data) =>
  axios.post(`${wcfmApiURl1}channel/seo`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const updateFBSeo = (user, data) =>
  axios.post(`${wcfmApiURl1}channel/seo/facebook`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const updateTwitterSeo = (user, data) =>
  axios.post(`${wcfmApiURl1}channel/seo/twitter`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const getCustomerSupport = (user) =>
  axios.get(`${wcfmApiURl1}channel/customer-support?user_id=${user.id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const getPayment = (user) =>
  axios.get(`${wcfmApiURl1}channel/payment?user_id=${user.id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const updateCustSupport = (user, data) =>
  axios.post(`${wcfmApiURl1}channel/customer-support`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
