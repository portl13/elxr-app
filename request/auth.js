import axios from 'axios'

const authUrl = process.env.apiURl + '/auth/password'

export const getForgotPassword = (data) => {
  return axios.post(`${authUrl}/forgot`, data)
}

export const resetPassword = (data) => {
  return axios.post(`${authUrl}/reset`, data)
}
