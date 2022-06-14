import axios from 'axios'

const baseUrl = process.env.apiURl

const paymentUrl = process.env.baseUrl + '/wp-json/portl/payment/v1/'

export const getAdressUser = (user) => {
  return axios.get(`${baseUrl}/my-account/address`, {
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
  })
}
export const setAdressUser = (user, address) => {
  return axios.post(`${baseUrl}/my-account/address`, address, {
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
  })
}

export const getCountriesWoocommerce = (user) => {
  return axios.get(`${baseUrl}/woocommerce/countries`, {
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
  })
}

export const getStateWoocommerce = (user, cc) => {
  return axios.get(`${baseUrl}/woocommerce/states?cc=${cc}`, {
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
  })
}

export const getPaymentItent = (user, items, address) => {
  return axios.post(
    paymentUrl + 'payment-intent',
    {
      items,
      address,
    },
    {
      headers: {
        Authorization: 'Bearer ' + user?.token,
      },
    }
  )
}
