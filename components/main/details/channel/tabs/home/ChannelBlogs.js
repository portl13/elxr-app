import React, { useEffect } from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getCreator } from '@request/creator'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import CardBlogs from '@components/creator/cards/CardBlogs'

const blogslUrl = `${process.env.apiV2}/blogs?channel_id=`

function ChannelBlogs({ channel_id, limit = 4 }) {
  
  const { data: blogs, error } = useSWRImmutable(
    `${blogslUrl}${channel_id}&page=1&per_page=${limit}`,
    getCreator
  )

  const isLoading = !blogs && !error

  if (blogs && blogs.blogs && blogs.blogs.length === 0) {
    return ''
  }

  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14 mb-3">BLOGS</h4>
      </div>
      {isLoading && <SpinnerLoader />}
      {blogs &&
        blogs.blogs &&
        blogs.blogs.length > 0 &&
        blogs.blogs.map((blog) => (
          <div key={blog.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <CardBlogs blog={blog} />
          </div>
        ))}
    </div>
  )
}

export default ChannelBlogs
