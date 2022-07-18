import axios from 'axios'

const url = `${process.env.apiURl}/media/`

export const uploadGeneralImage = async (token, formData) => {
  const res = await axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return res.data
}


export const uploadGeneralDownloable = async (token, formData) => {
  const res = await axios.post(urlProduct, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return res.data
}