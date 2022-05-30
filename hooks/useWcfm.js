import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import useSWR from 'swr'

const wcfmApiURl = process.env.baseUrl + '/wp-json/wcfmmp/v1/'

const getDataWcfm = (url, data) => axios({
    method: data.method,
    data: data.params,
    url: wcfmApiURl + url,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  }).then((res) => res.data)

export default function useWcfm(url, request = { method: 'GET', params: {} }, options = {}) {

  const { user } = useContext(UserContext)

  const dataRequest = user ? Object.assign(user, request) : null

  const key = (dataRequest && url) ? [url, dataRequest] : null

  const { data, error } = useSWR(key, getDataWcfm, options)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
