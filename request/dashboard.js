import axios from 'axios'

export const getOrders = async (url, token) => {
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

export const getProducts = async (url, token) => {
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}
