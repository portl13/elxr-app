import React, { useContext } from 'react'
import { UserContext } from '@context/UserContext'
import useSWR from 'swr'
import { genericFetch } from '@request/dashboard'

const myBalance = `${process.env.myAccount}/wallet/balance`

function MyBalance() {
  const { user } = useContext(UserContext)

  const token = user?.token

  const { data } = useSWR(token ? [myBalance, token] : null, genericFetch)

  const isLoading = !data

  return (
    <span className='d-flex'>
      My Balance
      {isLoading ? (
        <div class="spinner-border spinner-border-sm ml-2" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <span className="ml-2 d-flex">
            {data.data}
        </span>
      )}
    </span>
  )
}

export default MyBalance