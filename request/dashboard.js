import axios from 'axios'

const genericFetch = async (url, token) => {
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

const genericFetchPost = async (url, token, data) => {
  const res = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

export const getEvents = async (url) => {
  const res = await axios.get(url)
  return res.data
}

export const getOrders = genericFetch

export const getProducts = async (url, token) => {
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res
}

export const getCourses = genericFetch

export const getCourseById = genericFetch

export const getCourseUsers = genericFetch

export const getCommunities = genericFetch

export const getOrderById = genericFetch

export const getProductCategories = genericFetch

export const getProductTags = genericFetch

export const getProfile = genericFetch

export const getChannels = genericFetch

export const getChannelById = genericFetch

export const getCategories = genericFetch

export const getStoreDetails = genericFetch

export const getStoreSupport = genericFetch

export const getCountries = async (url, token) => {
  const {data} = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data.data
}

export const getStates = getCountries

export const uploadProductImage = async (url, token, formData) => {
  const res = await axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return res.data
}


export const createProduct = async (url, token, data) => {
  const res = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

export const createChannelFecth = genericFetchPost
