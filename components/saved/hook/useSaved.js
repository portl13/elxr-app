import { UserContext } from '@context/UserContext'
import { genericFetch } from '@request/dashboard'
import { useContext } from 'react'
import useSWR from 'swr'

const url = `${process.env.apiV2}/saved`

function useSaved(type) {
  const { user } = useContext(UserContext)
  const token = user?.token
  const { data , error } = useSWR(
    token ? [`${url}?type=${type}`, token] : null,
    genericFetch
  )

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  }
}

export default useSaved
