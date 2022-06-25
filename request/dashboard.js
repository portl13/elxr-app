import axios from 'axios'

const genericFetch = async (url, token) => {
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

export const getOrders = genericFetch

export const getProducts = genericFetch

export const getCourses = genericFetch

export const getCourseById = genericFetch

export const getCourseUsers = genericFetch