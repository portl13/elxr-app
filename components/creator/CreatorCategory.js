import { getCreator } from '@request/creator'
import React from 'react'
import useSWR from 'swr'

const urlCategory = `${process.env.apiV2}/creator/categories`

function CreatorCategory({ id }) {
  const { data } = useSWR(`${urlCategory}/${id}`, getCreator)

  return (
    <div>
      Category:{' '}
      {!data && (
        <div class="spinner-border spinner-border-sm" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      {data && data.map((category) => category.label)}
      {data && data.length === 0 && 'No category'}
    </div>
  )
}

export default CreatorCategory
