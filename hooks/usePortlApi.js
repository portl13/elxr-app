import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import useSWR from 'swr'

const wcfmApiURl = process.env.baseUrl + '/wp-json/portl/v1/'

const fectcher = url => fetch(url).then(r => r.json())


export default function usePortlApi(path) {

  let url = wcfmApiURl + path

  const { data, error } = useSWR(url, fectcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
