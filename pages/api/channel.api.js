import axios from 'axios'
const baseApi = process.env.woocomApi
const bossApi = process.env.bossApi
const productApi = process.env.productApi
const channelApi = process.env.baseUrl + '/wp-json/portl/v1/'

export const getProductDetails = (user, data) =>
  axios.get(baseApi + '/products', {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    params: data,
  })
export const getProductDetail = (user, id) =>
  axios.get(baseApi + `/products/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
export const getOrderDetails = (user, data) =>
  axios.get(channelApi + 'orders', {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    params: data,
  })

export const getOrdersById = (user, id, data) =>
  axios.get(`${channelApi}customer/orders/${id}?&start=test&length=100`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })

export const getOrdersDetailsById = (user, id) =>
  axios.get(`${channelApi}orders-details/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })

export const getOrdersNotes = (user, id) =>
  axios.get(`${channelApi}my-account/order/${id}/notes`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })

export const getOrdersViewById = (user, id) =>
  axios.get(`${channelApi}my-account/order/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })

export const getSubscription = (user, id) =>
  axios.get(`${channelApi}my-account/order/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })

export const getOrdersStatus = (user, id, data) =>
  axios.post(`${channelApi}order/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })

export const OrdersNotes = (user, id, formData) =>
  axios.post(`${channelApi}my-account/order/${id}/note`, formData, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })

export const getMember = (user, id, data) =>
  axios.get(bossApi + `/members/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    params: data,
  })
export const addProduct = (user, data) =>
  axios.post(`${baseApi}/products`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
export const verifyCaptcha = (user, data) =>
  axios.post('https://www.google.com/recaptcha/api/siteverify', data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
export const updateProduct = (user, data, id) =>
  axios.put(`${baseApi}/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
export const deleteProduct = (user, id) =>
  axios.delete(`${baseApi}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
export const getCustomerList = (user, data) =>
  axios.get(`${channelApi}customers/`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    params: data,
  })

export const addImage = (user, data) =>
  axios.post(productApi + `/image`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${user?.token}`,
    },
  })
export const addDownload = (user, data) =>
  axios.post(productApi + `/downloadable-file`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${user?.token}`,
    },
  })
export const getChannel = (user) =>
  axios.get(`${channelApi}channel?user_id=${user.id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })

export const getChannelProduct = (user) =>
  axios.get(`${channelApi}channel/product/?user_id=${user.id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })

export const getChannelPolicy = (user, data) =>
  axios.get(`${channelApi}channel/policy`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    params: data,
  })

export const getChannelFollowers = (user) =>
  axios.get(`${channelApi}channel/followers?user_id=${user.id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })

export const getChannelSubscription = (channel_id, user) =>
  axios.get(`${channelApi}channel/subscription/${channel_id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })

export const getCustomerDetails = (id) =>
  axios.get(`${channelApi}customer/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${user?.token}`,
    // },
  })

export const createPaymentIntent = (user, amount, currency) => {
  let url = process.env.baseUrl + '/wp-json/portl/payment/v1/payment-intent'
  let data = JSON.stringify({ amount, currency })
  return axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.token}`,
    },
  })
}
