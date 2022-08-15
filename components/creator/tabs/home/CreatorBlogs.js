import React from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import CardBlogs from '@components/creator/cards/CardBlogs'
import useSWR from 'swr'
import { getFetchPublic } from '@request/creator'

const url = `${process.env.apiV2}/blogs?author=`

function CreatorBlogs({ creator_id }) {
  const { data: blogs, error } = useSWR(
    `${url}${creator_id}&page=1&per_page=12`,
    getFetchPublic
  )

  const isLoading = !blogs && !error

  if (blogs && blogs.blogs && blogs.blogs.length === 0) {
    return ''
  }

  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14">BLOGS</h4>
      </div>
      {isLoading && <SpinnerLoader />}
      {blogs &&
        blogs.blogs.length > 0 &&
        blogs.blogs.map((blog) => (
          <div key={blog.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <CardBlogs blog={blog} />
          </div>
        ))}
    </div>
  )
}

export default CreatorBlogs
